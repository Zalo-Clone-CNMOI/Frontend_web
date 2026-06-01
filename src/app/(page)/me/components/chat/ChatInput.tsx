"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import dynamic from "next/dynamic";
import InsertEmoticonRoundedIcon from "@mui/icons-material/InsertEmoticonRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { EmojiClickData } from "emoji-picker-react";

import { ChatAttachmentPayload } from "@/src/common/interface/media-interface";
import { getCurrentUserId } from "@/src/common/utilities/utils";
import { useChatStore } from "@/src/common/store/useChatStore";
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { uploadManyChatMedia } from "@/src/common/service/chat-media-service";
import { UiMessage, ConversationMemberDto } from "@/src/common/interface/chat-interface";
import { useTypingIndicator } from "@/src/common/hooks/useTypingIndicator";
import { getSocket } from "@/src/common/socket/socket";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { normalizeGroupSettings } from "@/src/common/interface/group-settings-interface";

import ComposerToolbar from "./ComposerToolbar";
import { buildChatAttachmentPayload, sanitizeInputText } from "@/src/common/helpers/chatInput.helpers";
import PendingAttachmentList from "./PendingAttachmentsList";
import ComposerActionPreview from "./ComposerActionPreview";
import AdminMentionPopover from "./AdminMentionPopover";
import MentionSuggestions from "./MentionSuggestions";
import SmartReplyChips from "./SmartReplyChips";

// Synthetic Zai member prepended to group @mention list so users can discover
// and select @Zai without having to remember to type it manually.
const ZAI_BOT_ID =
  process.env.NEXT_PUBLIC_ZAI_BOT_ID ?? "00000000-0000-4000-8000-0000000000a1";
const ZAI_MEMBER: ConversationMemberDto = {
  id: ZAI_BOT_ID,
  userId: ZAI_BOT_ID,
  fullName: "Zai",
  avatarUrl: null,
  role: "member",
  nickname: "AI Assistant",
  joinedAt: "",
};

const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

interface ChatInputProps {
  disabled?: boolean;
  replyMessage?: UiMessage | null;
  editMessage?: UiMessage | null;
  onCancelReply?: () => void;
  onCancelEdit?: () => void;
  onSend: (
    value: string,
    attachments?: ChatAttachmentPayload[]
  ) => void | Promise<void>;
  onEdit?: (messageId: string, value: string) => void | Promise<void>;
}

const ComposerContainer = styled(Box)({
  borderTop: "1px solid #EEF1F4",
  background: "#fff",
});

const ComposerWrap = styled(Box)({
  minHeight: 50,
  maxHeight: 50,
  background: "#fff",
  display: "flex",
  alignItems: "center",
  boxSizing: "border-box",
});

const ComposerRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  gap: 8,
});

const StyledTextField = styled(TextField)({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    paddingRight: 4,
    alignItems: "center",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "& .MuiInputBase-input": {
    fontSize: 15,
    color: "#111827",
    lineHeight: 1.2,
  },
  "& .MuiInputBase-input::placeholder": {
    opacity: 0.5,
    paddingLeft: 4,
  },
});

const EmojiWrap = styled(Box)({
  position: "relative",
  width: 36,
  minWidth: 36,
  height: 36,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  marginRight: 8,
});

const PickerBox = styled(Box)({
  position: "absolute",
  bottom: 46,
  right: 0,
  zIndex: 20,
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
  borderRadius: 12,
  overflow: "hidden",
});

const StyledIconButton = styled(IconButton)({
  width: 36,
  minWidth: 36,
  height: 36,
  borderRadius: 10,
  color: "#64748B",
  flexShrink: 0,
  "&:hover": {
    background: "#F1F5F9",
  },
});

