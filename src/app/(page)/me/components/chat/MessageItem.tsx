"use client";

import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { UiMessage } from "@/src/common/interface/chat-interface";
import MessageActions from "./MessageActions";
import MessageMediaGroup from "./MessageMediaGroup";
import MessageReplyPreview from "./MessageReplyPreview";
import TranslationDisplay from "./TranslationDisplay";
import EntityHighlightText from "./EntityHighlightText";
import EntityInfoPopover from "./EntityInfoPopover";
import { useEntityDetectionStore } from "@/src/common/store/useEntityDetectionStore";
import type { DetectedEntity } from "@/src/common/store/useEntityDetectionStore";

// Stable empty reference so the Zustand selector never creates a new array
// for messages without entities (avoids re-render on every store update).
const EMPTY_ENTITIES: DetectedEntity[] = [];
import { formatMessageTime, getMessageTextContent, shouldShowMessageBubble, splitMessageAttachments } from "@/src/common/helpers/message.helpers";
import { useChatStore } from "@/src/common/store/useChatStore";
import { useMessagePin } from "@/src/common/hooks/useMessagePin";
import AppAvatar, { buildS3Url } from "@/src/shared/component/Avatar";
import PushPinIcon from "@mui/icons-material/PushPin";
import { MediaPreviewItem } from "@/src/shared/component/MediaPreviewModal";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { canMemberDo, normalizeGroupSettings } from "@/src/common/interface/group-settings-interface";
import PollMessageCard from "@/src/shared/component/PollMessageCard";
import InviteMessageBubble from "../invite/InviteMessageBubble";

interface MessageItemProps {
  message: UiMessage;
  currentUserId: string;
  onReplyMessage: (message: UiMessage) => void;
  onDeleteMessage: (
    conversationId: UiMessage["conversationId"],
    messageId: UiMessage["messageId"],
    createdAt: UiMessage["createdAt"]
  ) => void;
  onScrollToMessage: (targetMessageId?: UiMessage["messageId"] | null) => void;
  onMediaLoad?: (messageId: UiMessage["messageId"]) => void;
  onForwardMessage: (message: UiMessage) => void;
  onOpenMedia?: (media: MediaPreviewItem, allMedia?: MediaPreviewItem[], initialIndex?: number) => void;
  isHighlighted?: boolean;
}

const MessageRow = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine" && prop !== "isHighlighted",
})<{ mine?: boolean; isHighlighted?: boolean }>(({ mine, isHighlighted }) => ({
  display: "flex",
  justifyContent: mine ? "flex-end" : "flex-start",
  alignItems: "center",
  gap: 8,
  position: "relative",
  transition: "background-color 0.3s ease",
  borderRadius: 8,
  padding: "4px 8px",
  ...(isHighlighted && {
    backgroundColor: "rgba(0, 168, 132, 0.2)",
    animation: "highlight-pulse 1.5s ease-in-out",
  }),
  "&:hover .message-actions": {
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  },
  "@keyframes highlight-pulse": {
    "0%": {
      backgroundColor: "rgba(0, 168, 132, 0.4)",
    },
    "100%": {
      backgroundColor: "rgba(0, 168, 132, 0.2)",
    },
  },
}));

const MessageContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: mine ? "flex-end" : "flex-start",
  gap: 6,
  maxWidth: "72%",
}));

const Bubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "mine",
})<{ mine?: boolean }>(({ mine }) => ({
  maxWidth: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: mine ? "1px solid #D7E8FF" : "1px solid #E5E7EB",
  background: mine ? "#E5F1FF" : "#FFFFFF",
  boxShadow: "0 1px 2px rgba(16, 24, 40, 0.04)",
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

const MessageText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isDeleted",
})<{ isDeleted?: boolean }>(({ isDeleted }) => ({
  fontSize: isDeleted ? 13 : 14,
  color: isDeleted ? "#6B7280" : "#111827",
  fontStyle: isDeleted ? "italic" : "normal",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  lineHeight: 1.5,
  opacity: isDeleted ? 0.8 : 1,
}));

const MetaRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});
const LeftMessageWrap = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  gap: 8,
  maxWidth: "100%",
});
const MetaLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
});

const MetaText = styled(Typography)({
  fontSize: 11,
  color: "#6B7280",
  lineHeight: 1.2,
});

const AttachmentList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

const AttachmentItem = styled(Typography)({
  fontSize: 12,
  color: "#005AE0",
  wordBreak: "break-word",
});

