"use client";

import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TabContext } from "@mui/lab";
import { COUNTRIES, Country } from "../../constant";
import { useRouter } from "next/navigation";

import {
    Card,
    CardHeader,
    Content,
    LogoWrap,
    Page,
    Subtitle,
    TabContainer,
    TabItem,
    Tabs,
} from "../Auth.styles";

import FormLogin from "./component/FormLogin";
import { useFormik } from "formik";
import { initialValues, validationSchemaLogin } from "./validate";
import { useTrans } from "@/src/common/utilities/trans";
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { authService } from "@/src/common/service/auth-service";

export default function LoginPage() {
    const Trans = useTrans();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [tab, setTab] = useState("loginQR");
    const [country, setCountry] = React.useState<Country>(COUNTRIES[0]);

    const { loadingAuth, setLoadingAuth, errorAuth, setErrorAuth } = useAuthStore();
    const [token, setToken] = useState<string | null>(null);
    const formik = useFormik({
        initialValues,
        validationSchema: validationSchemaLogin(Trans),
        onSubmit: async (values) => {
            setErrorAuth(null);
            setLoadingAuth(true);

            try {
                const raw = String(values.phone || "").replace(/\D/g, ""); 
                let phoneNormalized = raw;
                if (raw.length === 10 && raw.startsWith("0")) {
                    phoneNormalized = raw.slice(1); 
                }
                if (raw.length === 9) {
                    phoneNormalized = raw;
                }

                const phoneFinal = `+84${phoneNormalized}`;

                const result = await authService.authLogin({ phone: phoneFinal, password: values.password });
                const payload = result.payload;

                if (result.ok && payload.success) {
                    localStorage.setItem("accessToken", payload.data.tokens.accessToken);
                    localStorage.setItem("refreshToken", payload.data.tokens.refreshToken);
                    router.push("/me");
                } else {
                    setErrorAuth(payload.message ?? "Đăng nhập thất bại");
                }
            } catch (error) {
                console.log("Login error:", error);
                setErrorAuth("Lỗi hệ thống");
            } finally {
                setLoadingAuth(false);
            }
        },
    });
    useEffect(() => {
        setMounted(true);
        setToken(localStorage.getItem("accessToken"));
    }, []);

    if (!mounted) return null;
    const handleChangeTab = (_event: React.SyntheticEvent, newTab: string) => {
        setTab(newTab);
    };

    return (
        <Page data-testid="login-page">
            <Content spacing={2}>
                <LogoWrap>
                    <Image
                        src="https://stc-zlogin.zdn.vn/images/zlogo.png"
                        alt="Zalo Logo"
                        width={114}
                        height={100}
                        priority
                    />
                </LogoWrap>

                <Subtitle>{"Đăng nhập tài khoản Zalo\nđể kết nối với ứng dụng Zalo Web"}</Subtitle>

                <Card>
                    <TabContext value={tab}>
                        <TabContainer>
                            <CardHeader>
                                <Tabs onChange={handleChangeTab} aria-label="login tabs">
                                    <TabItem label="Đăng nhập qua mã QR" value="loginQR" />
                                    <TabItem label="Đăng nhập với mật khẩu" value="loginPsw" />
                                </Tabs>
                            </CardHeader>

                            <FormLogin
                                tab={tab}
                                country={country}
                                setCountry={setCountry}
                                formik={formik}
                                loading={loadingAuth}
                                errorMsg={errorAuth}
                                onGoRegister={() => router.push("/register")}
                            />
                        </TabContainer>
                    </TabContext>
                </Card>
            </Content>
        </Page>
    );
}
