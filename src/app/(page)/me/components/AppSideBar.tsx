"use client";

import { Box, Stack, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

import ChatIcon from "@mui/icons-material/Chat";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ContactsIcon from "@mui/icons-material/Contacts";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import CloudIcon from "@mui/icons-material/Cloud";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

import BoxIcon from "@/src/shared/component/BoxIcon";

const Sidebar = styled(Box)({
  minWidth: 56,
  height: "100vh",
  backgroundColor: "#005ae0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding:"0px 4px"
});

const AvatarStyled = styled(Avatar)({
  width: 40,
  height: 40,
  cursor: "pointer",
  marginTop: "32px",
});

type SidebarKey =
  | "chat"
  | "contact"
  | "cloud"
  | "folder"
  | "business"
  | "settings";

interface AppSidebarProps {
  selectedIcon: SidebarKey | string;
  onSelect: (iconName: SidebarKey) => void;
}

const AppSidebar = ({ selectedIcon, onSelect }: AppSidebarProps) => {
  return (
    <Grid data-testid="app-sidebar" sx={{ minWidth: 56, height: "100vh" }}>
      <Sidebar>
        <AvatarStyled src="/avatar.jpg" />

        <Stack justifyContent="space-between" height="100%">
          <Stack mt={2} spacing={1.25} alignItems="center">
            <BoxIcon
              outlined={ChatOutlinedIcon}
              filled={ChatIcon}
              selected={selectedIcon === "chat"}
              onClick={() => onSelect("chat")}
            />

            <BoxIcon
              outlined={ContactsOutlinedIcon}
              filled={ContactsIcon}
              selected={selectedIcon === "contact"}
              onClick={() => onSelect("contact")}
            />
          </Stack>

          <Stack mb={2} spacing={1.25} alignItems="center">
            <BoxIcon
              outlined={CloudOutlinedIcon}
              filled={CloudIcon}
              selected={selectedIcon === "cloud"}
              onClick={() => onSelect("cloud")}
            />

            <BoxIcon
              outlined={FolderCopyOutlinedIcon}
              filled={FolderCopyIcon}
              selected={selectedIcon === "folder"}
              onClick={() => onSelect("folder")}
            />

            <BoxIcon
              outlined={BusinessCenterOutlinedIcon}
              filled={BusinessCenterIcon}
              selected={selectedIcon === "business"}
              onClick={() => onSelect("business")}
            />

            <BoxIcon
              outlined={SettingsOutlinedIcon}
              filled={SettingsIcon}
              selected={selectedIcon === "settings"}
              onClick={() => onSelect("settings")}
            />
          </Stack>
        </Stack>
      </Sidebar>
    </Grid>
  );
};

export default AppSidebar;