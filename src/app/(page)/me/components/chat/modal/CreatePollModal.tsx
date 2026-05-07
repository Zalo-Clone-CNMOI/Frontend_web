"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AppModal from "@/src/shared/component/AppModal";
import { usePollStore } from "@/src/common/store/usePollStore";
import { IPollPayload } from "@/src/common/interface/poll-interface";

interface CreatePollDialogProps {
  open: boolean;
  conversationId: string;
  onClose: () => void;
}

export default function CreatePollDialog({
  open,
  conversationId,
  onClose,
}: CreatePollDialogProps) {
  const createPoll = usePollStore((s) => s.createPoll);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [allowAddOption, setAllowAddOption] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validOptions = options
    .map((item) => item.trim())
    .filter(Boolean);

  const canSubmit = question.trim().length > 0 && validOptions.length >= 2;

  const handleClose = () => {
    if (submitting) return;

    handleResetForm();
    onClose();
  };

  const handleResetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
    setAllowMultiple(false);
    setAllowAddOption(true);
    setIsAnonymous(false);
  };

  const handleSubmit = async () => {
    if (!canSubmit || submitting || !conversationId) return;

    try {
      setSubmitting(true);

      const payload: IPollPayload = {
        question: question.trim(),
        options: validOptions.map((label) => ({ label })),
        allow_multiple: allowMultiple,
        allow_add_option: allowAddOption,
        is_anonymous: isAnonymous,
        expires_in_hours: 168,
      };

      const poll = await createPoll(conversationId, payload);

      if (poll) {
        handleClose();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppModal
      open={open}
      title="Tạo bình chọn"
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      headerDivider
      actions={
        <>
          <Button
            onClick={handleClose}
            disabled={submitting}
            sx={{
              textTransform: "none",
              color: "#344054",
            }}
          >
            Hủy
          </Button>

          <Button
            variant="contained"
            disabled={!canSubmit || submitting}
            onClick={() => void handleSubmit()}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              backgroundColor: "#0068FF",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#005AE0",
                boxShadow: "none",
              },
            }}
          >
            Tạo bình chọn
          </Button>
        </>
      }
    >
      <Stack spacing={2} sx={{ pt: 1 }}>
        <TextField
          fullWidth
          size="small"
          label="Câu hỏi bình chọn"
          placeholder="Nhập câu hỏi bình chọn"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <Stack spacing={1}>
          <Typography fontSize={13} fontWeight={600} color="#344054">
            Phương án
          </Typography>

          {options.map((option, index) => (
            <Box key={index} display="flex" gap={1} alignItems="center">
              <TextField
                fullWidth
                size="small"
                placeholder={`Phương án ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const next = [...options];
                  next[index] = e.target.value;
                  setOptions(next);
                }}
              />

              {options.length > 2 && (
                <IconButton
                  size="small"
                  onClick={() =>
                    setOptions((prev) => prev.filter((_, i) => i !== index))
                  }
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}

          <Button
            startIcon={<AddRoundedIcon />}
            onClick={() => setOptions((prev) => [...prev, ""])}
            sx={{
              width: "fit-content",
              textTransform: "none",
              color: "#0068FF",
              fontSize: 13,
              px: 0,
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            Thêm phương án
          </Button>
        </Stack>

        <Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              size="small"
              checked={allowMultiple}
              onChange={(e) => setAllowMultiple(e.target.checked)}
            />
            <Typography fontSize={14}>Cho phép chọn nhiều phương án</Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Checkbox
              size="small"
              checked={allowAddOption}
              onChange={(e) => setAllowAddOption(e.target.checked)}
            />
            <Typography fontSize={14}>
              Cho phép thành viên thêm phương án
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Checkbox
              size="small"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            <Typography fontSize={14}>Bình chọn ẩn danh</Typography>
          </Box>
        </Box>
      </Stack>
    </AppModal>
  );
}