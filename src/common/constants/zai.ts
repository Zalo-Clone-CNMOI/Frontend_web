// Zai is the single AI bot user with a fixed identity. It posts into
// conversations where it is NOT a listed member (e.g. group @mentions), so its
// name/avatar cannot always be resolved from conversationDetail.members. These
// constants let any render site special-case Zai by its fixed id.

export const ZAI_BOT_ID =
  process.env.NEXT_PUBLIC_ZAI_BOT_ID ?? "00000000-0000-4000-8000-0000000000a1";

// Full absolute S3 URL of the Zai avatar (must match the avatar_url of the Zai
// user row in the DB). Empty string when unset → callers fall back to initials.
export const ZAI_AVATAR_URL = process.env.NEXT_PUBLIC_ZAI_AVATAR_URL ?? "";

export const ZAI_DISPLAY_NAME = "Zai";

export const isZaiBot = (userId?: string | null): boolean =>
  !!userId && userId === ZAI_BOT_ID;
