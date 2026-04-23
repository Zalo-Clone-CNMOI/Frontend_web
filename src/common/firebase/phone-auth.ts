import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "./firebase";

declare global {
  interface Window {
    __recaptchaVerifier?: RecaptchaVerifier;
    __recaptchaWidgetId?: number;
    __recaptchaRendered?: boolean;
  }
}

export const setupRecaptcha = async (
  containerId: string,
  onSuccess?: () => Promise<void>,
  onExpired?: () => void
) => {
  if (typeof window === "undefined") return null;

  // Nếu đã có verifier, trả về luôn
  if (window.__recaptchaVerifier && window.__recaptchaRendered) {
    return window.__recaptchaVerifier;
  }

  // Tạo verifier với callback
  window.__recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "normal",
    callback: async (response: any) => {
      // Được gọi khi user tick captcha thành công
      if (onSuccess) {
        await onSuccess();
      }
    },
    "expired-callback": () => {
      if (onExpired) {
        onExpired();
      }
    },
  });

  // ✅ Chỉ render 1 lần
  if (!window.__recaptchaRendered) {
    try {
      window.__recaptchaWidgetId = await window.__recaptchaVerifier.render();
      window.__recaptchaRendered = true;
    } catch (error) {
      console.error("Error rendering reCAPTCHA:", error);
      throw error;
    }
  }

  return window.__recaptchaVerifier;
};

export const resetRecaptchaCheckbox = () => {
  if (typeof window === "undefined") return;
  
  try {
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha && grecaptcha.reset && typeof window.__recaptchaWidgetId !== "undefined") {
      grecaptcha.reset(window.__recaptchaWidgetId);
    }
  } catch (error) {
    console.error("Error resetting reCAPTCHA:", error);
  }
};

export const sendOtp = async (phoneE164: string): Promise<ConfirmationResult> => {
  const verifier = window.__recaptchaVerifier;
  
  if (!verifier) {
    throw new Error("Recaptcha verifier not initialized. Call setupRecaptcha first.");
  }

  return await signInWithPhoneNumber(auth, phoneE164, verifier);
};

export const verifyOtp = async (confirmation: ConfirmationResult, otp: string) => {
  const userCred = await confirmation.confirm(otp);
  const phoneNumber = userCred.user.phoneNumber;
  const firebaseIdToken = await userCred.user.getIdToken();
  return { phoneNumber, firebaseIdToken };
};

// Chỉ clear khi rời hẳn auth flow
export const clearRecaptcha = () => {
  if (typeof window === "undefined") return;
  
  if (window.__recaptchaVerifier) {
    try {
      window.__recaptchaVerifier.clear();
    } catch (error) {
      console.error("Error clearing reCAPTCHA:", error);
    }
    window.__recaptchaVerifier = undefined;
    window.__recaptchaWidgetId = undefined;
    window.__recaptchaRendered = false;
  }
};