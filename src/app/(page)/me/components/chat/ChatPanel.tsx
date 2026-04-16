"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChatStore } from "@/src/common/store/useChatStore";
import {
  loadMoreMessages,
  openConversation,
  sendMessage,
} from "@/src/common/action/chat.action";
import { UiMessage } from "@/src/common/interface/chat-interface";

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
  overflow: "hidden",
  minHeight: 0,
});

const HeaderWrap = styled(Box)({
  height: 70,
  minHeight: 70,
  maxHeight: 70,
  flexShrink: 0,
  borderBottom: "1px solid #E5E7EB",
});

const MessageListWrap = styled(Box)({
  flex: 1,
  minHeight: 0,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
});

const InputWrap = styled(Box)({
  minHeight: 50,
  flexShrink: 0,
});

export default function ChatPanel({
  accessToken,
  currentUserId,
  conversationId,
  title,
}: ChatPanelProps) {
  const listRef = useRef<HTMLDivElement | null>(null);

  const isAutoScrollingRef = useRef(false);
  const scrollHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prevConversationIdRef = useRef<string | null>(null);
  const prevFirstMessageIdRef = useRef<UiMessage["messageId"] | null>(null);
  const prevLastMessageIdRef = useRef<UiMessage["messageId"] | null>(null);
  const pendingMediaScrollMessageIdRef = useRef<UiMessage["messageId"] | null>(null);
  const isLoadingMoreRef = useRef(false);
  const prevScrollHeightRef = useRef(0);

  const scrollIntentRef = useRef<"none" | "open" | "load-more">("none");

  const [showScrollbar, setShowScrollbar] = useState(false);
  const [editMessage, setEditMessage] = useState<UiMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState<UiMessage | null>(null);

  const {
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
  const loadingMore = pagination?.loadingMore;
  const loading = pagination?.loading;

  const firstMessageId = messages[0]?.messageId ?? null;
  const lastMessageId = messages[messages.length - 1]?.messageId ?? null;

  const isNearBottom = () => {
    const wrap = listRef.current;
    if (!wrap) return false;

    const threshold = 120;
    return wrap.scrollHeight - wrap.scrollTop - wrap.clientHeight <= threshold;
  };

  const scrollToBottomStable = () => {
    const wrap = listRef.current;
    if (!wrap) return;
    isAutoScrollingRef.current = true;

    requestAnimationFrame(() => {
      const node1 = listRef.current;
      if (!node1) {
        isAutoScrollingRef.current = false;
        return;
      }

      node1.scrollTop = node1.scrollHeight;

      requestAnimationFrame(() => {
        const node2 = listRef.current;
        if (!node2) {
          isAutoScrollingRef.current = false;
          return;
        }

        node2.scrollTop = node2.scrollHeight;

        requestAnimationFrame(() => {
          isAutoScrollingRef.current = false;
        });
      });
    });
  };

  const handleMediaLoad = (messageId: UiMessage["messageId"]) => {
    const wrap = listRef.current;
    if (!wrap) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    const isLastMessage = lastMessage.messageId === messageId;
    if (!isLastMessage) return;

    const shouldScroll =
      lastMessage.senderId === currentUserId ||
      isNearBottom() ||
      pendingMediaScrollMessageIdRef.current === messageId;

    if (!shouldScroll) return;

    requestAnimationFrame(() => {
      scrollToBottomStable();

      if (pendingMediaScrollMessageIdRef.current === messageId) {
        pendingMediaScrollMessageIdRef.current = null;
      }
    });
  };

  const tryLoadMore = async () => {
    const wrap = listRef.current;
    if (!wrap || !conversationId || loading || loadingMore || !pagination?.hasMore) {
      return;
    }

    prevScrollHeightRef.current = wrap.scrollHeight;
    isLoadingMoreRef.current = true;
    scrollIntentRef.current = "load-more";
    await loadMoreMessages(conversationId);
  };

  const handleScroll = () => {
    if (isAutoScrollingRef.current) return;

    const wrap = listRef.current;
    if (!wrap) return;

    setShowScrollbar(true);

    if (scrollHideTimeoutRef.current) {
      clearTimeout(scrollHideTimeoutRef.current);
    }

    scrollHideTimeoutRef.current = setTimeout(() => setShowScrollbar(false), 800);

    if (scrollIntentRef.current === "none" && wrap.scrollTop <= 80) {
      void tryLoadMore();
    }
  };

  const handleReplyMessage = (msg: UiMessage) => {
    setEditMessage(null);
    setReplyMessage(msg);
  };

  const handleCancelReply = () => {
    setReplyMessage(null);
  };

  const handleCancelEdit = () => {
    setEditMessage(null);
  };

  useEffect(() => {
    if (!conversationId) return;

    prevConversationIdRef.current = conversationId;
    scrollIntentRef.current = "open";
    isLoadingMoreRef.current = false;
    prevScrollHeightRef.current = 0;
    prevFirstMessageIdRef.current = null;
    prevLastMessageIdRef.current = null;

    openConversation(conversationId);
  }, [conversationId]);

  useLayoutEffect(() => {
    const wrap = listRef.current;
    if (!wrap) return;

    const intent = scrollIntentRef.current;

    if (intent === "open" && !loading && !loadingMore && messages.length > 0) {
      scrollToBottomStable();
      scrollIntentRef.current = "none";
      prevFirstMessageIdRef.current = firstMessageId;
      prevLastMessageIdRef.current = lastMessageId;
      return;
    }

    if (intent === "load-more" && !loadingMore) {
      isLoadingMoreRef.current = false;
      scrollIntentRef.current = "none";
      prevFirstMessageIdRef.current = firstMessageId;
      prevLastMessageIdRef.current = lastMessageId;
      return;
    }

    if (intent === "none" && !isLoadingMoreRef.current) {
      const prevLastMessageId = prevLastMessageIdRef.current;
      const isAppendedNewMessage =
        prevLastMessageId !== null &&
        lastMessageId !== null &&
        prevLastMessageId !== lastMessageId;

      if (isAppendedNewMessage && !loading && !loadingMore) {
        const lastMessage = messages[messages.length - 1];
        const isOwnMessage = lastMessage?.senderId === currentUserId;

        const hasMedia =
          lastMessage?.attachments?.some(
            (att) => att.type === "image" || att.type === "video"
          ) ?? false;

        if (isOwnMessage || isNearBottom()) {
          requestAnimationFrame(() => scrollToBottomStable());

          if (hasMedia && lastMessage?.messageId !== null && lastMessage?.messageId !== undefined) {
            pendingMediaScrollMessageIdRef.current = lastMessage.messageId;
          } else {
            pendingMediaScrollMessageIdRef.current = null;
          }
        }
      }

      prevFirstMessageIdRef.current = firstMessageId;
      prevLastMessageIdRef.current = lastMessageId;
    }
  }, [conversationId, messages, firstMessageId, lastMessageId, loading, loadingMore, currentUserId]);

  useEffect(() => {
    return () => {
      if (scrollHideTimeoutRef.current) {
        clearTimeout(scrollHideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Root>
      <HeaderWrap>
        <ChatHeader
          conversationId={conversationId}
          title={title}
          socketConnected={socketConnected}
          error={error}
        />
      </HeaderWrap>

      <MessageListWrap>
        <MessageList
          listRef={listRef}
          messages={messages}
          onReplyMessage={handleReplyMessage}
          currentUserId={currentUserId}
          conversationId={conversationId}
          onScroll={handleScroll}
          showScrollbar={showScrollbar}
          onMediaLoad={handleMediaLoad}
        />
      </MessageListWrap>

      <InputWrap>
        <ChatInput
          disabled={false}
          replyMessage={replyMessage}
          editMessage={editMessage}
          onCancelReply={handleCancelReply}
          onCancelEdit={handleCancelEdit}
          onSend={(text, attachments = []) =>
            sendMessage(conversationId, text, attachments, replyMessage)
          }
        />
      </InputWrap>
    </Root>
  );
}