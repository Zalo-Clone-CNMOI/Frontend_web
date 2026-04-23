"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useFormik } from "formik";
import { Area } from "react-easy-crop";
import LoadingButton from "@mui/lab/LoadingButton";
import InfoRow from "@/src/shared/component/InfoRow";
import { useAuthStore } from "@/src/common/store/useAuthStore";
import { useUserStore } from "@/src/common/store/useUserStore";
import { uploadMedia } from "@/src/common/service/media-service";
import { getCroppedImgFile } from "@/src/common/helpers/cropImage";
import { userService } from "@/src/common/service/user-service";
import { IUpdateMyProfilePayload } from "@/src/common/interface/user-interface";
import CropDialog from "@/src/shared/component/CropDialog";
import { Gender } from "@/src/common/interface/auth-interface";
import AppModal from "@/src/shared/component/AppModal";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
const ProfileHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 16,
  marginBottom: 16,
});

const AvatarWrapper = styled(Box)({
  position: "relative",
  width: 72,
  height: 72,
  cursor: "pointer",
});

const AvatarStyled = styled(Avatar)({
  width: 72,
  height: 72,
});

const AvatarEditBadge = styled(Box)({
  position: "absolute",
  right: -2,
  bottom: -2,
  width: 28,
  height: 28,
  borderRadius: "50%",
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
});


interface ProfileModalsProps {
  openProfileModal: boolean;
  setOpenProfileModal: (value: boolean) => void;
  pendingOpenEdit: boolean;
  setPendingOpenEdit: (value: boolean) => void;
}

const safeRevokeObjectUrl = (url?: string | null) => {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
};

