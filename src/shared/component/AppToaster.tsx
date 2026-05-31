"use client";

import { Alert, Snackbar } from "@mui/material";
import { useToastStore } from "../../common/store/useToastStore";

/**
 * Global toast renderer. Mount ONCE near the app root (see providers.tsx).
 * Reads the latest toast from `useToastStore` and shows a MUI Snackbar.
 */
export function AppToaster() {
  const current = useToastStore((s) => s.current);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <Snackbar
      // `key` forces re-mount per toast so the auto-hide timer restarts.
      key={current?.id}
      open={!!current}
      autoHideDuration={current?.duration ?? 4000}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        dismiss();
      }}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      {current ? (
        <Alert
          severity={current.severity}
          variant="filled"
          onClose={dismiss}
          sx={{ width: "100%" }}
        >
          {current.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
