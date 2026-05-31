"use client";

import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
    Box,
    Button,
    Grid,
    Stack,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
} from "@mui/material";
import Image from "next/image";
import QRCode from "react-qr-code";
import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { useTrans } from "@/src/common/utilities/hook/trans";

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
        backgroundColor: "rgba(5, 115, 255, 0.06)",
        boxShadow: "none",
    },
    "& .MuiButton-startIcon": {
        marginRight: "16px",
    },
    "& .MuiButton-startIcon > *:nth-of-type(1)": {
        fontSize: "25px",
    },
});

const GridButton = styled(Box)({
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
});

const APP_DOWNLOAD_URL =
    "https://expo.dev/accounts/22664321/projects/Zalo_2026/builds/508d0d41-7a24-4db6-887b-8b3c83a605bc";

const MainSite = () => {
    const router = useRouter();
    const { authData } = useAuthStore();
    const Trans = useTrans();

    const [openQr, setOpenQr] = useState(false);

    const features = [
        Trans("MAIN_SITE.FEATURE_1"),
        Trans("MAIN_SITE.FEATURE_2"),
        Trans("MAIN_SITE.FEATURE_3"),
    ];

    const handleChangePage = (token?: string) => {
        if (token) router.push("/me");
        else router.push("/login");
    };

    return (
        <>
            <Stack
                width="100%"
                spacing={{ xs: 2, md: 3 }}
                sx={{
                    px: { xs: 2, sm: 3, md: 0 },
                }}
                data-testid="main-site-page"
            >
                <Stack spacing={0.5}>
                    <MainSiteTitle
                        variant="h4"
                        sx={{ fontSize: { xs: 22, sm: 28, md: 34 } }}
                    >
                        {Trans("MAIN_SITE.TITLE")}
                    </MainSiteTitle>

                    <MainSiteTitle
                        variant="h4"
                        sx={{
                            fontSize: { xs: 18, sm: 20, md: 22 },
                            color: "text.primary",
                        }}
                    >
                        {Trans("MAIN_SITE.SUBTITLE")}
                    </MainSiteTitle>
                </Stack>

                <Grid container spacing={{ xs: 3, md: 4 }}>
                    <Grid mt={3} size={{ xs: 12, md: 6 }}>
                        <Stack spacing={{ xs: 2, md: 3 }}>
                            <Stack>
                                {features.map((feature) => (
                                    <Box
                                        key={feature}
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            mb: 1.5,
                                            alignItems: "flex-start",
                                        }}
                                    >
                                        <Image
                                            src="https://stc-zaloprofile.zdn.vn/pc/v1/images/ico_check.png"
                                            alt={Trans("MAIN_SITE.FEATURE_ICON_ALT")}
                                            width={18}
                                            height={18}
                                        />

                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: {
                                                    xs: 14,
                                                    md: 16,
                                                },
                                            }}
                                        >
                                            {feature}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>

                            <GridButton
                                sx={{
                                    flexDirection: {
                                        xs: "column",
                                        sm: "row",
                                    },
                                    "& > button": {
                                        width: {
                                            xs: "100%",
                                            sm: "auto",
                                        },
                                    },
                                }}
                            >
                                <PrimaryButton
                                    variant="contained"
                                    startIcon={
                                        <CloudDownloadRoundedIcon />
                                    }
                                    onClick={() => setOpenQr(true)}
                                >
                                    {Trans("MAIN_SITE.DOWNLOAD_NOW")}
                                </PrimaryButton>

                                <OutlineButton
                                    variant="outlined"
                                    startIcon={
                                        <LanguageRoundedIcon />
                                    }
                                    onClick={() =>
                                        handleChangePage(
                                            authData?.data?.tokens?.accessToken
                                        )
                                    }
                                >
                                    {Trans(
                                        "MAIN_SITE.USE_WEB_VERSION"
                                    )}
                                </OutlineButton>
                            </GridButton>
                        </Stack>
                    </Grid>

                    <Grid
                        size={{ xs: 12, md: 6 }}
                        sx={{
                            display: "flex",
                            justifyContent: {
                                xs: "center",
                                md: "flex-end",
                            },
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: {
                                    xs: "100%",
                                    sm: 520,
                                    md: 560,
                                },
                                maxWidth: 560,
                                aspectRatio: "5 / 3",
                            }}
                        >
                            <Image
                                src="https://stc-zaloprofile.zdn.vn/pc/v1/images/img_pc.png"
                                alt={Trans("MAIN_SITE.IMAGE_ALT")}
                                fill
                                sizes="(max-width: 600px) 100vw, (max-width: 900px) 520px, 560px"
                                style={{
                                    objectFit: "contain",
                                }}
                                priority
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Stack>

            <Dialog
                open={openQr}
                onClose={() => setOpenQr(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle textAlign="center">
                    Tải ứng dụng Zalo 2026
                </DialogTitle>

                <DialogContent>
                    <Stack
                        spacing={3}
                        alignItems="center"
                        sx={{ py: 2 }}
                    >
                        <Box
                            sx={{
                                backgroundColor: "#fff",
                                padding: 2,
                                borderRadius: 2,
                            }}
                        >
                            <QRCode
                                value={APP_DOWNLOAD_URL}
                                size={220}
                            />
                        </Box>

                        <Typography
                            variant="body2"
                            textAlign="center"
                        >
                            Quét mã QR bằng điện thoại để tải
                            ứng dụng
                        </Typography>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MainSite;