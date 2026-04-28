"use client";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import CallEndIcon from "@mui/icons-material/CallEnd";
import CallIcon from "@mui/icons-material/Call";
import { useCallStore } from "@/src/common/store/useCallStore";
import { acceptCall, rejectCall } from "@/src/common/service/call-service";
import AppAvatar, { buildS3Url } from "@/src/shared/component/Avatar";
import { useTrans } from "@/src/common/utilities/hook/trans";

const Container = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
});

const AvatarWrapper = styled(Box)({
  marginBottom: 24,
  animation: "pulse 2s infinite",
  "@keyframes pulse": {
    "0%": { transform: "scale(1)", opacity: 1 },
    "50%": { transform: "scale(1.05)", opacity: 0.8 },
    "100%": { transform: "scale(1)", opacity: 1 },
  },
});

const Name = styled(Typography)({
  fontSize: 24,
  fontWeight: 600,
  color: "#fff",
  marginBottom: 8,
});

const Subtitle = styled(Typography)({
  fontSize: 16,
  color: "rgba(255,255,255,0.7)",
  marginBottom: 48,
});

const Actions = styled(Box)({
  display: "flex",
  gap: 48,
  alignItems: "center",
});

const DeclineButton = styled(Button)({
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "#ef4444",
  minWidth: "unset",
  "&:hover": { background: "#dc2626" },
});

const AcceptButton = styled(Button)({
  width: 72,
  height: 72,
  borderRadius: "50%",
  background: "#22c55e",
  minWidth: "unset",
  "&:hover": { background: "#16a34a" },
});

export default function IncomingCallScreen() {
  const t = useTrans();
  const activeCall = useCallStore((s) => s.activeCall);
  const localStream = useCallStore((s) => s.localStream);

  const initiatorId = activeCall?.initiator_id;
  const isVideo = activeCall?.call_type === "video";

  return (
    <Container>
      <AvatarWrapper>
        <AppAvatar
          name={initiatorId || t("CHAT.USER")}
          size={120}
          fontSize={48}
        />
      </AvatarWrapper>

      <Name>
        {initiatorId || t("CHAT.USER")}
      </Name>

      <Subtitle>
        {isVideo ? t("CALL.VIDEO_INCOMING") : t("CALL.AUDIO_INCOMING")}
      </Subtitle>

      <Actions>
        <DeclineButton onClick={() => rejectCall()}>
          <CallEndIcon sx={{ color: "#fff", fontSize: 36 }} />
        </DeclineButton>

        <AcceptButton onClick={acceptCall}>
          <CallIcon sx={{ color: "#fff", fontSize: 36 }} />
        </AcceptButton>
      </Actions>
    </Container>
  );
}
