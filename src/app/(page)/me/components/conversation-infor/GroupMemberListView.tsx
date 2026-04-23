"use client";

import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AppAvatar from "@/src/shared/component/Avatar";
import { ConversationMemberDto } from "@/src/common/interface/chat-interface";

interface GroupMemberListViewProps {
    members: ConversationMemberDto[];
    onBack: () => void;
    onOpenAddMember: () => void;
    onRemoveMember: (member: ConversationMemberDto) => void;
    myRole?: "owner" | "admin" | "member";
    currentUserId: string;
}

const Wrap = styled(Box)({
    background: "#fff",
    minHeight: "100%",
});

const Header = styled(Box)({
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "sticky",
    top: 0,
    background: "#fff",
    borderBottom: "1px solid #E5E7EB",
    zIndex: 5,
});

const BackBtn = styled(IconButton)({
    position: "absolute",
    left: 8,
});

const Title = styled(Typography)({
    fontSize: 18,
    fontWeight: 700,
    color: "#0F172A",
});

const AddBtnWrap = styled(Box)({
    padding: 16,
});

const SectionTitle = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px 8px",
});

const MemberRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
});

const MemberInfo = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 12,
});

const NameWrap = styled(Box)({
    display: "flex",
    flexDirection: "column",
});

const Name = styled(Typography)({
    fontSize: 15,
    fontWeight: 600,
    color: "#0F172A",
});

const Role = styled(Typography)({
    fontSize: 13,
    color: "#6B7280",
});

const canRemoveMember = (
    myRole?: "owner" | "admin" | "member",
    memberRole?: "owner" | "admin" | "member",
    isSelf?: boolean
) => {
    if (!myRole || !memberRole) return false;
    if (myRole === "member") return false;
    if (isSelf) return false;

    if (myRole === "owner") {
        return memberRole !== "owner";
    }

    if (myRole === "admin") {
        return memberRole === "member";
    }

    return false;
};

export default function GroupMemberListView({
    members,
    onBack,
    onOpenAddMember,
    onRemoveMember,
    myRole,
    currentUserId,
}: GroupMemberListViewProps) {
    return (
        <Wrap>
            <Header>
                <BackBtn onClick={onBack}>
                    <ArrowBackIosNewRoundedIcon fontSize="small" />
                </BackBtn>
                <Title>Thành viên</Title>
            </Header>

            <AddBtnWrap>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PersonAddAlt1OutlinedIcon />}
                    onClick={onOpenAddMember}
                >
                    Thêm thành viên
                </Button>
            </AddBtnWrap>

            <SectionTitle>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                    Danh sách thành viên ({members.length})
                </Typography>
                <IconButton size="small">
                    <MoreHorizRoundedIcon />
                </IconButton>
            </SectionTitle>

            {members.map((member) => {
                const avatarSrc = member.avatarUrl
                    ? `${(process.env.NEXT_PUBLIC_S3_BASE_URL || "").replace(/\/+$/, "")}/${member.avatarUrl.replace(/^\/+/, "")}`
                    : "";

                const isSelf = member.userId === currentUserId;
                const removable = canRemoveMember(myRole, member.role, isSelf);

                return (
                    <MemberRow key={member.id}>
                        <MemberInfo>
                            <AppAvatar
                                size={40}
                                name={member.nickname || member.fullName || "U"}
                                src={avatarSrc}
                            />
                            <NameWrap>
                                <Name>{member.nickname || member.fullName}</Name>
                                {(member.role === "owner" || member.role === "admin") && (
                                    <Role>
                                        {member.role === "owner" ? "Trưởng nhóm" : "Quản trị viên"}
                                    </Role>
                                )}
                            </NameWrap>
                        </MemberInfo>

                        {member.role !== "member" && removable && (
                            <IconButton
                                size="small"
                                onClick={() => onRemoveMember(member)}
                            >
                                <CloseRoundedIcon fontSize="small" />
                            </IconButton>
                        )}
                    </MemberRow>
                );
            })}
        </Wrap>
    );
}