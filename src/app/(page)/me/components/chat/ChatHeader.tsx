"use client";

import { useChatStore } from "@/src/common/store/useChatStore";
import { usePresenceStore } from "@/src/common/store/usePresenceStore";
import { getSocket } from "@/src/common/socket/socket";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface ChatHeaderProps {
  title?: string;
  socketConnected: boolean;
  error?: string | null;
  conversationId: string | null
}

const HeaderRoot = styled(Box)({
  width: "100%",
  background: "#FFFFFF",
  minHeight:70,
  display:"flex",
  flexDirection:"column",
  justifyContent:"center",
  paddingLeft:"16px",
  borderBottom: "1px solid #E5E7EB"
});

const HeaderTop = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height:"100%",
  width:"100%"
});

const HeaderLeft = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const HeaderTitle = styled(Typography)({
  fontSize: 18,
  fontWeight: 600,
  color: "#111827",
  lineHeight: 1.2,
});

const HeaderSubtitle = styled(Typography)({
  fontSize: 13,
  color: "#6B7280",
  lineHeight: 1.2,
  display: "flex",
  alignItems: "center",
});

const StatusDot = styled("span")<{ online?: boolean }>(({ online }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: online ? "#00C853" : "#D1D5DB",
  display: "inline-block",
  marginRight: 8,
  boxShadow: online ? "0 0 0 2px rgba(0, 200, 83, 0.1)" : "none",
}));

export default function ChatHeader({
  socketConnected,
  conversationId
}: ChatHeaderProps) {
  const listConversation = useChatStore((s) => s.listConversation)
  const presenceMap = usePresenceStore((s) => s.presenceMap)

  const currentConversation = listConversation.find((n) => n.id === conversationId)
  // Get other user ID from last message sender (since ConversationDto doesn't have otherUserId)
  const otherUserId = currentConversation?.lastMessage?.senderId

  const otherUserPresence = otherUserId ? presenceMap[otherUserId] : null

  const getStatusText = () => {
    if (!otherUserPresence) return socketConnected ? "" : ""
    
    if (otherUserPresence.status === 'online') return 'Đang hoạt động'
    if (!otherUserPresence.last_seen_at) return 'Offline'

    const now = Date.now()
    const diff = now - otherUserPresence.last_seen_at
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Vừa truy cập'
    if (minutes < 60) return `${minutes} phút trước`
    if (hours < 24) return `${hours} giờ trước`
    if (days < 7) return `${days} ngày trước`
    return new Date(otherUserPresence.last_seen_at).toLocaleDateString('vi-VN')
  }

  const isOnline = otherUserPresence?.status === 'online'

  return (
    <HeaderRoot>
      <HeaderTop>
        <HeaderLeft>
          <HeaderTitle>{currentConversation?.name}</HeaderTitle>
          <HeaderSubtitle>
            {otherUserId ? (
              <>
                <StatusDot online={isOnline} />
                {getStatusText()}
              </>
            ) : (
              <>
                <StatusDot online={socketConnected} />
                {socketConnected ? "" : ""}
              </>
            )}
          </HeaderSubtitle>
        </HeaderLeft>
      </HeaderTop>

      {/* {error && (
        <ErrorBar>
          <ErrorText>{error}</ErrorText>
        </ErrorBar>
      )} */}
    </HeaderRoot>
  );
}