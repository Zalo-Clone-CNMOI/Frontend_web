"use client";

import MuiAvatar, { AvatarProps } from "@mui/material/Avatar";
import { getInitialsName } from "../../common/helpers/getInitName.helpers";

interface AppAvatarProps extends Omit<AvatarProps, "src"> {
  src: string | null;
  name: string | null;
  size?: number;
  fontSize?: number;
  showNameFallback?: boolean;
}

export default function AppAvatar({
  src,
  name,
  size = 32,
  alt,
  sx,
  children,
  fontSize = 16,
  showNameFallback = true,
  ...rest
}: AppAvatarProps) {
  const fallback = children || getInitialsName(name ?? "") || "A";

  return (
    <MuiAvatar
      src={src || undefined}
      alt={alt ?? name ?? ""}
      sx={{
        width: size,
        height: size,
        fontSize,
        fontWeight: 700,
        ...sx,
      }}
      {...rest}
    >
      {showNameFallback ? fallback : null}
    </MuiAvatar>
  );
}