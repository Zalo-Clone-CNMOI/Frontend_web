"use client";

import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

import { useTrans } from "@/src/common/utilities/hook/trans";
import { useAISmartReplyStore } from "@/src/common/store/useAISmartReplyStore";
import { useChatStore } from "@/src/common/store/useChatStore";
import { smartReplyService } from "@/src/common/service/ai/smartReplyService";

/**
 * A2 — Smart Reply chips. Web-only UI (not ported from mobile): a thin inline
 * strip mounted directly ABOVE the composer input. It reads the A2 store for the
 * active conversation and renders:
 *   - loading  → a spinner + label
 *   - error    → an error label + Retry affordance
 *   - results  → up to 3 suggestion chips
 *   - empty    → nothing
 *
 * Clicking a chip PREFILLS the composer (via `onPick`) so the user can edit
 * before sending — it never auto-sends — and clears this conversation's
 * suggestions so the strip collapses.
 */

const MAX_SUGGESTIONS = 3;

const Strip = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  padding: "6px 12px",
  borderTop: "1px solid #EEF1F4",
  background: "#FAFBFC",
});

const LeadIconWrap = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "#2563EB",
  flexShrink: 0,
});

const SuggestionChip = styled(Chip)({
  maxWidth: "100%",
  height: 30,
  borderRadius: 16,
  background: "#fff",
  border: "1px solid #DBE3EC",
  color: "#1F2937",
  fontSize: 13,
  "& .MuiChip-label": {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "&:hover": {
    background: "#EFF4FF",
    borderColor: "#2563EB",
  },
});

const HintText = styled(Typography)({
  fontSize: 13,
  color: "#94A3B8",
});

interface SmartReplyChipsProps {
  conversationId: string | null;
  /** Prefill the composer with the chosen suggestion (does NOT send). */
  onPick: (text: string) => void;
}

export default function SmartReplyChips({
  conversationId,
  onPick,
}: SmartReplyChipsProps) {
  const t = useTrans();

  // Reactive selectors: re-render whenever this conversation's slice changes.
  const suggestions = useAISmartReplyStore((s) =>
    conversationId ? s.suggestionsByConversation[conversationId] : undefined
  );
  const loading = useAISmartReplyStore((s) =>
    conversationId ? s.loadingByConversation[conversationId] : false
  );
  const error = useAISmartReplyStore((s) =>
    conversationId ? s.errorByConversation[conversationId] : null
  );

  const currentUserId = useChatStore((s) => s.currentUserId);
  const clearSuggestions = useAISmartReplyStore((s) => s.clearSuggestions);

  if (!conversationId) return null;

  const handlePick = (text: string) => {
    if (!text) return;
    onPick(text);
    clearSuggestions(conversationId);
  };

  const handleRetry = () => {
    if (!currentUserId) return;
    void smartReplyService
      .requestSmartReply({ conversationId, userId: currentUserId })
      .catch(() => {
        // best-effort; the service surfaces its own error/timeout into the store
      });
  };

  // Loading takes precedence so a fresh request visibly supersedes stale state.
  if (loading) {
    return (
      <Strip role="status" aria-live="polite">
        <LeadIconWrap>
          <CircularProgress size={14} thickness={5} color="inherit" />
        </LeadIconWrap>
        <HintText>{t("CHAT.SMART_REPLY_LOADING")}</HintText>
      </Strip>
    );
  }

  if (error) {
    return (
      <Strip role="alert">
        <HintText sx={{ color: "#DC2626" }}>
          {t("CHAT.SMART_REPLY_ERROR")}
        </HintText>
        <SuggestionChip
          icon={<RefreshRoundedIcon style={{ fontSize: 16 }} />}
          label={t("CHAT.SMART_REPLY_RETRY")}
          onClick={handleRetry}
          aria-label={t("CHAT.SMART_REPLY_RETRY")}
          clickable
        />
      </Strip>
    );
  }

  const visible = (suggestions ?? []).filter(Boolean).slice(0, MAX_SUGGESTIONS);
  if (visible.length === 0) return null;

  return (
    <Strip aria-label={t("CHAT.SMART_REPLY_LABEL")}>
      <LeadIconWrap aria-hidden>
        <AutoAwesomeRoundedIcon style={{ fontSize: 16 }} />
      </LeadIconWrap>
      {visible.map((text, idx) => (
        <SuggestionChip
          key={`${idx}-${text}`}
          label={text}
          title={text}
          onClick={() => handlePick(text)}
          aria-label={text}
          clickable
        />
      ))}
    </Strip>
  );
}
