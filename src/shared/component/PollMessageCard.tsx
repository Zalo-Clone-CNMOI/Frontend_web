"use client";

import { useEffect, useMemo, useState } from "react";
import {
    AvatarGroup,
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { UiMessage } from "@/src/common/interface/chat-interface";
import { useChatStore } from "@/src/common/store/useChatStore";
import { usePollStore } from "@/src/common/store/usePollStore";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
interface PollMessageCardProps {
    messageId: UiMessage["messageId"];
    conversationId: string;
    pollFromMessage?: UiMessage["poll"];
}

const InlineCard = styled(Box)({
    width: 320,
    maxWidth: "100%",
    background: "#FFFFFF",
    borderRadius: 10,
    padding: "14px 12px 12px",
    boxShadow: "0 1px 2px rgba(16, 24, 40, 0.08)",
    border: "1px solid #EEF2F6",
    cursor: "pointer",
});

const PollQuestion = styled(Typography)({
    fontSize: 15,
    fontWeight: 600,
    color: "#1F2937",
    lineHeight: 1.35,
    marginBottom: 6,
});

const PollSubText = styled(Typography)({
    fontSize: 13,
    color: "#667085",
    lineHeight: 1.35,
});

const SummaryRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 4,
    marginTop: 12,
    marginBottom: 10,
    color: "#0068FF",
    fontSize: 13,
    fontWeight: 500,
});

const PreviewOptionRow = styled(Box)({
    position: "relative",
    minHeight: 36,
    borderRadius: 5,
    background: "#E9EEF5",
    overflow: "hidden",
});

const OptionFill = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    background: "#BBD8FF",
    transition: "width 0.2s ease",
});

const OptionContent = styled(Box)({
    position: "relative",
    zIndex: 1,
    height: 36,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "0 10px",
});

const OptionLabel = styled(Typography)({
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
});

const OptionCount = styled(Typography)({
    width: 22,
    textAlign: "right",
    fontSize: 14,
    color: "#344054",
});

const ChangeButton = styled(Button)({
    height: 34,
    marginTop: 10,
    borderRadius: 4,
    textTransform: "none",
    fontSize: 15,
    fontWeight: 600,
    color: "#0068FF",
    borderColor: "#0068FF",
    boxShadow: "none",
});

const DetailPaper = {
    borderRadius: "6px",
    width: 400,
    maxWidth: "calc(100vw - 32px)",
};

const DetailTitle = styled(DialogTitle)({
    height: 52,
    padding: "0 18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 16,
    fontWeight: 600,
    color: "#1F2937",
});

const DetailOptionRow = styled(Box, {
    shouldForwardProp: (prop) => prop !== "disabled",
})<{ disabled?: boolean }>(({ disabled }) => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
}));

const DetailBarWrap = styled(Box)({
    position: "relative",
    flex: 1,
    height: 38,
    borderRadius: 5,
    background: "#E9EEF5",
    overflow: "hidden",
});
const CheckedIcon = styled(CheckCircleRoundedIcon)({
    color: "#0068FF",
    fontSize: 22,
});

const UncheckedIcon = styled(RadioButtonUncheckedRoundedIcon)({
    color: "#D0D5DD",
    fontSize: 22,
});
const DetailBarFill = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    background: "#C8E0FF",
    transition: "width 0.2s ease",
});

const DetailBarText = styled(Box)({
    position: "relative",
    zIndex: 1,
    height: 38,
    display: "flex",
    alignItems: "center",
    paddingLeft: 12,
    fontSize: 14,
    color: "#1F2937",
});
const DetailOptionLabel = styled(Typography)({
    flex: 1,
    minWidth: 0,
    fontSize: 14,
    color: "#1F2937",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
});

