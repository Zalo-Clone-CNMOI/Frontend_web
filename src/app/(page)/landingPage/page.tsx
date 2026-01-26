"use client";

import styled from "@emotion/styled";
import { Box, Card, Container, Grid, Link, Stack, Tab, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import HomeTab from "./components/HomeTab";
import ProductTab from "./components/ProductTab";
export const HeaderLandingStyled = styled(Box)({
    minHeight: '10vh',
    width: "100%",
    padding: "16px 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "48px",
})
const TabLandingStyled = styled(TabList)({
    "& .MuiTab-root": {
        gap: "32px",
        fontSize: "16px",
        color: "#262626",
        textTransform: "none",
        fontWeight: 500,
    },
    "& .MuiTabs-indicator": {
        backgroundColor: "#2563eb",
        height: "2px",
        bottom: "8px",
    },
    "& .MuiTouchRipple-root": {
        display: "none",
    },
    "& .MuiTab-root.Mui-selected": {
        backgroundColor: "transparent",
        color: "#262626"
    },
});
const BoxIcon = styled(Box)({
    display: "flex",
    alignItems: "center",
});
const StackAdress = styled(Stack)({
    borderBottom: "1px solid #E5E7EB",
    paddingBottom: "24px",
});
const LinkStyled = styled(Link)({
    color: "black",
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
        textDecorationColor: "black",
    },
});
const GridLinkStyled = styled(Grid)({
    flexDirection: "column",
});
const ContainerLink = styled(Container)({
    padding: "0px 54px",
    backgroundColor: "#F6F7F9",
});
const LandingPage = () => {
    const [tabs, setTabs] = React.useState("home");
    const handleChangeTabs = (event: React.SyntheticEvent, newTab: string) => {
        setTabs(newTab);
    }
    return (


        <Stack>
            <TabContext value={tabs}>
                <Stack>

                    <HeaderLandingStyled>
                        <Image
                            src="/images/logo-zalo.svg"
                            alt="logo-zalo"
                            width={85}
                            height={50}
                        />

                        <TabLandingStyled onChange={handleChangeTabs}>
                            <Tab label="Trang chủ" value="home" />
                            <Tab label="Sản phẩm & Dịch vụ" value="products" />
                            <Tab label="AI & Công nghệ" value="ai" />
                            <Tab label="Tác động xã hội & Trách nhiệm" value="impact" />
                            <Tab label="Về chúng tôi" value="about" />
                        </TabLandingStyled>
                        <BoxIcon>
                            <LanguageOutlinedIcon />
                        </BoxIcon>
                    </HeaderLandingStyled>

                    {/* CONTENT */}
                    <Box>
                        <TabPanel sx={{ p: 0 }} value="home"><HomeTab /></TabPanel>
                        <TabPanel value="products"><ProductTab /></TabPanel>
                        <TabPanel value="ai">AI content</TabPanel>
                        <TabPanel value="impact">Impact content</TabPanel>
                        <TabPanel value="about">About content</TabPanel>
                    </Box>
                </Stack>
            </TabContext>
            <Box bgcolor="#F6F7F9" padding="40px 0px" >
                <ContainerLink disableGutters>
                    <Stack spacing={3}>
                        <StackAdress spacing={2}>
                            <Image
                                src="https://zalo-site.zadn.vn/_next/static/media/logo.a68785cd.svg"
                                alt="logo-zalo"
                                width={85}
                                height={50}
                            />
                            <Typography marginBottom="16px" variant="body1">VNG Campus, Phường Tân Thuận, TP.HCM</Typography>
                        </StackAdress>
                        <Grid container size={12}>
                            <GridLinkStyled direction="column" size={4}>
                                <Typography variant="h6" fontWeight={600} mb={2}>
                                    Giải pháp
                                </Typography>

                                <Stack spacing={2}>
                                    <LinkStyled href="#" variant="body1">Zalo AI</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Giải pháp doanh nghiệp</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Chuyển đổi số</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Adtima</LinkStyled>
                                </Stack>
                            </GridLinkStyled>

                            <GridLinkStyled direction="column" size={4}>
                                <Typography variant="h6" fontWeight={600} mb={2}>
                                    Hỗ trợ & liên hệ
                                </Typography>

                                <Stack spacing={2}>
                                    <LinkStyled href="#" variant="body1">Hỗ trợ người dùng</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Hỗ trợ nhà phát triển</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Bảo mật</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Báo cáo vi phạm</LinkStyled>
                                    <LinkStyled href="#" variant="body1">Liên hệ</LinkStyled>
                                </Stack>
                            </GridLinkStyled>
                            <GridLinkStyled direction="column" size={4}>
                                <Typography variant="h6" fontWeight={600} mb={2}>
                                    Zalo
                                </Typography>

                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        <LinkStyled href="#" variant="body1">Tuyển dụng</LinkStyled>
                                    </Stack>
                                    <Typography variant="h6" fontWeight={600} mb={2}>
                                        Tải xuống
                                    </Typography>
                                    <Stack spacing={2}>
                                        <LinkStyled href="#" variant="body1">Zalo PC</LinkStyled>
                                        <LinkStyled href="#" variant="body1">Zalo Web</LinkStyled>
                                    </Stack>
                                </Stack>
                            </GridLinkStyled>
                        </Grid>
                    </Stack>
                </ContainerLink>
            </Box>


        </Stack>


    )
}
export default LandingPage;