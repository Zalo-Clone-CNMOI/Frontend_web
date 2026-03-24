"use client";

import { useEffect, useMemo, useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChatStore } from "@/src/common/store/useChatStore";

interface ChatPanelProps {
  accessToken: string;
  currentUserId: string;
  conversationId: string;
  title?: string;
}

const Root = styled(Box)({
  width: "100%",
  height: "100%",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  border: "1px solid #E6EAF0",
  overflow: "hidden",
  minHeight: 0,
});

const HeaderWrap = styled(Box)({
  height: 68,
  minHeight: 68,
  maxHeight: 68,
  flexShrink: 0,
});

const MessageListWrap = styled(Box)({
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

const InputWrap = styled(Box)({
  height: 50,
  minHeight: 50,
  maxHeight: 50,
  flexShrink: 0,
});

export default function ChatPanel({
  accessToken,
  currentUserId,
  conversationId,
  title,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const {
    initChat,
    openConversation,
    loadMoreMessages,
    sendMessage,
    deleteMessage,
    socketConnected,
    messagesByConversation,
    paginationByConversation,
    error,
  } = useChatStore();

  const messages = useMemo(
    () => messagesByConversation[conversationId] || [],
    [messagesByConversation, conversationId]
  );

  const pagination = paginationByConversation[conversationId];

  useEffect(() => {
    if (!accessToken || !currentUserId) return;
    initChat(accessToken, currentUserId);
  }, [accessToken, currentUserId, initChat]);

  useEffect(() => {
    if (!conversationId) return;
    openConversation(conversationId);
  }, [conversationId, openConversation]);

  useEffect(() => {
    const wrap = listRef.current;
    if (!wrap) return;
    wrap.scrollTo({ top: wrap.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <Root>
      <HeaderWrap>
        <ChatHeader
          title={title}
          socketConnected={socketConnected}
          error={error}
        />
      </HeaderWrap>

      <MessageListWrap>
        <MessageList
          listRef={listRef}
          messages={messages}
          currentUserId={currentUserId}
          conversationId={conversationId}
          pagination={pagination}
          onLoadMore={loadMoreMessages}
          onDeleteMessage={deleteMessage}
        />
      </MessageListWrap>

      <InputWrap>
        <ChatInput
          disabled={false}
          onSend={(text) => sendMessage(conversationId, text)}
        />
      </InputWrap>
    </Root>
  );
}