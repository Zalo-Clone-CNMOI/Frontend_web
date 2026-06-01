"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Popover,
  Box,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getEntityColor } from "@/src/common/constants/entityColors";
import { useShallow } from "zustand/react/shallow";
import { useEntityInfoStore, entityInfoKey, ENTITY_INFO_TTL } from "@/src/common/store/useEntityInfoStore";
import { getEntityInfo } from "@/src/common/service/ai/entityInfoApi";
import type { DetectedEntity } from "@/src/common/store/useEntityDetectionStore";
import type { EntityInfoLang } from "@/src/common/service/ai/entityInfo.types";
import { useTrans } from "@/src/common/utilities/hook/trans";

const ENTITY_TYPE_LABELS: Record<string, string> = {
  person: "Person",
  location: "Location",
  company: "Company",
  product: "Product",
  concept: "Concept",
  tool: "Tool",
  other: "Other",
};

const PopoverContent = styled(Box)({
  padding: "16px",
  maxWidth: 320,
  minWidth: 240,
});

const TypeChip = styled(Chip)<{ entitycolor: string }>(({ entitycolor }) => ({
  backgroundColor: entitycolor + "20",
  color: entitycolor,
  fontWeight: 600,
  fontSize: 11,
  height: 22,
  borderRadius: 4,
  border: `1px solid ${entitycolor}40`,
}));

const SectionLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 600,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: 0.5,
  marginBottom: 4,
});

const RelatedChip = styled(Chip)<{ entitycolor: string }>(({ entitycolor }) => ({
  backgroundColor: entitycolor + "15",
  color: entitycolor,
  fontSize: 11,
  height: 20,
  borderRadius: 10,
}));

interface EntityInfoPopoverProps {
  anchorEl: HTMLElement | null;
  entity: DetectedEntity | null;
  onClose: () => void;
  lang?: EntityInfoLang;
}

export default function EntityInfoPopover({
  anchorEl,
  entity,
  onClose,
  lang = "vi",
}: EntityInfoPopoverProps) {
  const t = useTrans();
  const open = Boolean(anchorEl) && entity !== null;
  const key = entity ? entityInfoKey(entity.type, entity.text, lang) : "";

  // Single combined selector (useShallow prevents re-render when object ref changes
  // but values are equal). Avoids 3 separate subscriptions and the no-selector
  // tearing risk in React 18 concurrent mode.
  const { cacheEntry, loading, error } = useEntityInfoStore(
    useShallow((s) => ({
      cacheEntry: s.cache[key],
      loading: !!s.loadingByKey[key],
      error: s.errorByKey[key] ?? null,
    })),
  );

  // useMemo ensures `cached` only changes when `cacheEntry` changes (store write),
  // not on every render tick where Date.now() would produce a new value.
  const cached = useMemo(() => {
    if (!cacheEntry) return null;
    return Date.now() - cacheEntry.cachedAt <= ENTITY_INFO_TTL ? cacheEntry.data : null;
  }, [cacheEntry]);

  // Tracks which entity key was already fetched in the current "open" session so
  // the effect can have full deps without risking a double-fetch on re-renders.
  const fetchedKeyRef = useRef<string | null>(null);

  const fetchInfo = (force = false) => {
    if (!entity || !key) return;
    if (!force && (cached || loading)) return;
    const store = useEntityInfoStore.getState();
    store.setLoading(key, true);
    store.setError(key, null);
    getEntityInfo(entity.text, entity.type, lang)
      .then((data) => useEntityInfoStore.getState().set(key, data))
      .catch((err: Error) => {
        const s = useEntityInfoStore.getState();
        s.setLoading(key, false);
        s.setError(key, err?.message || t("CHAT.ENTITY_INFO_ERROR"));
      });
  };

  useEffect(() => {
    if (!open) {
      fetchedKeyRef.current = null;
      return;
    }
    if (entity && key && !cached && !loading && fetchedKeyRef.current !== key) {
      fetchedKeyRef.current = key;
      fetchInfo();
    }
  }, [open, key, cached, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!entity) return null;

  const color = getEntityColor(entity.type);
  const typeLabel = ENTITY_TYPE_LABELS[entity.type] ?? entity.type;

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        elevation: 4,
        sx: { borderRadius: 2, maxHeight: 420, overflow: "auto" },
      }}
    >
      <PopoverContent>
        {/* Header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
          <TypeChip entitycolor={color} label={typeLabel} size="small" />
          <IconButton size="small" onClick={onClose} sx={{ ml: 1, p: 0.5 }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Entity text */}
        <Typography
          variant="subtitle2"
          fontWeight={700}
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            background: color + "15",
            color: "#111827",
            mb: 1.5,
            fontSize: 13,
          }}
        >
          {entity.text}
        </Typography>

        {/* Loading */}
        {loading && (
          <Box display="flex" alignItems="center" gap={1} py={1}>
            <CircularProgress size={14} />
            <Typography fontSize={12} color="text.secondary">
              {t("CHAT.ENTITY_INFO_LOADING")}
            </Typography>
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <Box display="flex" alignItems="center" gap={1} py={0.5}>
            <Typography fontSize={12} color="error.main" flex={1}>
              {error}
            </Typography>
            <IconButton size="small" onClick={() => fetchInfo(true)}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Result */}
        {!loading && !error && cached && (
          <>
            <Typography fontWeight={700} fontSize={14} mb={0.5}>
              {cached.title}
            </Typography>
            <Typography fontSize={13} color="text.secondary" mb={1} lineHeight={1.5}>
              {cached.summary}
            </Typography>

            {cached.details && (
              <>
                <Divider sx={{ my: 1 }} />
                <SectionLabel>{t("CHAT.ENTITY_INFO_DETAILS")}</SectionLabel>
                <Typography fontSize={12} color="#374151" lineHeight={1.6}>
                  {cached.details}
                </Typography>
              </>
            )}

            {cached.related_entities && cached.related_entities.length > 0 && (
              <>
                <Divider sx={{ my: 1 }} />
                <SectionLabel>{t("CHAT.ENTITY_INFO_RELATED")}</SectionLabel>
                <Box display="flex" flexWrap="wrap" gap={0.5}>
                  {cached.related_entities.map((r) => (
                    <RelatedChip entitycolor={color} key={r} label={r} size="small" />
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
