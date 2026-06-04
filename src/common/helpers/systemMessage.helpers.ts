import {
  CallEndedMetadata,
  CallMissedMetadata,
  GroupDisbandedMetadata,
  MemberAddedMetadata,
  MemberLeftMetadata,
  MemberRemovedMetadata,
  OwnerTransferredMetadata,
  RoleChangedMetadata,
  SystemEventType,
  UiMessage,
} from "@/src/common/interface/chat-interface";

const formatDuration = (durationMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(durationMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} phút ${seconds} giây`;
};

const getCallLabel = (callType?: string) =>
  callType === "video" ? "Cuộc gọi video" : "Cuộc gọi thoại";

export const buildSystemMessageText = (message: UiMessage) => {
  switch (message.system_event_type) {
    case SystemEventType.MEMBER_ADDED: {
      const data = message.metadata as MemberAddedMetadata;
      const actor = data?.added_by_name || "Ai đó";
      const names =
        data?.added_members?.map((m) => m.full_name).filter(Boolean).join(", ") ||
        "thành viên";

      return `${actor} đã thêm ${names} vào nhóm`;
    }

    case SystemEventType.MEMBER_REMOVED: {
      const data = message.metadata as MemberRemovedMetadata;
      const actor = data?.removed_by_name || "Ai đó";
      const removedUser = data?.removed_user_name || "một thành viên";

      return `${actor} đã xóa ${removedUser} khỏi nhóm`;
    }

    case SystemEventType.MEMBER_LEFT: {
      const data = message.metadata as MemberLeftMetadata;
      const name = data?.user_name || "Ai đó";

      return `${name} đã rời khỏi nhóm`;
    }

    case SystemEventType.OWNER_TRANSFERRED: {
      const data = message.metadata as OwnerTransferredMetadata;
      const oldOwner = data?.previous_owner_name || "Trưởng nhóm cũ";
      const newOwner = data?.new_owner_name || "Trưởng nhóm mới";

      return `${oldOwner} đã chuyển quyền trưởng nhóm cho ${newOwner}`;
    }

    case SystemEventType.ROLE_CHANGED: {
      const data = message.metadata as RoleChangedMetadata;
      const actor = data?.updated_by_name || "Ai đó";
      const target = data?.target_user_name || "một thành viên";

      if (data?.new_role === "co_owner") {
        return `${actor} đã đặt ${target} làm phó nhóm`;
      }

      if (data?.new_role === "member") {
        return `${actor} đã thu hồi quyền phó nhóm của ${target}`;
      }

      return `${actor} đã cập nhật quyền của ${target}`;
    }

    case SystemEventType.GROUP_DISBANDED: {
      const data = message.metadata as GroupDisbandedMetadata;
      const actor = data?.disbanded_by_name || "Ai đó";

      return `${actor} đã giải tán nhóm`;
    }

    case SystemEventType.CALL_ENDED: {
      if (message.body?.trim()) return message.body;

      const data = message.metadata as CallEndedMetadata;
      return `${getCallLabel(data?.call_type)} - ${formatDuration(Number(data?.duration_ms ?? 0))}`;
    }

    case SystemEventType.CALL_MISSED: {
      if (message.body?.trim()) return message.body;

      const data = message.metadata as CallMissedMetadata;
      return `${getCallLabel(data?.call_type)} nhỡ`;
    }

    default:
      return message.body || "Tin nhắn hệ thống";
  }
};
