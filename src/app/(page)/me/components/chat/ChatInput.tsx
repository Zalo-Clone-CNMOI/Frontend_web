"use client";

import { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

interface ChatInputProps {
  disabled?: boolean;
  onSend: (value: string) => void;
}

const ComposerWrap = styled(Box)({
  height: "100%",
  minHeight: 50,
  maxHeight: 50,
  borderTop: "1px solid #EEF1F4",
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
    fontSize: "15px",
    color: "#111827",
    lineHeight: 1.2,
  },
  "& .MuiInputBase-input::placeholder": {
    opacity: .5,
    paddingLeft: 4,
  },
});

export default function ChatInput({ disabled, onSend }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const text = value.trim();
    if (!text || disabled) return;

    onSend(text);
    setValue("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <ComposerWrap data-testid="chat-input">
      <ComposerRow>
        <StyledTextField
          fullWidth
          multiline
          minRows={1}
          maxRows={1}
          placeholder="Nhập tin nhắn..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />

        {/* <SendButton onClick={handleSend} disabled={disabled || !value.trim()}>
          <SendRoundedIcon fontSize="small" />
        </SendButton> */}
      </ComposerRow>
    </ComposerWrap>
  );
}