export default function ProfileModals({
  openProfileModal,
  setOpenProfileModal,
  pendingOpenEdit,
  setPendingOpenEdit,
}: ProfileModalsProps) {
  const authData = useAuthStore((s) => s.authData);
  const setLoadingAuth = useAuthStore((s) => s.setLoadingAuth);
  const setErrorAuth = useAuthStore((s) => s.setErrorAuth);
  const loadingAuth = useAuthStore((s) => s.loadingAuth);
  const refreshUserData = useUserStore((s) => s.refreshUserData);
  const setOpenEditProfileModal = useUserStore((s) => s.setOpenEditProfileModal);
  const openEditProfileModal = useUserStore((s) => s.openEditProfileModal);

  const currentUser = authData?.data?.user ?? null;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [openCropDialog, setOpenCropDialog] = useState(false);
  const [selectedImageSrc, setSelectedImageSrc] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const initialValues = useMemo<IUpdateMyProfilePayload>(
    () => ({
      fullName: currentUser?.fullName ?? "",
      bio: currentUser?.bio ?? "",
      gender: currentUser?.gender ?? "other",
      dateOfBirth: currentUser?.dateOfBirth
        ? String(currentUser.dateOfBirth).slice(0, 10)
        : "",
      avatarUrl: currentUser?.avatarUrl ?? null,
      email: currentUser?.email ?? "",
    }),
    [currentUser]
  );

  const formik = useFormik<IUpdateMyProfilePayload>({
    enableReinitialize: true,
    initialValues,
    validate: (values) => {
      const errors: Partial<Record<keyof IUpdateMyProfilePayload, string>> = {};

      if (!values.fullName?.trim()) {
        errors.fullName = "Họ và tên không được để trống";
      }

      return errors;
    },
    onSubmit: async (values) => {
      const userId = currentUser?.id;

      if (!userId) {
        setErrorAuth("Không tìm thấy thông tin người dùng");
        return;
      }

      try {
        setLoadingAuth(true);
        setErrorAuth(null);

        const payload: IUpdateMyProfilePayload = {
          fullName: values.fullName?.trim() || "",
          bio: values.bio?.trim() || null,
          gender: ["male", "female", "other"].includes(String(values.gender))
            ? (values.gender as Gender)
            : "other",
          dateOfBirth: values.dateOfBirth || null,
        };

        if (avatarFile) {
          const uploadResult = await uploadMedia({
            file: avatarFile,
            userId: String(userId),
          });

          payload.avatarUrl = uploadResult.key ?? null;
        }

        console.log("UPDATE PROFILE PAYLOAD:", payload);

        const response = await userService.userUpdateProfile(payload);
        const updatedUser = response?.payload?.data

        if (updatedUser) {
          const prevAuth = useAuthStore.getState().authData;

          useAuthStore.getState().setAuthData({
            success: true,
            data: {
              user: {
                ...prevAuth?.data?.user,
                ...updatedUser,
                avatarUrl: updatedUser.avatarUrl ?? null,
                avatarResolvedUrl:
                  updatedUser.avatarResolvedUrl ??
                  updatedUser.avatarUrl ??
                  "",
              },
              tokens: prevAuth?.data?.tokens ?? {
                accessToken: "",
                refreshToken: "",
                expiresIn: null,
              },
            },
            meta: response?.payload?.meta,
            message: response?.payload?.message,
            timestamp: response?.payload?.timestamp
          });
        }

        await refreshUserData();
        handleCloseEditModal();
      } catch (error: any) {
        console.error("UPDATE PROFILE ERROR:", error);
        console.error(
          "UPDATE PROFILE ERROR BODY:",
          error?.payload || error?.response?.data
        );

        setErrorAuth(
          error?.message ||
          error?.payload?.message ||
          error?.response?.data?.message ||
          "Cập nhật hồ sơ thất bại"
        );
      } finally {
        setLoadingAuth(false);
      }
    }
  });

  const currentAvatar = avatarPreview

  const handleChooseAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleCloseProfileModal = () => {
    setOpenProfileModal(false);
  };

  const handleProfileDialogExited = () => {
    if (!pendingOpenEdit) return;
    setPendingOpenEdit(false);
    setOpenEditProfileModal(true);
  };

  const handleCloseEditModal = () => {
    safeRevokeObjectUrl(avatarPreview);
    safeRevokeObjectUrl(selectedImageSrc);

    setAvatarPreview("");
    setSelectedImageSrc("");
    setAvatarFile(null);
    setOpenEditProfileModal(false);
    setPendingOpenEdit(false);
    formik.resetForm();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      event.target.value = "";
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorAuth("Vui lòng chọn file ảnh");
      event.target.value = "";
      return;
    }

    safeRevokeObjectUrl(selectedImageSrc);

    const previewUrl = URL.createObjectURL(file);
    setAvatarFile(file);
    setSelectedImageSrc(previewUrl);
    setOpenCropDialog(true);

    event.target.value = "";
  };

  const handleCropConfirm = async (croppedAreaPixels: Area) => {
    try {
      if (!selectedImageSrc || !avatarFile) return;

      const croppedFile = await getCroppedImgFile(
        selectedImageSrc,
        croppedAreaPixels,
        avatarFile.name || "avatar.jpg"
      );

      safeRevokeObjectUrl(avatarPreview);

      const nextPreview = URL.createObjectURL(croppedFile);

      setAvatarFile(croppedFile);
      setAvatarPreview(nextPreview);
      setOpenCropDialog(false);

      safeRevokeObjectUrl(selectedImageSrc);
      setSelectedImageSrc("");
    } catch (error: any) {
      setErrorAuth(error?.message ?? "Không thể crop ảnh");
    }
  };

  useEffect(() => {
    return () => {
      safeRevokeObjectUrl(avatarPreview);
      safeRevokeObjectUrl(selectedImageSrc);
    };
  }, [avatarPreview, selectedImageSrc]);

  return (
    <>
      <AppModal
        open={openProfileModal}
        onClose={handleCloseProfileModal}
        title="Thông tin tài khoản"
        maxWidth="xs"
        headerDivider
        slotProps={{
          transition: {
            onExited: handleProfileDialogExited,
          },
        }}
        actions={
          <Button
            fullWidth
            sx={{border:"none", textTransform:"none"}}
            startIcon={<BorderColorOutlinedIcon/>}
            variant="outlined"
            color="inherit"
            onClick={() => {
              setPendingOpenEdit(true);
              setOpenProfileModal(false);
            }}
          >
            Cập nhật
          </Button>
        }
      >
        <ProfileHeader>
          <AvatarWrapper>
            <AvatarStyled
              src={(currentUser?.avatarUrl) || "/avatar.jpg"}
            />
          </AvatarWrapper>

          <Box>
            <Typography paddingBottom={0} fontSize={16} fontWeight={600}>
              {currentUser?.fullName ?? ""}
            </Typography>
          </Box>
        </ProfileHeader>

        {/* <Divider sx={{ mb: 2 }} /> */}
        <Stack gap="10px">
          <Typography fontSize={16} fontWeight={600}>Thông tin cá nhân</Typography>
          <Stack gap="10px">
            {currentUser?.bio ? <InfoRow label="Bio" value={currentUser.bio} /> : null}
            <InfoRow label="Giới tính" value={currentUser?.gender ?? ""} />
            <InfoRow
              label="Ngày sinh"
              value={
                currentUser?.dateOfBirth
                  ? String(currentUser.dateOfBirth).slice(0, 10)
                  : ""
              }
            />
            <InfoRow label="Điện thoại" value={currentUser?.phone ?? ""} />
          </Stack>
        </Stack>


        {/* <Divider sx={{ m: "16px 0" }} /> */}
      </AppModal>

      <AppModal
        open={openEditProfileModal}
        onClose={handleCloseEditModal}
        title="Chỉnh sửa thông tin"
        maxWidth="xs"
        actions={
          <>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleCloseEditModal}
              disabled={loadingAuth}
            >
              Hủy
            </Button>

            <LoadingButton
              fullWidth
              variant="contained"
              type="button"
              loading={loadingAuth}
              disabled={loadingAuth}
              onClick={() => {
                formik.submitForm();
              }}
            >
              Lưu
            </LoadingButton>
          </>
        }
      >
        <form onSubmit={formik.handleSubmit}>
          <ProfileHeader>
            <AvatarWrapper onClick={handleChooseAvatar}>
              <AvatarStyled src={currentAvatar} />
              <AvatarEditBadge>
                <EditOutlinedIcon fontSize="small" />
              </AvatarEditBadge>
            </AvatarWrapper>

            <Box>
              <Typography fontSize={16} fontWeight={600}>
                {currentUser?.fullName ?? ""}
              </Typography>
              <Typography fontSize={13} color="text.secondary">
                Nhấn vào ảnh để đổi avatar
              </Typography>
            </Box>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </ProfileHeader>

          <Divider sx={{ mb: 2 }} />

          <TextField
            fullWidth
            margin="dense"
            label="Họ và tên"
            name="fullName"
            value={formik.values.fullName ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName ? formik.errors.fullName : ""}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Bio"
            name="bio"
            value={formik.values.bio ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <FormControl component="fieldset" margin="dense" sx={{ mt: 2 }}>
            <FormLabel component="legend">Giới tính</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={formik.values.gender ?? "other"}
              onChange={formik.handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Nam" />
              <FormControlLabel value="female" control={<Radio />} label="Nữ" />
              <FormControlLabel value="other" control={<Radio />} label="Khác" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            margin="dense"
            label="Ngày sinh"
            type="date"
            name="dateOfBirth"
            value={formik.values.dateOfBirth ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Điện thoại"
            value={currentUser?.phone ?? ""}
            disabled
          />
        </form>
      </AppModal>

      <CropDialog
        open={openCropDialog}
        imageSrc={selectedImageSrc}
        onClose={() => {
          safeRevokeObjectUrl(selectedImageSrc);
          setSelectedImageSrc("");
          setOpenCropDialog(false);
        }}
        onConfirm={handleCropConfirm}
      />
    </>
  );
}