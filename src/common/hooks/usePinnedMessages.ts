import { useEffect, useState } from "react";
import { chatService } from "../service/chat-service";
import { UiMessage } from "../interface/chat-interface";
import { normalizeMessage } from "../helpers/chat.helpers";
import { useChatStore } from "../store/useChatStore";

export const usePinnedMessages = (conversationId: string) => {
  const [pinnedMessages, setPinnedMessages] = useState<UiMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = useChatStore((s) => s.currentUserId);

  const fetchPinnedMessages = async () => {
    if (!conversationId || !currentUserId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await chatService.fetchPinnedMessages(conversationId, currentUserId);
      const items = res?.payload?.data?.items || [];
      
      // Backend returns PinnedMessageDto[] with structure: { message, pinnedBy, pinnedAt }
      // Extract the message object from each item
      const messageObjects = items.map((item: any) => item.message);
      
      const normalized = messageObjects.map(normalizeMessage);
      setPinnedMessages(normalized);
    } catch (err: any) {
      setError(err?.message || "Không lấy được tin nhắn đã ghim");
      setPinnedMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinnedMessages();
  }, [conversationId, currentUserId]);

  return {
    pinnedMessages,
    loading,
    error,
    refetch: fetchPinnedMessages,
  };
};
