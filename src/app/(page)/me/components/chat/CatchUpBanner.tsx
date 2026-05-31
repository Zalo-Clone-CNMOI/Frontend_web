"use client";

import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useTrans } from "@/src/common/utilities/hook/trans";
import { useAISummaryStore } from "@/src/common/store/useAISummaryStore";
import { aiConversationApi } from "@/src/common/service/ai/aiConversationApi";

/**
 * A3 — Catch-up banner. Web-only UI (inline & contextual design).
 *
 * Renders a compact "✨ Catch Up" chip above the message list. On click it
 * calls the HTTP catch-up endpoint (30s timeout) and opens a dialog with the
 * summary. A cached result (1h TTL) opens the dialog immediately without
 * re-fetching. Any inbound non-self message invalidates the cache so the next
 * catch-up is always fresh.
 *
 * The socket-based `ai:summary:result` also populates the same store; if such
 * a result arrives the button will show "View Summary" via the cached check.
 */

const BannerWrap = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "6px 12px 2px",
});

const CatchUpButton = styled(Button)({
  borderRadius: 20,
  fontSize: 13,
  fontWeight: 500,
  padding: "4px 14px",
  textTransform: "none",
  gap: 6,
  color: "#2563EB",
  background: "#EFF4FF",
  border: "1px solid #BFDBFE",
  "&:hover": {
    background: "#DBEAFE",
    borderColor: "#93C5FD",
  },
  "&:disabled": {
    color: "#93C5FD",
    background: "#F0F7FF",
    borderColor: "#DBEAFE",
  },
});

const SummaryText = styled(Typography)({
  fontSize: 14,
  lineHeight: 1.6,
  color: "#1F2937",
  whiteSpace: "pre-wrap",
});

const MetaChip = styled(Box)({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 10,
  background: "#F1F5F9",
  fontSize: 12,
  color: "#64748B",
  fontWeight: 500,
});

interface CatchUpBannerProps {
  conversationId: string;
}

export default function CatchUpBanner({ conversationId }: CatchUpBannerProps) {
  const t = useTrans();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const loading = useAISummaryStore((s) => s.loadingByConversation[conversationId] ?? false);
  const error = useAISummaryStore((s) => s.errorByConversation[conversationId] ?? null);

  const handleCatchUp = async () => {
    const store = useAISummaryStore.getState();

    // If a fresh cached result exists, open the dialog immediately.
    const cached = store.getSummary(conversationId);
    if (cached) {
      setDialogOpen(true);
      return;
    }

    try {
      store.setLoading(conversationId, true);
      store.setError(conversationId, null);

      const result = await aiConversationApi.catchUp(conversationId);

      store.setSummary(conversationId, result.summary, result.messageCount, {
        hadUnread: result.hadUnread,
        truncated: result.truncated,
        cached: result.cached,
      });
      setDialogOpen(true);
    } catch {
      store.setError(conversationId, "failed");
    } finally {
      store.setLoading(conversationId, false);
    }
  };

  const handleRetry = () => {
    useAISummaryStore.getState().setError(conversationId, null);
    void handleCatchUp();
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available (e.g. insecure context) — silently ignore
    }
  };

  // Read inside render so the dialog shows fresh data after fetch.
  const summaryEntry = useAISummaryStore((s) => {
    const entry = s.summaries[conversationId];
    if (!entry) return null;
    if (Date.now() - entry.cachedAt > 60 * 60 * 1000) return null;
    return entry;
  });

  const buttonLabel = loading
    ? t("CHAT.CATCH_UP_LOADING")
    : error
      ? t("CHAT.CATCH_UP_ERROR")
      : t("CHAT.CATCH_UP_BUTTON");

  return (
    <>
      <BannerWrap>
        {error ? (
          <CatchUpButton
            size="small"
            startIcon={<RefreshRoundedIcon style={{ fontSize: 15 }} />}
            onClick={handleRetry}
            disabled={loading}
          >
            {t("CHAT.CATCH_UP_RETRY")}
          </CatchUpButton>
        ) : (
          <CatchUpButton
            size="small"
            startIcon={
              loading ? (
                <CircularProgress size={13} thickness={5} color="inherit" />
              ) : (
                <AutoAwesomeRoundedIcon style={{ fontSize: 15 }} />
              )
            }
            onClick={() => void handleCatchUp()}
            disabled={loading}
            aria-label={buttonLabel}
          >
            {buttonLabel}
          </CatchUpButton>
        )}
      </BannerWrap>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            pb: 1,
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          <AutoAwesomeRoundedIcon sx={{ color: "#2563EB", fontSize: 20 }} />
          {t("CHAT.CATCH_UP_DIALOG_TITLE")}
          <IconButton
            onClick={() => setDialogOpen(false)}
            size="small"
            sx={{ ml: "auto", color: "#6B7280" }}
            aria-label={t("CHAT.CATCH_UP_CLOSE")}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 2 }}>
          {summaryEntry ? (
            <>
              {!summaryEntry.hadUnread && !summaryEntry.summary ? (
                <Typography fontSize={14} color="#6B7280" sx={{ mb: 1 }}>
                  {t("CHAT.CATCH_UP_NO_UNREAD")}
                </Typography>
              ) : (
                <SummaryText>{summaryEntry.summary}</SummaryText>
              )}

              {/* Metadata row */}
              <Box display="flex" flexWrap="wrap" gap={1} mt={2}>
                {summaryEntry.messageCount > 0 && (
                  <MetaChip>
                    {t("CHAT.CATCH_UP_MESSAGE_COUNT").replace(
                      "{count}",
                      String(summaryEntry.messageCount)
                    )}
                  </MetaChip>
                )}
                {summaryEntry.truncated && (
                  <MetaChip sx={{ color: "#D97706", background: "#FEF3C7" }}>
                    {t("CHAT.CATCH_UP_TRUNCATED")}
                  </MetaChip>
                )}
                {summaryEntry.cached && (
                  <MetaChip>{t("CHAT.CATCH_UP_CACHED")}</MetaChip>
                )}
              </Box>
            </>
          ) : (
            // Rare: dialog opened but entry expired/missing (edge case)
            <Typography fontSize={14} color="#6B7280">
              {t("CHAT.CATCH_UP_NO_UNREAD")}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 2, py: 1.5 }}>
          {summaryEntry?.summary && (
            <Tooltip title={copied ? t("CHAT.CATCH_UP_COPIED") : t("CHAT.CATCH_UP_COPY")}>
              <IconButton
                size="small"
                onClick={() => void handleCopy(summaryEntry.summary)}
                aria-label={t("CHAT.CATCH_UP_COPY")}
                sx={{ color: "#64748B" }}
              >
                {copied ? (
                  <CheckRoundedIcon fontSize="small" sx={{ color: "#16A34A" }} />
                ) : (
                  <ContentCopyRoundedIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
          <Button
            size="small"
            variant="contained"
            onClick={() => setDialogOpen(false)}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontSize: 13,
              background: "#2563EB",
              "&:hover": { background: "#1D4ED8" },
            }}
          >
            {t("CHAT.CATCH_UP_CLOSE")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