export default function MessageItem({
  message,
  currentUserId,
  onReplyMessage,
  onDeleteMessage,
  onScrollToMessage,
  onMediaLoad,
  onForwardMessage,
  onOpenMedia,
  isHighlighted = false,
}: MessageItemProps) {
  const t = useTrans();
  const [translationOpen, setTranslationOpen] = useState(false);
  // B2: entity detection state — only the entity needed (modal is centered, no anchorEl)
  const [selectedEntity, setSelectedEntity] = useState<DetectedEntity | null>(null);
  // W2 fix: stable selector — no new array on each render for entity-free messages.
  const entityArr = useEntityDetectionStore(
    (s) => s.entitiesByMessage[message.messageId],
  );
  const entities = entityArr ?? EMPTY_ENTITIES;
  const isEntityPending = useEntityDetectionStore(
    (s) => !!s.pendingByMessage[message.messageId],
  );
  const mine = message.senderId === currentUserId;
  const senderId = message.senderId;
  const isRemoved = !!message.removed;
  // A removed message is rendered as a tombstone, hiding the same content a
  // recalled/deleted message hides. Removal takes precedence over isDeleted.
  const isHidden = message.isDeleted || isRemoved;
  const canDelete = mine && !isHidden;
  const canReply = !isHidden;
  const canForward = !isHidden;

  // Get conversation detail to check role for pin permission
  const conversationDetail = useChatStore((s) =>
    message.conversationId
      ? s.conversationDetailById[message.conversationId]
      : null
  );
  const isGroup = conversationDetail?.type === 'group';
  const myRole = (conversationDetail?.mySettings?.role ?? 'member') as 'owner' | 'admin' | 'member';
  const settingsLoaded = conversationDetail?.settings != null;
  const rawSettings = settingsLoaded ? conversationDetail.settings : null;
  const settings = normalizeGroupSettings(rawSettings);
  const canPin = !isHidden && !!conversationDetail && (!isGroup || (settingsLoaded ? canMemberDo('pin_message', myRole, settings) : false));

  const { togglePin } = useMessagePin();
  const isPinned = useChatStore((s) => s.isMessagePinned(message.conversationId, message.messageId));

  const { imageAttachments, videoAttachments, otherAttachments } =
    splitMessageAttachments(message.attachments);

  const textContent = getMessageTextContent(message.body);
  const hasText = !isHidden && !!textContent;
  const isPoll = !isHidden && (message.type === "poll" || message.message_type === "poll");
  const isInvite = !isHidden && (message.type === "invite" || message.message_type === "invite");
  // B1: translate is available for text messages that are not deleted/removed/poll/invite
  const canTranslate = hasText && !isHidden && !isPoll && !isInvite;
  const inviteMetadata = isInvite && message.metadata
    ? (message.metadata as unknown as import("@/src/common/interface/invite-interface").InviteMessageMetadata)
    : null;

  const showBubble = shouldShowMessageBubble({
    isDeleted: isHidden,
    hasText,
    otherAttachmentCount: otherAttachments.length,
    hasReply: !!message.replyTo,
  });

  const hasOnlyMedia =
    !isHidden &&
    (imageAttachments.length > 0 || videoAttachments.length > 0) &&
    !hasText &&
    otherAttachments.length === 0;

  const timeText = formatMessageTime(message.createdAt);

  const member =
    conversationDetail?.members?.find((m) => m.userId === message.senderId) ?? null;
  const messagesInConversation = useChatStore((s) =>
    message.conversationId
      ? s.messagesByConversation[message.conversationId] ?? []
      : []
  );

  const repliedMessage = message.replyTo?.messageId
    ? messagesInConversation.find((m) => m.messageId === message.replyTo?.messageId)
    : null;

  const repliedHidden = repliedMessage
    ? repliedMessage.isDeleted || repliedMessage.removed
    : false;
  const displayReplyTo =
    message.replyTo && repliedMessage
      ? {
        ...message.replyTo,
        body: repliedHidden ? "" : repliedMessage.body,
        attachments: repliedHidden ? [] : repliedMessage.attachments ?? [],
        isDeleted: Boolean(repliedMessage.isDeleted),
        removed: Boolean(repliedMessage.removed),
      }
      : message.replyTo;

  const avatarSrc = buildS3Url(member?.avatarUrl) ?? undefined;

  return (
    <MessageRow
      id={`message-${message.messageId}`}
      data-testid="message-row"
      data-message-id={String(message.messageId)}
      mine={mine}
      isHighlighted={isHighlighted}
    >
      {!mine ? (
        <LeftMessageWrap>
          <AppAvatar
            name={member?.fullName ?? ""}
            src={avatarSrc}
            alt={member?.nickname || member?.fullName || "User"}
          />

          <MessageContent mine={mine}>
            {!isHidden && (
              <>
                <MessageMediaGroup
                  attachments={imageAttachments}
                  type="image"
                  mine={mine}
                  messageId={message.messageId}
                  onMediaLoad={onMediaLoad}
                  onOpenMedia={onOpenMedia}
                />

                <MessageMediaGroup
                  attachments={videoAttachments}
                  type="video"
                  mine={mine}
                  messageId={message.messageId}
                  onMediaLoad={onMediaLoad}
                  onOpenMedia={onOpenMedia}
                />
              </>
            )}

            {showBubble && (
              <Bubble mine={mine}>
                {!isHidden && (
                  <MessageReplyPreview
                    senderId={senderId}
                    replyTo={displayReplyTo}
                    onClick={() => onScrollToMessage(displayReplyTo?.messageId)}
                    mine={mine}
                  />
                )}

                {isRemoved ? (
                  <MessageText isDeleted>{t("CHAT.MESSAGE_REMOVED_BY_AI")}</MessageText>
                ) : message.isDeleted ? (
                  <MessageText isDeleted>{t("CHAT.MESSAGE_DELETED")}</MessageText>
                ) : isPoll && message.poll ? (
                  <PollMessageCard
                    messageId={message.messageId}
                    conversationId={message.conversationId}
                    pollFromMessage={message.poll}
                  />
                ) : isInvite && inviteMetadata ? (
                  <InviteMessageBubble
                    metadata={inviteMetadata}
                    conversationId={message.conversationId}
                  />
                ) : hasText ? (
                  <MessageText>
                    {entities.length > 0 ? (
                      // W1 fix: pass raw body (not textContent) so start/end
                      // indices from the BE align with the same string it measured.
                      <EntityHighlightText
                        body={message.body ?? ""}
                        entities={entities}
                        mine={mine}
                        onEntityClick={(entity) =>
                          setSelectedEntity(entity)
                        }
                      />
                    ) : (
                      textContent
                    )}
                  </MessageText>
                ) : null}

                {/* B2: "analyzing…" hint while entity detection is in-flight */}
                {isEntityPending && !entities.length && hasText && (
                  <MessageText
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      opacity: 0.55,
                      marginTop: 2,
                    }}
                  >
                    {t("CHAT.ENTITY_ANALYZING")}
                  </MessageText>
                )}

                {!isHidden && otherAttachments.length > 0 && (
                  <AttachmentList>
                    {otherAttachments.map((file) => (
                      <AttachmentItem
                        key={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${file.key}`}
                      >
                        {file.name}
                      </AttachmentItem>
                    ))}
                  </AttachmentList>
                )}

                <MetaRow>
                  <MetaLeft>
                    <MetaText>{timeText}</MetaText>
                    {message.failed && <MetaText>{t("CHAT.MESSAGE_SEND_FAILED")}</MetaText>}
                    {message.editedAt && <MetaText>{t("CHAT.MESSAGE_EDITED")}</MetaText>}
                  </MetaLeft>
                </MetaRow>

                {/* B1: inline translation panel */}
                {translationOpen && (
                  <TranslationDisplay
                    messageId={message.messageId}
                    conversationId={message.conversationId}
                    body={message.body ?? ""}
                    onClose={() => setTranslationOpen(false)}
                  />
                )}
              </Bubble>
            )}

            {hasOnlyMedia && <MetaText>{timeText}</MetaText>}
          </MessageContent>

          <MessageActions
            mine={mine}
            canReply={canReply}
            canDelete={canDelete}
            canForward={canForward}
            canPin={canPin}
            canTranslate={canTranslate}
            onReply={() => onReplyMessage(message)}
            onForward={() => onForwardMessage(message)}
            onDelete={() =>
              onDeleteMessage(
                message.conversationId,
                message.messageId,
                message.createdAt
              )
            }
            isPinned={isPinned}
            onTogglePin={() => togglePin(message.conversationId, message.createdAt, message.messageId)}
            onTranslate={() => setTranslationOpen((v) => !v)}
          />
        </LeftMessageWrap>
      ) : (
        <>
          <MessageContent mine={mine}>
            {!isHidden && (
              <>
                <MessageMediaGroup
                  attachments={imageAttachments}
                  type="image"
                  mine={mine}
                  messageId={message.messageId}
                  onMediaLoad={onMediaLoad}
                  onOpenMedia={onOpenMedia}
                />

                <MessageMediaGroup
                  attachments={videoAttachments}
                  type="video"
                  mine={mine}
                  messageId={message.messageId}
                  onMediaLoad={onMediaLoad}
                  onOpenMedia={onOpenMedia}
                />
              </>
            )}

            {showBubble && (
              <Bubble mine={mine}>
                {!isHidden && (
                  <MessageReplyPreview
                    senderId={senderId}
                    replyTo={displayReplyTo}
                    onClick={() => onScrollToMessage(message.replyTo?.messageId)}
                    mine={mine}
                  />
                )}

                {isRemoved ? (
                  <MessageText isDeleted>{t("CHAT.MESSAGE_REMOVED_BY_AI")}</MessageText>
                ) : message.isDeleted ? (
                  <MessageText isDeleted>{t("CHAT.MESSAGE_DELETED")}</MessageText>
                ) : isPoll && message.poll ? (
                  <PollMessageCard
                    messageId={message.messageId}
                    conversationId={message.conversationId}
                    pollFromMessage={message.poll}
                  />
                ) : isInvite && inviteMetadata ? (
                  <InviteMessageBubble
                    metadata={inviteMetadata}
                    conversationId={message.conversationId}
                  />
                ) : hasText ? (
                  <MessageText>
                    {entities.length > 0 ? (
                      // W1 fix: pass raw body (not textContent) so start/end
                      // indices from the BE align with the same string it measured.
                      <EntityHighlightText
                        body={message.body ?? ""}
                        entities={entities}
                        mine={mine}
                        onEntityClick={(entity) =>
                          setSelectedEntity(entity)
                        }
                      />
                    ) : (
                      textContent
                    )}
                  </MessageText>
                ) : null}

                {/* B2: "analyzing…" hint while entity detection is in-flight */}
                {isEntityPending && !entities.length && hasText && (
                  <MessageText
                    style={{
                      fontSize: 11,
                      fontStyle: "italic",
                      opacity: 0.55,
                      marginTop: 2,
                    }}
                  >
                    {t("CHAT.ENTITY_ANALYZING")}
                  </MessageText>
                )}

                {!isHidden && otherAttachments.length > 0 && (
                  <AttachmentList>
                    {otherAttachments.map((file) => (
                      <AttachmentItem
                        key={`${process.env.NEXT_PUBLIC_S3_BASE_URL}/${file.key}`}
                      >
                        {file.name}
                      </AttachmentItem>
                    ))}
                  </AttachmentList>
                )}

                <MetaRow>
                  <MetaLeft>
                    <MetaText>{timeText}</MetaText>
                    {message.failed && <MetaText>{t("CHAT.MESSAGE_SEND_FAILED")}</MetaText>}
                    {message.editedAt && <MetaText>{t("CHAT.MESSAGE_EDITED")}</MetaText>}
                  </MetaLeft>
                </MetaRow>

                {/* B1: inline translation panel */}
                {translationOpen && (
                  <TranslationDisplay
                    messageId={message.messageId}
                    conversationId={message.conversationId}
                    body={message.body ?? ""}
                    onClose={() => setTranslationOpen(false)}
                  />
                )}
              </Bubble>
            )}

            {hasOnlyMedia && <MetaText>{timeText}</MetaText>}
          </MessageContent>

          <MessageActions
            mine={mine}
            canReply={canReply}
            canDelete={canDelete}
            canForward={canForward}
            canPin={canPin}
            canTranslate={canTranslate}
            onReply={() => onReplyMessage(message)}
            onForward={() => onForwardMessage(message)}
            onDelete={() =>
              onDeleteMessage(
                message.conversationId,
                message.messageId,
                message.createdAt
              )
            }
            isPinned={isPinned}
            onTogglePin={() => togglePin(message.conversationId, message.createdAt, message.messageId)}
            onTranslate={() => setTranslationOpen((v) => !v)}
          />
        </>
      )}

      {/* B2: entity info modal (shared across both bubble branches) */}
      <EntityInfoPopover
        open={selectedEntity !== null}
        entity={selectedEntity}
        onClose={() => setSelectedEntity(null)}
      />
    </MessageRow>
  );
}