"use client";

import { styled } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import React from "react";
import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/src/common/store/useAuthStore";

const MainSiteTitle = styled(Typography)({
    fontWeight: 700,
});
const PrimaryButton = styled(Button)({
    padding: "8px 24px",
    backgroundColor: "#0573ff",
    color: "#fff",
    boxShadow: "none",
    minHeight: "40px",
    fontWeight: 600,
    fontSize: "16px",
    "&:hover": {
        backgroundColor: "#0465e0",
        boxShadow: "none",
    },
    "& .MuiButton-startIcon": {
        marginRight: "16px",
    },
    "& .MuiButton-startIcon > *:nth-of-type(1)": {
        fontSize: "25px",
    },
});

const OutlineButton = styled(Button)({
    padding: "8px 24px",
    color: "#0573ff",
    borderColor: "#0573ff",
    minHeight: "40px",
    fontWeight: 600,
    fontSize: "16px",
    boxShadow: "none",
    backgroundColor: "transparent",

    "&:hover": {
        borderColor: "#0465e0",
        color: "#0465e0",
        backgroundColor: "rgba(5, 115, 255, 0.06)", // nền xanh nhạt khi hover
        boxShadow: "none",
    },

    "& .MuiButton-startIcon": {
        marginRight: "16px",
    },

    "& .MuiButton-startIcon > *:nth-of-type(1)": {
        fontSize: "25px",
    },
});

const GridButton = styled(Grid)({
    gap: "24px",
    display: "flex",
});
const MainSite = () => {
    const router = useRouter();
    const features = [
        "Gửi file, ảnh, video cực nhanh lên đến 1GB",
        "Đồng bộ tin nhắn với điện thoại",
        "Tối ưu cho chat nhóm và trao đổi công việc",
    ];
    const { authData, setAuthData } = useAuthStore();
    const handleChangePage = (token: string) => {
        if (token && token !== "") {
            router.push("/me");
        } router.push("/login")
    }
    return <Stack width="100vw" spacing={3} data-testid="main-site-page">
        <Stack>
            <MainSiteTitle variant="h4">Tải Zalo PC cho máy tính</MainSiteTitle>
            <MainSiteTitle variant="h5" >
                Ứng dụng Zalo PC đã có mặt trên Windows, Mac OS, Web
            </MainSiteTitle>
        </Stack>

        <Grid size={12} width="100%" container>
            <Grid size={6}>
                <Stack spacing={3}>
                    <Stack >
                        {features.map((feature, index) => (
                            <Grid marginBottom={2} display="flex" key={feature} gap={2}>
                                <Image
                                    src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png"
                                    alt="Feature"
                                    width={18}
                                    height={18}
                                />
                                <Typography key={index} variant="body1"> {feature}</Typography>
                            </Grid>
                        ))}
                    </Stack>

                    <GridButton container >
                        <PrimaryButton
                            variant="contained"
                            startIcon={<CloudDownloadRoundedIcon />}

                        >
                            Tải ngay
                        </PrimaryButton>

                        <OutlineButton
                            variant="outlined"
                            startIcon={<LanguageRoundedIcon />}
                            onClick={() => { handleChangePage(authData?.data.tokens.accessToken as string) }
                            }
                        >
                            Dùng bản web
                        </OutlineButton>
                    </GridButton>

                </Stack>
            </Grid>
            <Grid justifyContent="right" display="flex" size={6}>
                <Image src="https://stc-zaloprofile.zdn.vn/pc/v1/images/img_pc.png" alt="Zalo PC" width={400} height={300}></Image>
            </Grid>
        </Grid>
    </Stack>;
}
export default MainSite;