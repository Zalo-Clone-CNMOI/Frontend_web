"use client";

import { IconButton, Tooltip, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

interface MessageActionsProps {
  mine?: boolean;
  canReply: boolean;
  canDelete: boolean;
  canForward: boolean;
  onReply: () => void;
  onDelete: () => void;
  onForward: () => void;
}

const ActionsWrap = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  display: "flex",
  alignItems: "center",
  gap: 4,
  opacity: 0,
  visibility: "hidden",
  transform: "translateY(4px)",
  transition: "all 0.2s ease",
  pointerEvents: "auto",
  order: mine ? -1 : 1,
}));

export default function MessageActions({
  mine,
  canReply,
  canDelete,
  canForward,
  onReply,
  onDelete,
  onForward,
}: MessageActionsProps) {
  return (
    <ActionsWrap className="message-actions" mine={mine}>
      {canReply && (
        <Tooltip title="Trả lời">
          <IconButton size="small" onClick={onReply}>
            <ReplyOutlinedIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {canForward && (
        <Tooltip title="Chuyển tiếp">
          <IconButton size="small" onClick={onForward}>
            <ForwardToInboxIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      {canDelete && (
        <Tooltip title="Xóa tin nhắn">
          <IconButton size="small" onClick={onDelete}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </ActionsWrap>
  );
}