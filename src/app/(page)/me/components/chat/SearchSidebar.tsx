"use client";

import { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Select, MenuItem, Chip, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { chatService } from "@/src/common/service/chat-service";
import { UiMessage } from "@/src/common/interface/chat-interface";

interface SearchSidebarProps {
  open: boolean;
  onClose: () => void;
  conversationId: string;
  accessToken: string;
  onMessageClick?: (message: UiMessage) => void;
}

const Root = styled(Box, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open }) => ({
  width: "30%",
  minWidth: 320,
  maxWidth: 400,
  height: "100%",
  background: "#1a1a1a",
  borderLeft: "1px solid #333",
  display: open ? "flex" : "none",
  flexDirection: "column",
  overflow: "hidden",
}));

const Header = styled(Box)({
  height: 60,
  minHeight: 60,
  maxHeight: 60,
  flexShrink: 0,
  borderBottom: "1px solid #333",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 16px",
});

const HeaderTitle = styled(Typography)({
  fontSize: 16,
  fontWeight: 600,
  color: "#ffffff",
});

const Content = styled(Box)({
  flex: 1,
  overflow: "auto",
  padding: 16,
});

const SearchInputWrapper = styled(Box)({
  marginBottom: 16,
});

const SearchInput = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#2a2a2a",
    "& fieldset": {
      borderColor: "#444",
    },
    "&:hover fieldset": {
      borderColor: "#555",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#005AE0",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
    padding: "12px 12px 12px 40px",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#888",
  },
});

const SearchIconWrapper = styled(Box)({
  position: "absolute",
  left: 12,
  top: "50%",
  transform: "translateY(-50%)",
  color: "#888",
  pointerEvents: "none",
});

const FilterBar = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
});

const FilterLabel = styled(Typography)({
  fontSize: 13,
  color: "#888",
  whiteSpace: "nowrap",
});

const FilterSelect = styled(Select)({
  backgroundColor: "#2a2a2a",
  color: "#ffffff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#444",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#555",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#005AE0",
  },
  "& .MuiSelect-icon": {
    color: "#888",
  },
  fontSize: 13,
  height: 32,
});

const EmptyState = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  textAlign: "center",
  padding: "32px",
});

const EmptyIcon = styled(Box)({
  fontSize: 64,
  color: "#444",
  marginBottom: 16,
});

const EmptyText = styled(Typography)({
  fontSize: 14,
  color: "#666",
  lineHeight: 1.5,
});

const ResultItem = styled(Box)({
  padding: 12,
  borderRadius: 8,
  backgroundColor: "#2a2a2a",
  marginBottom: 8,
  cursor: "pointer",
  transition: "background-color 0.2s",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const ResultSender = styled(Typography)({
  fontSize: 13,
  fontWeight: 600,
  color: "#ffffff",
  marginBottom: 4,
});

const ResultContent = styled(Typography)({
  fontSize: 13,
  color: "#ccc",
  marginBottom: 4,
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
});

const ResultTime = styled(Typography)({
  fontSize: 11,
  color: "#666",
});

const ResultsHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
});

const ResultsCount = styled(Typography)({
  fontSize: 12,
  color: "#888",
});

export default function SearchSidebar({
  open,
  onClose,
  conversationId,
  accessToken,
  onMessageClick,
}: SearchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [senderFilter, setSenderFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [results, setResults] = useState<UiMessage[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        await performSearch();
      } else {
        setResults([]);
        setTotal(0);
        setHasSearched(false);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, senderFilter, dateFilter]);

  const performSearch = async () => {
    if (!conversationId || !searchQuery.trim()) return;

    setLoading(true);
    try {
      const params: any = { q: searchQuery.trim() };
      if (senderFilter) params.senderId = senderFilter;
      if (dateFilter) {
        const now = Date.now();
        if (dateFilter === "today") {
          params.from = new Date().setHours(0, 0, 0, 0);
        } else if (dateFilter === "week") {
          params.from = now - 7 * 24 * 60 * 60 * 1000;
        } else if (dateFilter === "month") {
          params.from = now - 30 * 24 * 60 * 60 * 1000;
        }
      }

      const response = await chatService.searchMessages(conversationId, params);
      if (response?.payload?.data) {
        setResults(response.payload.data.items || []);
        setTotal(response.payload.data.total || 0);
      }
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const handleMessageClick = (message: UiMessage) => {
    if (onMessageClick) {
      onMessageClick(message);
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <Root open={open}>
      <Header>
        <HeaderTitle>Tìm kiếm trong trò chuyện</HeaderTitle>
        <IconButton onClick={onClose} sx={{ color: "#888" }}>
          <CloseIcon />
        </IconButton>
      </Header>

      <Content>
        <SearchInputWrapper>
          <Box sx={{ position: "relative" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              fullWidth
              placeholder="Nhập từ khóa để tìm kiếm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>
        </SearchInputWrapper>

        <FilterBar>
          <FilterLabel>Lọc theo:</FilterLabel>
          <FilterSelect
            value={senderFilter}
            onChange={(e) => setSenderFilter(e.target.value as string)}
            displayEmpty
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Người gửi</MenuItem>
            {/* TODO: Add actual sender options from conversation members */}
          </FilterSelect>
          <FilterSelect
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as string)}
            displayEmpty
            size="small"
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Ngày gửi</MenuItem>
            <MenuItem value="today">Hôm nay</MenuItem>
            <MenuItem value="week">7 ngày</MenuItem>
            <MenuItem value="month">30 ngày</MenuItem>
          </FilterSelect>
        </FilterBar>

        {loading ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyText>Đang tìm kiếm...</EmptyText>
          </EmptyState>
        ) : !hasSearched || searchQuery.trim().length < 2 ? (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyText>
              Hãy nhập từ khóa để bắt đầu tìm kiếm tin nhắn và file trong trò chuyện
            </EmptyText>
          </EmptyState>
        ) : results.length === 0 ? (
          <EmptyState>
            <EmptyIcon>📭</EmptyIcon>
            <EmptyText>Không tìm thấy kết quả nào</EmptyText>
          </EmptyState>
        ) : (
          <>
            <ResultsHeader>
              <ResultsCount>Tìm thấy {total} kết quả</ResultsCount>
            </ResultsHeader>
            {results.map((message) => (
              <ResultItem
                key={message.messageId}
                onClick={() => handleMessageClick(message)}
              >
                <ResultSender>
                  {message.senderId || "Người dùng"}
                </ResultSender>
                <ResultContent>
                  {message.body || "[Tệp đính kèm]"}
                </ResultContent>
                <ResultTime>{formatTime(message.createdAt)}</ResultTime>
              </ResultItem>
            ))}
          </>
        )}
      </Content>
    </Root>
  );
}
