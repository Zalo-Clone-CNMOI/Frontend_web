"use client"
import { Box, Grid, Stack } from "@mui/material";
import Image from "next/image";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useAuthStore } from "@/src/common/store/useAuthStore";
const Me = () => {
    const {authData,setAuthData} = useAuthStore();
    console.log("auth data",authData)
    return (
       <Grid container width="100%">
        me
       </Grid>
    )
}
export default Me;