export default function ChatInput({
  disabled,
  replyMessage,
  editMessage,
  onCancelReply,
  onCancelEdit,
  onSend,
  onEdit,
}: ChatInputProps) {
  const t = useTrans();
  const [value, setValue] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const [pendingAttachments, setPendingAttachments] = useState<
    ChatAttachmentPayload[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [showAdminMention, setShowAdminMention] = useState(false);

  const [mentionOpen, setMentionOpen] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [mentionStart, setMentionStart] = useState(-1);
  const [selectedMentionIdx, setSelectedMentionIdx] = useState(0);

  const textInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentUserId = getCurrentUserId();
  const conversationId = useChatStore((s) => s.activeConversationId);
  const socket = getSocket();
  const currentUser = useAuthStore((s) => s.authData?.data?.user);

  const conversationDetail = useChatStore(
    (s) => s.conversationDetailById?.[conversationId ?? ""] ?? null
  );
  const isGroup = conversationDetail?.type === "group";
  const myRole = conversationDetail?.mySettings?.role ?? 'member';
  const settings = normalizeGroupSettings(conversationDetail?.settings);
  const adminTaggingEnabled = settings.features.admin_tagging;
  const isPrivileged = myRole === 'owner' || myRole === 'admin';
  const canUseAtAdmin = isPrivileged || adminTaggingEnabled;
  const adminMembers: ConversationMemberDto[] = (conversationDetail?.members ?? []).filter(
    (m) => m.role === "owner" || m.role === "admin"
  );

  const { emitTyping } = useTypingIndicator({
    socket,
    conversationId: conversationId || '',
    myUserId: currentUserId || '',
    enabled: !!conversationId && !!socket,
  });

  const toolbarDisabled = disabled || !!editMessage;

  const canSubmit = useMemo(() => {
    if (disabled || uploading) return false;

    if (editMessage) {
      return !!sanitizeInputText(value);
    }

    return !!sanitizeInputText(value) || pendingAttachments.length > 0;
  }, [disabled, uploading, editMessage, value, pendingAttachments.length]);

  const handleSelectFiles = async (files: FileList | null) => {
    if (
      !files ||
      files.length === 0 ||
      toolbarDisabled ||
      !currentUserId ||
      !conversationId
    ) {
      return;
    }

    try {
      setUploading(true);

      const fileArray = Array.from(files);
      const uploadedList = await uploadManyChatMedia(fileArray, conversationId);

      const nextAttachments = uploadedList.map((uploaded, index) =>
        buildChatAttachmentPayload(uploaded, fileArray[index])
      );

      setPendingAttachments((prev) => [...prev, ...nextAttachments]);
    } catch (error) {
      console.error("upload attachment error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    await handleSelectFiles(e.target.files);
    e.target.value = "";
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    await handleSelectFiles(e.target.files);
    e.target.value = "";
  };

  const handleRemoveAttachment = (key: string) => {
    setPendingAttachments((prev) => prev.filter((item) => item.key !== key));
  };

  const replaceAtAdminWithNames = (input: string): string => {
    if (!isGroup || !canUseAtAdmin || adminMembers.length === 0) return input;
    const names = adminMembers.map((m) => `@${m.fullName}`);
    const mentionText = names.join(" ");
    return input.replace(/(?:^|\s)@admin\b/gi, (match) =>
      match.startsWith(" ") ? ` ${mentionText}` : mentionText
    );
  };

  const handleSend = async () => {
    const rawText = value;
    const text = sanitizeInputText(rawText);

    if (editMessage) {
      if (!text || disabled || uploading) return;

      await onEdit?.(editMessage.messageId, text);
      setValue("");
      setOpenEmoji(false);
      setShowAdminMention(false);
      onCancelEdit?.();
      return;
    }

    if ((!text && pendingAttachments.length === 0) || disabled || uploading) {
      return;
    }

    const finalText = replaceAtAdminWithNames(text);
    await onSend(finalText, pendingAttachments);

    setValue("");
    setPendingAttachments([]);
    setOpenEmoji(false);
    setShowAdminMention(false);
    onCancelReply?.();
  };

  const allMembers: ConversationMemberDto[] = conversationDetail?.members ?? [];
  // Zai is always first; then all other members excluding self and deduping
  // the Zai bot entry (since ZAI_MEMBER is already prepended manually).
  const otherMembers = allMembers.filter(
    (m) => m.userId !== currentUserId && m.userId !== ZAI_BOT_ID,
  );
  const mentionMembers: ConversationMemberDto[] = [ZAI_MEMBER, ...otherMembers];

  const getFilteredMembers = (query: string) => {
    const lower = query
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    return mentionMembers.filter((m) => {
      const name = m.fullName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      const nick = (m.nickname ?? "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
      return name.includes(lower) || nick.includes(lower);
    });
  };

  const handleSelectMention = (member: ConversationMemberDto) => {
    const before = value.slice(0, mentionStart);
    const after = value.slice(mentionStart + mentionQuery.length + 1);
    const inserted = `@${member.fullName} `;
    const nextValue = before + inserted + after;
    setValue(nextValue);
    setMentionOpen(false);
    requestAnimationFrame(() => {
      const pos = before.length + inserted.length;
      textInputRef.current?.setSelectionRange(pos, pos);
      textInputRef.current?.focus();
    });
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (mentionOpen) {
      const filtered = getFilteredMembers(mentionQuery);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedMentionIdx((prev) => (prev + 1) % Math.max(filtered.length, 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedMentionIdx((prev) => (prev - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (filtered.length > 0 && filtered[selectedMentionIdx]) {
          handleSelectMention(filtered[selectedMentionIdx]);
        }
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setMentionOpen(false);
        return;
      }
    }

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue.trim() && conversationId) {
      const username = currentUser?.fullName || 'Bạn';
      emitTyping(username);
    }

    const input = textInputRef.current;
    const cursorPos = input?.selectionStart ?? newValue.length;
    const textBeforeCursor = newValue.slice(0, cursorPos);

    if (isGroup && canUseAtAdmin && adminMembers.length > 0) {
      const hasAtAdmin = /(?:^|\s)@admin$/i.test(textBeforeCursor);
      setShowAdminMention(hasAtAdmin);
    } else {
      setShowAdminMention(false);
    }

    // @-mention detection runs in all conversation types — Zai is always
    // available; human members only appear in groups (via mentionMembers).
    const mentionMatch = textBeforeCursor.match(/(?:^|\s)@([^\s@]*)$/);
    if (mentionMatch) {
      const rawQuery = mentionMatch[1];
      const atIndex = mentionMatch.index! + (textBeforeCursor[mentionMatch.index!] === "@" ? 0 : 1);
      setMentionQuery(rawQuery);
      setMentionStart(atIndex);
      setMentionOpen(true);
      setSelectedMentionIdx(0);
    } else {
      setMentionOpen(false);
      setMentionQuery("");
      setMentionStart(-1);
    }
  };

  // A2 — Smart Reply: prefill the composer with a chosen suggestion. This only
  // sets the input value (and focuses, caret at end); it never calls onSend, so
  // the user can edit before sending. Existing send/edit/reply/attachment flows
  // are untouched.
  const handlePickSmartReply = (text: string) => {
    setValue(text);
    requestAnimationFrame(() => {
      const input = textInputRef.current;
      if (!input) return;
      input.focus();
      const end = text.length;
      input.setSelectionRange(end, end);
    });
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const input = textInputRef.current;
    const emoji = emojiData.emoji;

    if (!input) {
      setValue((prev) => prev + emoji);
      return;
    }

    const start = input.selectionStart ?? value.length;
    const end = input.selectionEnd ?? value.length;

    const nextValue = value.slice(0, start) + emoji + value.slice(end);
    setValue(nextValue);

    requestAnimationFrame(() => {
      input.focus();
      const nextPos = start + emoji.length;
      input.setSelectionRange(nextPos, nextPos);
    });
  };

  useEffect(() => {
    if (editMessage) {
      setValue(sanitizeInputText(editMessage.body));
      setPendingAttachments([]);
      requestAnimationFrame(() => textInputRef.current?.focus());
    }
  }, [editMessage]);

  return (
    <ComposerContainer data-testid="chat-input">
      <ComposerToolbar
        disabled={toolbarDisabled}
        uploading={uploading}
        imageInputRef={imageInputRef}
        fileInputRef={fileInputRef}
        onImageChange={handleImageChange}
        onFileChange={handleFileChange}
      />

      <PendingAttachmentList
        attachments={pendingAttachments}
        onRemove={handleRemoveAttachment}
      />

      <ComposerActionPreview
        replyMessage={replyMessage}
        editMessage={editMessage}
        onCancelReply={onCancelReply}
        onCancelEdit={onCancelEdit}
      />

      {/* A2 — Smart Reply: inline suggestion chips directly above the input. */}
      {!editMessage && (
        <SmartReplyChips
          conversationId={conversationId}
          onPick={handlePickSmartReply}
        />
      )}

      {/* @mention dropdown — rendered inline above ComposerWrap so it never
          overlaps the toolbar. Position is determined by normal document flow. */}
      {mentionOpen && !showAdminMention && (
        <MentionSuggestions
          members={mentionMembers}
          query={mentionQuery}
          selectedIndex={selectedMentionIdx}
          onSelect={handleSelectMention}
          zaiMemberId={ZAI_BOT_ID}
        />
      )}

      <ComposerWrap sx={{ position: "relative" }}>
        {showAdminMention && (
          <AdminMentionPopover admins={adminMembers} />
        )}
        <ComposerRow>
          <StyledTextField
            fullWidth
            multiline
            minRows={1}
            maxRows={1}
            placeholder={t("CHAT.PLACEHOLDER")}
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={disabled || uploading}
            inputRef={textInputRef}
          />

          <EmojiWrap>
            <StyledIconButton
              onClick={() => setOpenEmoji((prev) => !prev)}
              disabled={disabled || uploading}
              aria-label="emoji"
            >
              <InsertEmoticonRoundedIcon fontSize="small" />
            </StyledIconButton>

            {openEmoji && (
              <PickerBox>
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={320}
                  height={400}
                  previewConfig={{ showPreview: false }}
                  searchDisabled={false}
                  skinTonesDisabled
                />
              </PickerBox>
            )}
          </EmojiWrap>

          <StyledIconButton
            onClick={() => void handleSend()}
            disabled={!canSubmit}
            aria-label="send-message"
          >
            <SendRoundedIcon fontSize="small" />
          </StyledIconButton>
        </ComposerRow>
      </ComposerWrap>
    </ComposerContainer>
  );
}