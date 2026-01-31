"use client"
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { Box, Container, Grid, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";
const MainSiteStack = styled(Stack)({
    minHeight: "100vh",
    width: "100vw",
});
const MenuAuth = styled(Typography)({
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "color 0.2s ease",

    "&:hover": {
        color: "#008ff3",
    },
});
const GridMenu = styled(Grid)({
    minHeight: "60px",
    alignItems: "center",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 0.14)",
});
const GridFooter = styled(Grid)({
    minHeight: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    fontSize: "14px",
});
const ContainerBox = styled(Box)({
    width: "100%",
    margin: "24px 0px",
    flex: 1,
    display: "flex",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    padding: "80px 50px"
})
const StackChildren = styled(Stack)({
    flex: 1,
    backgroundColor: "#E0E8EF",
    height: "100%",
    padding: "0px 16.5%",
});
const GridMenuItem = styled(Grid)({
    justifyContent: "right",
    gap: "24px",
});
const AuthLayout = ({ children }: { children: ReactNode }) => {
    console.log("children", children);
    const { authData, setAuthData } = useAuthStore();

    return (
        <MainSiteStack width="100vw" minHeight="100vh">
            <GridMenu alignItems="center" container minHeight="60px" size={12}>
                <Grid paddingLeft="3%" size={2}>
                    <Image src="https://stc-zaloprofile.zdn.vn/pc/v1/images/logo.svg" alt="Logo" width={80} height={30} />
                </Grid>
                <GridMenuItem container size={8}>
                    <MenuAuth>ZALO PC</MenuAuth>
                    <MenuAuth>OFFICE ACCOUNT</MenuAuth>
                    <MenuAuth>NHÀ PHÁT TRIỂN</MenuAuth>
                    <MenuAuth>BẢO MẬT</MenuAuth>
                    <MenuAuth>TRỢ GIÚP</MenuAuth>
                    <MenuAuth>LIÊN HỆ</MenuAuth>
                    <MenuAuth>BÁO CÁO VI PHẠM</MenuAuth>
                    <MenuAuth>{authData?.data.tokens.accessToken ? <Image src={(authData.data.user.avatarUrl as string) ?? "https://www.pinterest.com/oqnabbzz/avt/"} alt="" /> : "ĐĂNG NHẬP"}</MenuAuth>
                </GridMenuItem>
                <Grid size={2}></Grid>
            </GridMenu>
            <StackChildren>
                <ContainerBox>{children}</ContainerBox>
            </StackChildren>
            <GridFooter>
                © 2012 - 2026 Một sản phẩm của Zalo Group - Điều khoản sử dụng dịch vụ - Thông báo xử lý dữ liệu
            </GridFooter>
        </MainSiteStack>
    )
}
export default AuthLayout;