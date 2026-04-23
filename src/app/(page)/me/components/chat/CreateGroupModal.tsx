"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    InputBase,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import AppModal from "@/src/shared/component/AppModal";
import AppAvatar from "@/src/shared/component/Avatar";
import { useFriendStore } from "@/src/common/store/useFriendStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { chatService } from "@/src/common/service/chat-service";
import { groupService } from "@/src/common/service/group-service";

interface CreateGroupModalProps {
    open: boolean;
    onClose: () => void;
}

const SearchWrap = styled(Box)({
    height: 40,
    display: "flex",
    alignItems: "center",
    background: "#F3F4F6",
    borderRadius: 8,
    padding: "0 10px",
    marginBottom: 16,
});

const SearchInput = styled(InputBase)({
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
});

const SelectedWrap = styled(Box)({
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
    minHeight: 24,
});

const SelectedItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 6,
    background: "#EEF4FF",
    borderRadius: 16,
    padding: "4px 10px",
});

export default function CreateGroupModal({
    open,
    onClose,
}: CreateGroupModalProps) {
    const friends = useFriendStore((s) => s.friends);
    const fetchFriends = useFriendStore((s) => s.fetchFriends);
    const upsertConversationToTop = useChatStore((s) => s.upsertConversationToTop);
    const setActiveConversationId = useChatStore((s) => s.setActiveConversationId);

    const [groupName, setGroupName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!open) return;
        void fetchFriends();
    }, [open, fetchFriends]);

    useEffect(() => {
        if (!open) {
            setGroupName("");
            setKeyword("");
            setSelectedUserIds([]);
            setSubmitting(false);
        }
    }, [open]);

    const filteredFriends = useMemo(() => {
        const q = keyword.trim().toLowerCase();
        if (!q) return friends;

        return friends.filter((item) =>
            (item.fullName || "").toLowerCase().includes(q)
        );
    }, [friends, keyword]);

    const selectedFriends = useMemo(
        () => friends.filter((item) => selectedUserIds.includes(item.id)),
        [friends, selectedUserIds]
    );

    const toggleUser = (userId: string) => {
        setSelectedUserIds((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleCreateGroup = async () => {
        if (selectedUserIds.length < 2) {
            alert("Vui lòng chọn ít nhất 2 thành viên để tạo nhóm");
            return;
        }

        try {
            setSubmitting(true);

            const res = await groupService.createGroupConversation(
                groupName.trim() || "",
                selectedUserIds
            );

            const newConversation = res?.payload?.data
            if (!newConversation) {
                throw new Error("Không tạo được nhóm");
            }

            upsertConversationToTop(newConversation);
            setActiveConversationId(newConversation.id);
            onClose();
        } catch (error: any) {
            alert(error?.message || "Tạo nhóm thất bại");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AppModal
            open={open}
            onClose={onClose}
            title="Tạo nhóm"
            maxWidth="xs"
            fullWidth
            headerDivider
            actions={
                <>
                    <Button onClick={onClose} disabled={submitting}>
                        Hủy
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateGroup}
                        disabled={submitting || selectedUserIds.length < 2}
                    >
                        {submitting ? "Đang tạo..." : "Tạo nhóm"}
                    </Button>
                </>
            }
        >
            <Typography sx={{ mb: 1, fontSize: 13, color: "#6B7280" }}>
                Tên nhóm
            </Typography>

            <SearchWrap sx={{ mb: 2 }}>
                <InputBase
                    placeholder="Nhập tên nhóm"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    sx={{ flex: 1, fontSize: 14 }}
                />
            </SearchWrap>

            <Typography sx={{ mb: 1, fontSize: 13, color: "#6B7280" }}>
                Thành viên đã chọn ({selectedUserIds.length})
            </Typography>

            <SelectedWrap>
                {selectedFriends.map((item) => (
                    <SelectedItem key={item.id}>
                        <AppAvatar
                            size={24}
                            fontSize={12}
                            name={item.fullName || "U"}
                            src={item.avatarUrl || ""}
                        />
                        <Typography sx={{ fontSize: 12 }}>
                            {item.fullName || "Người dùng"}
                        </Typography>
                    </SelectedItem>
                ))}
            </SelectedWrap>

            <SearchWrap>
                <SearchIcon sx={{ fontSize: 20, color: "#6B7280" }} />
                <SearchInput
                    placeholder="Tìm bạn bè"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </SearchWrap>

            <List sx={{ maxHeight: 320, overflowY: "auto", pt: 0 }}>
                {filteredFriends.map((item) => {
                    const checked = selectedUserIds.includes(item.id);

                    return (
                        <ListItemButton key={item.id} onClick={() => toggleUser(item.id)}>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                                <Checkbox edge="start" checked={checked} tabIndex={-1} />
                            </ListItemIcon>

                            <AppAvatar
                                size={36}
                                name={item.fullName || "U"}
                                src={item.avatarUrl || ""}
                                sx={{ mr: 1.5 }}
                            />

                            <ListItemText primary={item.fullName || "Người dùng"} />
                        </ListItemButton>
                    );
                })}
            </List>
        </AppModal>
    );
}