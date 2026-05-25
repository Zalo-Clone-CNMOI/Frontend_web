"use client";

import { useState, useCallback, useRef } from "react";
import { Box, Switch, Typography, Alert, Snackbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import SectionBlock from "./SectionBlock";
import { useTrans } from "@/src/common/utilities/hook/trans";
import { useChatStore } from "@/src/common/store/useChatStore";
import { groupService } from "@/src/common/service/group-service";
import {
  normalizeGroupSettings,
  canMemberDo,
  type GroupSettings,
  type GroupPermissionKey,
  type GroupPolicyKey,
  type GroupFeatureKey,
  type MemberRole,
  type UpdateGroupSettingsDto,
} from "@/src/common/interface/group-settings-interface";

interface GroupSettingsSectionProps {
  conversationId: string;
  myRole: MemberRole;
}

const SettingRow = styled(Box)({
  minHeight: 62,
  padding: "0 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
});

const SettingLeft = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 0,
  flex: 1,
});

const SettingContent = styled(Box)({
  minWidth: 0,
});

const SettingTitle = styled(Typography)({
  fontSize: 15,
  color: "#0F172A",
});

const SettingDescription = styled(Typography)({
  fontSize: 13,
  color: "#64748B",
  marginTop: 2,
});

const ReadOnlyNote = styled(Box)({
  padding: "12px 20px",
  background: "#EFF6FF",
});

const ReadOnlyText = styled(Typography)({
  fontSize: 13,
  color: "#1D4ED8",
  textAlign: "center",
});

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  disabled: boolean;
}

function ToggleRow({ label, description, value, onChange, disabled }: ToggleRowProps) {
  return (
    <SettingRow>
      <SettingLeft>
        <SettingContent>
          <SettingTitle>{label}</SettingTitle>
          {description && <SettingDescription>{description}</SettingDescription>}
        </SettingContent>
      </SettingLeft>
      <Switch
        checked={value}
        onChange={(_, checked) => onChange(checked)}
        disabled={disabled}
        size="medium"
      />
    </SettingRow>
  );
}

export default function GroupSettingsSection({
  conversationId,
  myRole,
}: GroupSettingsSectionProps) {
  const t = useTrans();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const conversationDetail = useChatStore(
    (state) => state.conversationDetailById?.[conversationId]
  );
  const updateConversationSettings = useChatStore(
    (state) => state.updateConversationSettings
  );
  const fetchConversationDetail = useChatStore(
    (state) => state.fetchConversationDetail
  );

  const rawSettings = conversationDetail?.settings ?? null;
  const currentSettings = normalizeGroupSettings(rawSettings);
  const isPrivileged = myRole === 'owner' || myRole === 'admin';
  const settingsLoaded = rawSettings != null;

  const settingsRef = useRef(currentSettings);
  settingsRef.current = currentSettings;

  const handleToggle = useCallback(
    async (
      category: 'permissions' | 'policies' | 'features',
      key: string,
      value: boolean,
    ) => {
      if (!isPrivileged) return;
      if (!settingsLoaded) return;

      const previousSettings = settingsRef.current;

      const newSettings: GroupSettings = {
        ...previousSettings,
        [category]: {
          ...previousSettings[category],
          [key]: value,
        },
      };

      updateConversationSettings(conversationId, newSettings);

      try {
        // Send only the toggled category with all its fields so server doesn't reset other categories
        const payload: UpdateGroupSettingsDto = {
          [category]: {
            ...currentSettings[category],
            [key]: value,
          },
        };
        const res = await groupService.updateGroupSettings(conversationId, payload);

        if (res.ok) {
          const updated = res.payload?.data as any;
          const serverSettings = updated?.settings ?? updated?.data?.settings;
          if (serverSettings) {
            updateConversationSettings(
              conversationId,
              normalizeGroupSettings(serverSettings)
            );
          }
          await fetchConversationDetail(conversationId, true).catch(() => {});
        } else {
          updateConversationSettings(conversationId, previousSettings);
          setErrorMsg(
            (res.payload as any)?.message ?? "Không thể cập nhật cài đặt"
          );
        }
      } catch {
        updateConversationSettings(conversationId, previousSettings);
        setErrorMsg("Không thể cập nhật cài đặt. Vui lòng thử lại.");
      }
    },
    [conversationId, isPrivileged, settingsLoaded, updateConversationSettings, fetchConversationDetail]
  );

  const permissions: { key: GroupPermissionKey; label: string; description?: string }[] = [
    { key: 'change_info', label: t("CHANGE_INFO"), description: t("CHANGE_INFO_DESC") },
    { key: 'pin_message', label: t("PIN_MESSAGE"), description: t("PIN_MESSAGE_DESC") },
    { key: 'create_note', label: t("CREATE_NOTE"), description: t("CREATE_NOTE_DESC") },
    { key: 'create_poll', label: t("CREATE_POLL"), description: t("CREATE_POLL_DESC") },
    { key: 'send_message', label: t("SEND_MESSAGE"), description: t("SEND_MESSAGE_DESC") },
  ];

  const policies: { key: GroupPolicyKey; label: string; description?: string }[] = [
    { key: 'join_approval', label: t("JOIN_APPROVAL"), description: t("JOIN_APPROVAL_DESC") },
    { key: 'allow_read_history', label: t("ALLOW_READ_HISTORY"), description: t("ALLOW_READ_HISTORY_DESC") },
    { key: 'allow_join_link', label: t("ALLOW_JOIN_LINK"), description: t("ALLOW_JOIN_LINK_DESC") },
  ];

  const features: { key: GroupFeatureKey; label: string; description?: string }[] = [
    { key: 'admin_tagging', label: t("ADMIN_TAGGING"), description: t("ADMIN_TAGGING_DESC") },
  ];

  return (
    <Box sx={{ marginBottom: 1 }}>
      <SectionBlock title={t("PERMISSIONS")} defaultOpen>
        {permissions.map((perm) => (
          <ToggleRow
            key={perm.key}
            label={perm.label}
            description={perm.description}
            value={currentSettings.permissions[perm.key]}
            onChange={(value) => handleToggle('permissions', perm.key, value)}
            disabled={!isPrivileged || !settingsLoaded}
          />
        ))}
      </SectionBlock>

      <SectionBlock title={t("POLICIES")} defaultOpen>
        {policies.map((policy) => (
          <ToggleRow
            key={policy.key}
            label={policy.label}
            description={policy.description}
            value={currentSettings.policies[policy.key]}
            onChange={(value) => handleToggle('policies', policy.key, value)}
            disabled={!isPrivileged || !settingsLoaded}
          />
        ))}
      </SectionBlock>

      <SectionBlock title={t("FEATURES")} defaultOpen>
        {features.map((feature) => (
          <ToggleRow
            key={feature.key}
            label={feature.label}
            description={feature.description}
            value={currentSettings.features[feature.key]}
            onChange={(value) => handleToggle('features', feature.key, value)}
            disabled={!isPrivileged || !settingsLoaded}
          />
        ))}
      </SectionBlock>

      {!isPrivileged && (
        <ReadOnlyNote>
          <ReadOnlyText>
            {t("GROUP_SETTINGS_READ_ONLY")}
          </ReadOnlyText>
        </ReadOnlyNote>
      )}

      <Snackbar
        open={!!errorMsg}
        autoHideDuration={4000}
        onClose={() => setErrorMsg(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorMsg(null)}
          severity="error"
          variant="filled"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
