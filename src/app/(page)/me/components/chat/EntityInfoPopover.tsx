"use client";

import { useEffect, useMemo, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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

const TypeChip = styled(Chip)<{ entitycolor: string }>(({ entitycolor }) => ({
  backgroundColor: entitycolor + "20",
  color: entitycolor,
  fontWeight: 700,
  fontSize: 12,
  height: 26,
  borderRadius: 6,
  border: `1px solid ${entitycolor}40`,
}));

const SectionLabel = styled(Typography)({
  fontSize: 11,
  fontWeight: 700,
  color: "#6B7280",
  textTransform: "uppercase",
  letterSpacing: 0.8,
  marginBottom: 6,
});

const RelatedChip = styled(Chip)<{ entitycolor: string }>(({ entitycolor }) => ({
  backgroundColor: entitycolor + "15",
  color: entitycolor,
  fontSize: 12,
  height: 24,
  borderRadius: 12,
  fontWeight: 500,
}));

interface EntityInfoPopoverProps {
  open: boolean;
  entity: DetectedEntity | null;
  onClose: () => void;
  lang?: EntityInfoLang;
}

export default function EntityInfoPopover({
  open,
  entity,
  onClose,
  lang = "vi",
}: EntityInfoPopoverProps) {
  const t = useTrans();
  const key = entity ? entityInfoKey(entity.type, entity.text, lang) : "";

  const { cacheEntry, loading, error } = useEntityInfoStore(
    useShallow((s) => ({
      cacheEntry: s.cache[key],
      loading: !!s.loadingByKey[key],
      error: s.errorByKey[key] ?? null,
    })),
  );

  const cached = useMemo(() => {
    if (!cacheEntry) return null;
    return Date.now() - cacheEntry.cachedAt <= ENTITY_INFO_TTL ? cacheEntry.data : null;
  }, [cacheEntry]);

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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 6,
        sx: {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      {/* Colored header strip */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`,
          borderBottom: `1px solid ${color}20`,
          px: 3,
          pt: 2.5,
          pb: 2,
        }}
      >
        <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap={1}>
          <Box display="flex" flexDirection="column" gap={1} flex={1} minWidth={0}>
            <Box display="flex" alignItems="center" gap={1}>
              <InfoOutlinedIcon sx={{ fontSize: 16, color, flexShrink: 0 }} />
              <TypeChip entitycolor={color} label={typeLabel} size="small" />
            </Box>
            <Typography
              variant="h6"
              fontWeight={700}
              fontSize={20}
              sx={{
                color: "#111827",
                lineHeight: 1.3,
                wordBreak: "break-word",
              }}
            >
              {entity.text}
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={onClose}
            sx={{ mt: -0.5, flexShrink: 0, color: "#6B7280" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <DialogContent sx={{ px: 3, py: 2.5, minHeight: 120 }}>
        {/* Loading */}
        {loading && (
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={4} gap={2}>
            <CircularProgress size={32} sx={{ color }} />
            <Typography fontSize={14} color="text.secondary">
              {t("CHAT.ENTITY_INFO_LOADING")}
            </Typography>
          </Box>
        )}

        {/* Error */}
        {!loading && error && (
          <Box
            display="flex"
            alignItems="center"
            gap={1.5}
            py={1}
            px={2}
            sx={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: 2,
            }}
          >
            <Typography fontSize={13} color="error.main" flex={1} lineHeight={1.5}>
              {error}
            </Typography>
            <IconButton size="small" onClick={() => fetchInfo(true)} sx={{ color: "error.main" }}>
              <RefreshIcon fontSize="small" />
            </IconButton>
          </Box>
        )}

        {/* Result */}
        {!loading && !error && cached && (
          <Box display="flex" flexDirection="column" gap={2}>
            {/* Summary */}
            <Box>
              <Typography
                fontWeight={700}
                fontSize={17}
                color="#111827"
                mb={0.75}
                lineHeight={1.4}
              >
                {cached.title}
              </Typography>
              <Typography fontSize={14} color="#374151" lineHeight={1.7}>
                {cached.summary}
              </Typography>
            </Box>

            {/* Details */}
            {cached.details && (
              <>
                <Divider />
                <Box>
                  <SectionLabel>{t("CHAT.ENTITY_INFO_DETAILS")}</SectionLabel>
                  <Typography fontSize={13} color="#4B5563" lineHeight={1.75}>
                    {cached.details}
                  </Typography>
                </Box>
              </>
            )}

            {/* Related entities */}
            {cached.related_entities && cached.related_entities.length > 0 && (
              <>
                <Divider />
                <Box>
                  <SectionLabel>{t("CHAT.ENTITY_INFO_RELATED")}</SectionLabel>
                  <Box display="flex" flexWrap="wrap" gap={0.75}>
                    {cached.related_entities.map((r) => (
                      <RelatedChip entitycolor={color} key={r} label={r} size="small" />
                    ))}
                  </Box>
                </Box>
              </>
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
