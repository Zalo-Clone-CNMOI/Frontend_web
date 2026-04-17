import { authService } from "@/src/common/service/auth-service";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {
  initialValues,
  validationResetPswSchema,
  type ChangePasswordFormValues,
} from "./validate/validateResetPsw";
import { auth } from "@/src/common/firebase/firebase";
import React from "react";

interface ChangePasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  open,
  onClose,
}: ChangePasswordModalProps) {
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleClose = () => {
    setSubmitError("");
    setSubmitSuccess("");
    onClose();
  };
  const handleCloseSuccessAlert = () => {
    setOpenSuccessAlert(false);
  };
  const getPasswordInputProps = (show: boolean, toggle: () => void) => ({
    type: show ? "text" : "password",
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={toggle} edge="end" size="small">
            {show ? (
              <VisibilityOffOutlinedIcon fontSize="small" />
            ) : (
              <VisibilityOutlinedIcon fontSize="small" />
            )}
          </IconButton>
        </InputAdornment>
      ),
    },
  });

  return (
    <React.Fragment>
    <Dialog data-testid="change-password-modal" open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        Đổi mật khẩu
        <IconButton onClick={handleClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Formik<ChangePasswordFormValues>
          initialValues={initialValues}
          validationSchema={validationResetPswSchema}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, helpers) => {
            const { setSubmitting, resetForm } = helpers;

            try {
              setSubmitError("");
              setSubmitSuccess("");

              const user = auth.currentUser;

              if (!user) {
                setSubmitError("Không tìm thấy thông tin tài khoản.");
                return;
              }

              const firebaseIdToken = await user.getIdToken(true);

              await authService.authResetPassword({
                firebaseIdToken,
                newPassword: values.newPassword.trim(),
              });

              resetForm();
              handleClose();
              setOpenSuccessAlert(true);
            } catch (error: any) {
              console.error("change password error:", error);

              const code = error?.code || "";
              const message =
                error?.message ||
                error?.payload?.message ||
                error?.response?.data?.message ||
                "Đổi mật khẩu thất bại.";

              if (code === "auth/requires-recent-login") {
                setSubmitError("Phiên đăng nhập đã cũ. Vui lòng đăng nhập lại để tiếp tục.");
              } else {
                setSubmitError(String(message));
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => {
            const canSubmit =
              !!values.newPassword.trim() &&
              !!values.confirmNewPassword.trim();

            return (
              <Form>
                <Typography fontSize="13px" color="text.secondary" mb={2}>
                  Nhập mật khẩu mới để cập nhật.
                </Typography>

                <TextField
                  fullWidth
                  margin="dense"
                  label="Mật khẩu mới"
                  name="newPassword"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.newPassword && errors.newPassword)}
                  helperText={touched.newPassword ? errors.newPassword : ""}
                  {...getPasswordInputProps(showNewPassword, () =>
                    setShowNewPassword((prev) => !prev)
                  )}
                />

                <TextField
                  fullWidth
                  margin="dense"
                  label="Nhập lại mật khẩu mới"
                  name="confirmNewPassword"
                  value={values.confirmNewPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!(touched.confirmNewPassword && errors.confirmNewPassword)}
                  helperText={touched.confirmNewPassword ? errors.confirmNewPassword : ""}
                  {...getPasswordInputProps(showConfirmNewPassword, () =>
                    setShowConfirmNewPassword((prev) => !prev)
                  )}
                />

                {submitError ? (
                  <Typography color="error" fontSize="13px" mt={1.5}>
                    {submitError}
                  </Typography>
                ) : null}

                {submitSuccess ? (
                  <Typography color="success.main" fontSize="13px" mt={1.5}>
                    {submitSuccess}
                  </Typography>
                ) : null}

                <Box display="flex" gap={1} mt={2}>
                  <Button fullWidth variant="outlined" onClick={handleClose}>
                    Hủy
                  </Button>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? "Đang xác nhận..." : "Xác nhận"}
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
    <Snackbar
  open={openSuccessAlert}
  autoHideDuration={3000}
  onClose={handleCloseSuccessAlert}
  anchorOrigin={{ vertical: "top", horizontal: "right" }}
>
  <Alert
    onClose={handleCloseSuccessAlert}
    severity="success"
    variant="filled"
    sx={{ width: "100%" }}
  >
    Đổi mật khẩu thành công.
  </Alert>
</Snackbar>
</React.Fragment>
  );
}