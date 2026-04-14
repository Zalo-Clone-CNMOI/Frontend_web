import { create } from "zustand";
import { IApiResponse, IAuthData,  IUser } from "../interface/auth-interface";
import { IEditProfileForm } from "../interface/user-interface";
interface UseAuthStoreProps {
  authData: IApiResponse<IAuthData> | null;
  setAuthData: (data: IApiResponse<IAuthData> | null) => void;
  // setAuthUser: (user: IUser) => void;

  loadingAuth: boolean;
  setLoadingAuth: (loading: boolean) => void;

  errorAuth: string | null;
  setErrorAuth: (error: string | null) => void;

  // tokenData: ITokens | null;
  // setTokenData: (data: ITokens | null) => void;

  openProfileModal: boolean;
  setOpenProfileModal: (open: boolean) => void;

  openEditProfileModal: boolean;
  setOpenEditProfileModal: (open: boolean) => void;

  pendingOpenEditProfile: boolean;
  setPendingOpenEditProfile: (pending: boolean) => void;

  editProfileData: IEditProfileForm;
  setEditProfileField: (key: keyof IEditProfileForm, value: string) => void;
  fillEditProfileFormFromAuth: () => void;
  resetEditProfileForm: () => void;

  resetAuth: () => void;
}

export const useAuthStore = create<UseAuthStoreProps>()((set, get) => ({
      authData: null,
      setAuthData: (data) => set({ authData: data }),

      // setAuthUser: (user) =>
      //   set((state) => ({
      //     authData: state.authData
      //       ? { ...state.authData, data: { ...state.authData.data, user } }
      //       : null,
      //   })),

      loadingAuth: false,
      setLoadingAuth: (loading) => set({ loadingAuth: loading }),

      errorAuth: null,
      setErrorAuth: (error) => set({ errorAuth: error }),

          // tokenData: null,
      // setTokenData: (data) => set({ tokenData: data }),

      openProfileModal: false,
      setOpenProfileModal: (open) => set({ openProfileModal: open }),

      openEditProfileModal: false,
      setOpenEditProfileModal: (open) => set({ openEditProfileModal: open }),

      pendingOpenEditProfile: false,
      setPendingOpenEditProfile: (pending) => set({ pendingOpenEditProfile: pending }),

      editProfileData: {
        fullName: "",
        bio: "",
        gender: "",
        dateOfBirth: "",
        phone: "",
      },

      setEditProfileField: (key, value) =>
        set((state) => ({
          editProfileData: { ...state.editProfileData, [key]: value },
        })),

      fillEditProfileFormFromAuth: () => {
        const user = get().authData?.data?.user;
        set({
          editProfileData: {
            fullName: user?.fullName ?? "",
            bio: user?.bio ?? "",
            gender: user?.gender ?? "",
            dateOfBirth: user?.dateOfBirth ?? "",
            phone: user?.phone ?? "",
          },
        });
      },

      resetEditProfileForm: () =>
        set({
          editProfileData: {
            fullName: "",
            bio: "",
            gender: "",
            dateOfBirth: "",
            phone: "",
          },
        }),

      resetAuth: () =>
        set({
          authData: null,
          // tokenData: null,
          loadingAuth: false,
          errorAuth: null,
          openProfileModal: false,
          openEditProfileModal: false,
          pendingOpenEditProfile: false,
          editProfileData: {
            fullName: "",
            bio: "",
            gender: "",
            dateOfBirth: "",
            phone: "",
          },
        }),
    }),
);
      