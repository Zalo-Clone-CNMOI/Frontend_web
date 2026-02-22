"use client";

import { Box, Grid, IconButton, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useState } from "react";
const BoxSearchBar = styled(Box)({
    height: 32,
    minWidth: 50,
    display: "flex",
    alignItems: "center",
    backgroundColor: "#ebecf0",
    padding: "0px 8px",
    borderRadius: 5,
    transition: "all 0.2s ease",

    "&:hover": {
        backgroundColor: "#e5e7eb",
    },

    "&:focus-within": {
        boxShadow: "0 0 0 .5px #005ae0",
    },
});

const SearchInput = styled(InputBase)({
    padding: "0px 8px",
    fontSize: 14,
    flex: 1,
    width: "100%",
});

const ActionBtn = styled(IconButton)({
    width: "fit-content",
    height: 32,
    borderRadius: "5px",
    "&:hover": {
        backgroundColor: "#e5e7eb",
    },

});
const CloseSearch = styled(Typography)({
    minWidth: "68px",
    fontWeight: 600,
    variant: "h6",
    color: "#000000",
})
const GridSearch = styled(Grid)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "8px",
    padding: "16px",
})
const SearchBar = () => {
    const [focusOnSearch, setFocusOnSearch] = useState(false);
    const handleFocusSearchBar = () => {
        setFocusOnSearch(true);
        console.log("Focus on search bar", focusOnSearch);
    }
    return (
        <GridSearch
        >
            <BoxSearchBar onFocus={() => handleFocusSearchBar()}>
                <SearchIcon sx={{ fontSize: 22, color: "#353535" }} />
                <SearchInput placeholder="Tìm kiếm" />
            </BoxSearchBar >
            {focusOnSearch ? <ActionBtn onClick={() => setFocusOnSearch(false)}>
                <CloseSearch>Đóng</CloseSearch>
            </ActionBtn> :
                <>
                    <ActionBtn>
                        <PersonAddAltOutlinedIcon sx={{ fontSize: 22, color: "#353535" }} />
                    </ActionBtn>
                    <ActionBtn>
                        <GroupAddOutlinedIcon sx={{ fontSize: 22, color: "#353535" }} />
                    </ActionBtn>
                </>}

        </GridSearch>
    );
};

export default SearchBar;