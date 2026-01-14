"use client";

import styled from "@emotion/styled";
import { Box, Card, Container, Stack, Tab } from "@mui/material";
import Image from "next/image";
import React from "react";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import HomeTab from "./components/HomeTab";
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
        color:"#262626"
    },
});
const BoxIcon = styled(Box)({
    display: "flex",
    alignItems: "center",
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
                        <TabPanel value="products">Products content</TabPanel>
                        <TabPanel value="ai">AI content</TabPanel>
                        <TabPanel value="impact">Impact content</TabPanel>
                        <TabPanel value="about">About content</TabPanel>
                    </Box>
                </Stack>
            </TabContext>
            <Box></Box>
        </Stack>


    )
}
export default LandingPage;