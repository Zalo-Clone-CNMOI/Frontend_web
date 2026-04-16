export const HIDDEN_BODY = "\u200B";

export const cleanMessageBody = (value?: string) => {
  return (value ?? "").replace(/\u200B/g, "").trim();
};