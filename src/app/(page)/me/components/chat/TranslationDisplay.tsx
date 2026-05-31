"use client";

import { useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";

import { useTrans } from "@/src/common/utilities/hook/trans";
import { useAITranslationStore, translationCacheKey } from "@/src/common/store/useAITranslationStore";
import { translationService } from "@/src/common/service/ai/translationService";

/**
 * B1 — Translation display. Web-only inline UI below the message body inside
 * the Bubble. Renders a language picker (EN, VI, ZH, JA, KO, FR) and the
 * translation result with an original/translated toggle.
 *
 * Flow: user opens this panel via the Translate action button in MessageActions
 * → picks a language → translationService.requestTranslation() is called →
 * ai:translate:result handler (ai.action.ts) populates the store → this
 * component re-renders with the result.
 *
 * Dedup is handled in translationService: the same messageId+lang won't
 * re-emit if already loading or cached (24h TTL).
 */

const TRANSLATION_CACHE_TTL = 24 * 60 * 60 * 1000; // keep in sync with store

const LANGUAGES = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "fr", label: "Français" },
] as const;

const TranslationWrap = styled(Box)({
  marginTop: 2,
});

const LangRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 4,
  marginTop: 6,
});

const LangChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected?: boolean }>(({ selected }) => ({
  height: 24,
  fontSize: 12,
  cursor: "pointer",
  background: selected ? "#2563EB" : "#F1F5F9",
  color: selected ? "#fff" : "#374151",
  border: selected ? "1px solid #2563EB" : "1px solid #E2E8F0",
  "&:hover": {
    background: selected ? "#1D4ED8" : "#E2E8F0",
  },
  "& .MuiChip-label": { padding: "0 8px" },
}));

const ResultText = styled(Typography)({
  fontSize: 14,
  color: "#111827",
  lineHeight: 1.5,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  marginTop: 6,
});

const SubText = styled(Typography)({
  fontSize: 12,
  color: "#6B7280",
  lineHeight: 1.4,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  marginTop: 4,
});

const HeaderRow = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginTop: 4,
});

const LangLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 500,
  color: "#9CA3AF",
  letterSpacing: 0.3,
  textTransform: "uppercase",
});

interface TranslationDisplayProps {
  messageId: string;
  conversationId: string;
  body: string;
  onClose: () => void;
}

export default function TranslationDisplay({
  messageId,
  conversationId,
  body,
  onClose,
}: TranslationDisplayProps) {
  const t = useTrans();
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);

  const loading = useAITranslationStore((s) =>
    selectedLang ? s.loadingByKey[translationCacheKey(messageId, selectedLang)] ?? false : false
  );
  const error = useAITranslationStore((s) =>
    selectedLang ? s.errorByKey[translationCacheKey(messageId, selectedLang)] ?? null : null
  );
  const cachedEntry = useAITranslationStore((s) => {
    if (!selectedLang) return null;
    const key = translationCacheKey(messageId, selectedLang);
    const entry = s.cache[key];
    if (!entry) return null;
    if (Date.now() - entry.cachedAt > TRANSLATION_CACHE_TTL) return null;
    return entry;
  });

  const handleSelectLang = (langCode: string) => {
    if (langCode === selectedLang) return;
    setSelectedLang(langCode);
    setShowOriginal(false);
    void translationService
      .requestTranslation({ conversationId, messageId, body, targetLanguage: langCode })
      .catch(() => {});
  };

  const handleRetry = () => {
    if (!selectedLang) return;
    useAITranslationStore.getState().setError(messageId, selectedLang, null);
    // Clear cache so dedup guard doesn't block retry
    const key = translationCacheKey(messageId, selectedLang);
    useAITranslationStore.setState((s) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [key]: _removed, ...rest } = s.cache;
      return { cache: rest };
    });
    void translationService
      .requestTranslation({ conversationId, messageId, body, targetLanguage: selectedLang })
      .catch(() => {});
  };

  return (
    <TranslationWrap>
      <Divider sx={{ my: 0.5, borderColor: "#EEF1F4" }} />

      {/* Header: language picker + close */}
      <HeaderRow>
        <LangLabel>{t("CHAT.TRANSLATION_LABEL")}</LangLabel>
        <Tooltip title={t("CHAT.TRANSLATION_CLOSE")}>
          <IconButton size="small" onClick={onClose} sx={{ p: 0.25, color: "#9CA3AF" }}>
            <CloseRoundedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      </HeaderRow>

      {/* Language chips */}
      <LangRow>
        {LANGUAGES.map((lang) => (
          <LangChip
            key={lang.code}
            label={lang.label}
            size="small"
            selected={lang.code === selectedLang}
            onClick={() => handleSelectLang(lang.code)}
            aria-pressed={lang.code === selectedLang}
          />
        ))}
      </LangRow>

      {/* State: loading */}
      {loading && (
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <CircularProgress size={13} thickness={5} sx={{ color: "#2563EB" }} />
          <SubText>{t("CHAT.TRANSLATION_LOADING")}</SubText>
        </Box>
      )}

      {/* State: error */}
      {!loading && error && (
        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <SubText sx={{ color: "#DC2626" }}>{t("CHAT.TRANSLATION_ERROR")}</SubText>
          <Tooltip title={t("CHAT.TRANSLATION_RETRY")}>
            <IconButton size="small" onClick={handleRetry} sx={{ p: 0.25, color: "#DC2626" }}>
              <RefreshRoundedIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* State: result */}
      {!loading && !error && cachedEntry && (
        <Box mt={0.5}>
          <ResultText>
            {showOriginal ? cachedEntry.original : cachedEntry.translated}
          </ResultText>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            mt={0.5}
            sx={{ cursor: "pointer", color: "#2563EB" }}
            onClick={() => setShowOriginal((v) => !v)}
          >
            <SwapHorizRoundedIcon sx={{ fontSize: 14 }} />
            <Typography fontSize={12} color="#2563EB" sx={{ userSelect: "none" }}>
              {showOriginal
                ? t("CHAT.TRANSLATION_SHOW_TRANSLATED")
                : t("CHAT.TRANSLATION_SHOW_ORIGINAL")}
            </Typography>
          </Box>
        </Box>
      )}
    </TranslationWrap>
  );
}