const DetailVoteCount = styled(Typography)({
    width: 20,
    textAlign: "right",
    fontSize: 14,
    color: "#344054",
});
export default function PollMessageCard({
    messageId,
    conversationId,
    pollFromMessage,
}: PollMessageCardProps) {
    const messagesByConversation = useChatStore((s) => s.messagesByConversation);
    const currentUserId = useChatStore((s) => s.currentUserId);
    const conversationDetail = useChatStore((s) =>
        conversationId ? s.conversationDetailById[conversationId] : null
    );
    const message = useMemo(() => {
        return (
            messagesByConversation[conversationId]?.find(
                (item) => item.messageId === messageId
            ) ?? null
        );
    }, [conversationId, messagesByConversation, messageId]);

    const pollId =
        pollFromMessage?.id ??
        message?.poll_id ??
        message?.pollId ??
        message?.poll?.id ??
        undefined;

    const storePoll = usePollStore((s) =>
        pollId ? s.pollDetailById[pollId] : undefined
    );

    const poll = storePoll ?? pollFromMessage ?? message?.poll;
    const creatorId = poll?.creator_id;

    const creatorMember = conversationDetail?.members?.find(
        (member) => member.userId === creatorId || member.id === creatorId
    );

    const creatorName =
        poll?.created_by?.fullName ??
        creatorMember?.nickname ??
        creatorMember?.fullName ??
        "người tạo";
    const fetchPollDetail = usePollStore((s) => s.fetchPollDetail);
    const votePoll = usePollStore((s) => s.votePoll);
    const retractVote = usePollStore((s) => s.retractVote);
    const addOption = usePollStore((s) => s.addOption);

    const voting = usePollStore((s) =>
        poll?.id ? Boolean(s.votingByPollId[poll.id]) : false
    );

    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [addingOption, setAddingOption] = useState(false);
    const [newOptionLabel, setNewOptionLabel] = useState("");
    useEffect(() => {
        if (!conversationId || !pollId) return;

        void fetchPollDetail(conversationId, pollId);
    }, [conversationId, pollId, fetchPollDetail]);
    const isSameId = (a?: string | null, b?: string | null) => {
        if (!a || !b) return false;
        return String(a) === String(b);
    };
    const getMyVotedOptionIds = () => {
        if (!poll || !currentUserId) {
            return poll?.my_option_ids ?? [];
        }

        if (poll.my_option_ids?.length) {
            return poll.my_option_ids;
        }

        return poll.options
            .filter((option) => {
                const votedByVoterIds = option.voter_ids?.some((userId) =>
                    isSameId(userId, currentUserId)
                );

                const votedByVoters = option.voters?.some((voter: any) =>
                    isSameId(voter.id, currentUserId) ||
                    isSameId(voter.userId, currentUserId) ||
                    isSameId(voter.user_id, currentUserId)
                );

                return votedByVoterIds || votedByVoters;
            })
            .map((option) => option.id);
    };
    const isOptionChecked = (option: any) => {
        if (selectedIds.includes(option.id)) return true;

        if (!currentUserId) return false;

        const votedByVoterIds = option.voter_ids?.some((userId: string) =>
            isSameId(userId, currentUserId)
        );

        const votedByVoters = option.voters?.some((voter: any) =>
            isSameId(voter.id, currentUserId) ||
            isSameId(voter.userId, currentUserId) ||
            isSameId(voter.user_id, currentUserId)
        );

        return Boolean(votedByVoterIds || votedByVoters);
    };
    useEffect(() => {
        if (!poll?.id) return;

        setSelectedIds(getMyVotedOptionIds());
    }, [poll, currentUserId]);

    const totalVotes = useMemo(() => {
        if (!poll) return 0;

        return (
            poll.total_votes ??
            poll.options.reduce(
                (total, option) => total + Number(option.vote_count || 0),
                0
            )
        );
    }, [poll]);

    const totalVoters = poll?.total_voters ?? totalVotes;
    const isClosed = poll?.status === "closed";
    if (!poll) return null;

    const getPercent = (voteCount: number) => {
        if (!totalVotes) return 0;
        return Math.round((voteCount / totalVotes) * 100);
    };

    const summaryText =
        totalVoters > 0
            ? `${totalVoters} người bình chọn`
            : "Chưa có bình chọn";

    const handleToggleOption = (optionId: string) => {
        if (isClosed || voting) return;

        if (!poll.allow_multiple) {
            setSelectedIds((prev) => (prev.includes(optionId) ? [] : [optionId]));
            return;
        }

        setSelectedIds((prev) =>
            prev.includes(optionId)
                ? prev.filter((id) => id !== optionId)
                : [...prev, optionId]
        );
    };

    const handleConfirmVote = async () => {
        if (isClosed || voting) return;

        if (selectedIds.length === 0) {
            await retractVote(conversationId, poll.id);
        } else {
            await votePoll(conversationId, poll.id, selectedIds);
        }

        setDetailOpen(false);
    };

    const handleAddOption = async () => {
        const label = newOptionLabel.trim();

        if (!label || !poll.allow_add_option || isClosed || voting) return;

        await addOption(conversationId, poll.id, label);

        setNewOptionLabel("");
        setAddingOption(false);
    };

    return (
        <>
            <InlineCard onClick={() => setDetailOpen(true)}>
                <PollQuestion>{poll.question}</PollQuestion>

                <PollSubText>
                    {poll.allow_multiple ? "Chọn nhiều phương án" : "Chọn một phương án"}
                    {isClosed ? " • Đã đóng" : ""}
                </PollSubText>

                <SummaryRow>
                    <span>{summaryText}</span>
                    <KeyboardArrowRightRoundedIcon sx={{ fontSize: 18 }} />
                </SummaryRow>

                <Stack spacing={0.75}>
                    {poll.options.slice(0, 4).map((option) => {
                        const checked = isOptionChecked(option);
                        const voteCount = Number(option.vote_count || 0);
                        const percent = getPercent(voteCount);

                        return (
                            <PreviewOptionRow key={option.id}>
                                <OptionFill sx={{ width: `${percent}%` }} />

                                <OptionContent>
                                    <OptionLabel>{option.label}</OptionLabel>

                                    {checked && (
                                        <CheckCircleRoundedIcon
                                            sx={{ fontSize: 18, color: "#0068FF" }}
                                        />
                                    )}

                                    <OptionCount>{voteCount}</OptionCount>
                                </OptionContent>
                            </PreviewOptionRow>
                        );
                    })}
                </Stack>

                {!isClosed && (
                    <ChangeButton
                        fullWidth
                        variant="outlined"
                        onClick={(event) => {
                            event.stopPropagation();
                            setDetailOpen(true);
                        }}
                    >
                        {selectedIds.length > 0 ? "Đổi lựa chọn" : "Bình chọn"}
                    </ChangeButton>
                )}
            </InlineCard>

            <Dialog
                open={detailOpen}
                onClose={() => setDetailOpen(false)}
                PaperProps={{ sx: DetailPaper }}
            >
                <DetailTitle>
                    Bình chọn

                    <IconButton size="small" onClick={() => setDetailOpen(false)}>
                        <CloseRoundedIcon fontSize="small" />
                    </IconButton>
                </DetailTitle>

                <Divider />

                <DialogContent sx={{ p: 0 }}>
                    <Box sx={{ px: 2.25, pt: 2, pb: 1.5 }}>
                        <Typography fontSize={16} fontWeight={700} color="#1F2937">
                            {poll.question}
                        </Typography>

                        <Typography fontSize={12.5} color="#667085" mt={0.75}>
                            Tạo bởi {creatorName}                        </Typography>

                        <Box display="flex" alignItems="center" gap={1} mt={1.5}>
                            <PollOutlinedIcon sx={{ fontSize: 17, color: "#667085" }} />
                            <Typography fontSize={13} color="#667085">
                                {poll.allow_multiple
                                    ? "Chọn nhiều phương án"
                                    : "Chọn một phương án"}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ px: 2.25, py: 1.5 }}>
                        <SummaryRow sx={{ mt: 0, mb: 1.5 }}>
                            <span>
                                {totalVoters} người bình chọn, {totalVotes} lượt bình chọn
                            </span>
                            <KeyboardArrowRightRoundedIcon sx={{ fontSize: 18 }} />
                        </SummaryRow>

                        <Stack spacing={1.1}>
                            {poll.options.map((option) => {
                                const checked = selectedIds.includes(option.id);
                                const voteCount = Number(option.vote_count || 0);
                                const percent = getPercent(voteCount);

                                return (
                                    <DetailOptionRow
                                        key={option.id}
                                        disabled={isClosed || voting}
                                        onClick={() => handleToggleOption(option.id)}
                                    >
                                        {checked ? (
                                            <CheckedIcon />
                                        ) : (
                                            <UncheckedIcon />
                                        )}

                                        <DetailBarWrap>
                                            <DetailBarFill style={{ width: `${percent}%` }} />

                                            <DetailBarText>
                                                <DetailOptionLabel>{option.label}</DetailOptionLabel>
                                            </DetailBarText>
                                        </DetailBarWrap>

                                        <DetailVoteCount>{voteCount}</DetailVoteCount>
                                    </DetailOptionRow>
                                );
                            })}
                        </Stack>

                        {poll.allow_add_option && !isClosed && (
                            <Box sx={{ mt: 1.5 }}>
                                {!addingOption ? (
                                    <Button
                                        startIcon={<AddRoundedIcon />}
                                        disabled={voting}
                                        onClick={() => setAddingOption(true)}
                                        sx={{
                                            px: 0,
                                            textTransform: "none",
                                            color: "#0068FF",
                                            fontSize: 15,
                                            fontWeight: 500,
                                            "&:hover": {
                                                background: "transparent",
                                            },
                                        }}
                                    >
                                        Thêm lựa chọn
                                    </Button>
                                ) : (
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <TextField
                                            autoFocus
                                            fullWidth
                                            size="small"
                                            placeholder="Nhập lựa chọn"
                                            value={newOptionLabel}
                                            onChange={(event) => setNewOptionLabel(event.target.value)}
                                            onKeyDown={(event) => {
                                                if (event.key === "Enter") {
                                                    event.preventDefault();
                                                    void handleAddOption();
                                                }

                                                if (event.key === "Escape") {
                                                    setAddingOption(false);
                                                    setNewOptionLabel("");
                                                }
                                            }}
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    height: 36,
                                                    borderRadius: "6px",
                                                    fontSize: 14,
                                                    backgroundColor: "#F8FAFC",
                                                    "& fieldset": {
                                                        borderColor: "#D0D5DD",
                                                    },
                                                    "&:hover fieldset": {
                                                        borderColor: "#98A2B3",
                                                    },
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "#0068FF",
                                                    },
                                                },
                                            }}
                                        />

                                        <Button
                                            variant="contained"
                                            disabled={voting || !newOptionLabel.trim()}
                                            onClick={() => void handleAddOption()}
                                            sx={{
                                                minWidth: 64,
                                                height: 36,
                                                textTransform: "none",
                                                borderRadius: "6px",
                                                backgroundColor: "#0068FF",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    backgroundColor: "#005AE0",
                                                    boxShadow: "none",
                                                },
                                            }}
                                        >
                                            Thêm
                                        </Button>

                                        <Button
                                            disabled={voting}
                                            onClick={() => {
                                                setAddingOption(false);
                                                setNewOptionLabel("");
                                            }}
                                            sx={{
                                                minWidth: 48,
                                                height: 36,
                                                textTransform: "none",
                                                color: "#667085",
                                            }}
                                        >
                                            Hủy
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>

                    <Divider />

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ px: 2.25, py: 1.5 }}
                    >
                        <IconButton size="small">
                            <SettingsOutlinedIcon sx={{ color: "#667085" }} />
                        </IconButton>

                        <Box display="flex" gap={1}>
                            <Button
                                variant="contained"
                                disabled={voting}
                                onClick={() => setDetailOpen(false)}
                                sx={{
                                    minWidth: 72,
                                    textTransform: "none",
                                    color: "#344054",
                                    backgroundColor: "#EEF2F6",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "#E4E7EC",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Hủy
                            </Button>

                            <Button
                                variant="contained"
                                disabled={voting || isClosed}
                                onClick={() => void handleConfirmVote()}
                                sx={{
                                    minWidth: 92,
                                    textTransform: "none",
                                    backgroundColor: "#8FC5FF",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "#69B2FF",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}