"use client";

import "@/src/common/i18n/i18n";
import { AppToaster } from "@/src/shared/component/AppToaster";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppToaster />
    </>
  );
}
