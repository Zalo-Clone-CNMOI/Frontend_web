"use client";

import {
    Box, Stack, Grid, Button, Typography, ListItemText, MenuItem, MenuList,
    Paper, Divider, Tab, Checkbox
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SearchBar from "./components/SearchBar";
import AppSidebar from "./components/AppSideBar";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuthStore } from "@/src/common/store/useAuthStore";
import FilterCategoryDropdown from "./components/DropdownCategory";
const Panel = styled(Box)({
    overflow: "hidden",
    height: "calc(100vh - 66.5px )",
});

export const ChatTabsWrapper = styled(Box)({
    borderBottom: "1px solid #E5E7EB",
    padding: "0 16px",
    display: "flex",
    justifyContent: "space-between",
});

export const TabListStyled = styled(TabList)({
    minHeight: 24,

    "& .MuiTabs-flexContainer": {
        minHeight: 24,
        gap: "12px",
    },
    "& .MuiTabs-indicator": {
        height: 2,
        backgroundColor: "#005AE0",
    },
});

export const TabStyled = styled(Tab)({
    minHeight: 32,
    height: 32,
    padding: "0",
    textTransform: "none",
    fontSize: 14,
    fontWeight: 600,
    minWidth: "unset",
    width: "auto",
    "&:hover": {
        backgroundColor: "transparent",
        color: "#005AE0",
    },
    "&.Mui-focusVisible": {
        backgroundColor: "transparent",
    },
    "& .MuiTouchRipple-root": {
        display: "none",
    },
    "&.Mui-selected": {
        color: "#005AE0",
    },
});

const TabPanelStyled = styled(TabPanel)({
    padding: 16,
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
});
const CategoryFilterButton = styled(Button)(({ theme }) => ({
    textTransform: "none",
    fontSize: 13,
    minHeight: 24,
    height: 24,
    borderRadius: 12,
    padding: "0 12px",
    color: theme.palette.text.primary,
    "&:hover": {
        backgroundColor: "#EBECF0",
    },

    "&.active": {
        backgroundColor: "#E5F1FF",
    },
}));

export const DropdownWrapper = styled(Box)(() => ({
    position: "relative",
    display: "inline-block",
}));


export const StyledMoreIcon = styled(MoreHorizIcon)(() => ({
    fontSize: 20,
    borderRadius: "50%",
    padding: 4,
    cursor: "pointer",
    transition: "background-color 0.2s ease",

    "&:hover": {
        backgroundColor: "#EBECF0",
    },
}));
type SidebarKey =
    | "chat"
    | "contact"
    | "cloud"
    | "folder"
    | "business"
    | "settings";

export type FilterCategoryKey =
    | "Customer"
    | "Family"
    | "Work"
    | "Friends"
    | "Reply later"
    | "Colleague"
    | "Other";

const Me = () => {
    const { authData, setAuthData } = useAuthStore();
    const [selectedIcon, setSelectedIcon] = useState<SidebarKey>("chat");
    const [chatTab, setChatTab] = useState<string>("allChats");
    const [isSelectedCategory, setSelectedCategory] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<FilterCategoryKey[]>([]);
    const handleSelectedIcon = (iconName: SidebarKey) => {
        setSelectedIcon(iconName);
        console.log("Selected icon:", iconName);
    };

    const handleChangeChatTab = (event: React.SyntheticEvent, newTab: string) => {
        setChatTab(newTab);
        console.log("Selected chat tab:", newTab);
    };
    const getCategoryLabel = () => {
        if (selectedCategories.length === 0) return "Phân loại";

        if (selectedCategories.length === 1) {
            return selectedCategories[0];
        }

        return `${selectedCategories.length} thẻ`;
    };
    return (
        <Grid container sx={{ height: "100vh", width: "100vw" }}>
            <AppSidebar selectedIcon={selectedIcon} onSelect={handleSelectedIcon} />

            <Grid
                sx={{
                    minWidth: 345,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid #E5E7EB",
                }}
            >
                <SearchBar />

                <TabContext value={chatTab}>
                    <ChatTabsWrapper data-testid="chat-tabs">
                        <TabListStyled
                            onChange={handleChangeChatTab}
                            aria-label="lab API tabs example"
                        >
                            <TabStyled label="Tất cả" value="allChats" />
                            <TabStyled label="Chưa đọc" value="unRead" />
                        </TabListStyled>
                        <Grid alignItems="center" display="flex" gap={.5}>
                            <ClickAwayListener onClickAway={() => setSelectedCategory(false)}>
                                <DropdownWrapper>
                                    <CategoryFilterButton
                                        className={selectedCategories.length > 0 ? "active" : ""}
                                        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                                        onClick={() => setSelectedCategory((prev) => !prev)}
                                    >
                                        {getCategoryLabel()}
                                    </CategoryFilterButton>

                                    {isSelectedCategory && (
                                        <FilterCategoryDropdown
                                            selected={selectedCategories}
                                            onChange={setSelectedCategories}
                                        />
                                    )}
                                </DropdownWrapper>
                            </ClickAwayListener>
                            <StyledMoreIcon />
                        </Grid >
                    </ChatTabsWrapper>

                    <TabPanelStyled value="allChats">all chats</TabPanelStyled>
                    <TabPanelStyled value="unRead">Unread</TabPanelStyled>

                </TabContext>
            </Grid>

            <Grid size="grow">
                <Panel>
                    {/* <Box p={2} fontWeight={700}>
                Main
            </Box> */}

                    <Box p={2} color="#6B7280">
                        {/* Tab đang chọn: {selectedIcon} */}
                        chát bên đây nè
                    </Box>
                </Panel>
            </Grid>
        </Grid>
    );
};

export default Me;