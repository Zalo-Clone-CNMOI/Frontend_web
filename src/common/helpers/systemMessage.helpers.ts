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

export const buildSystemMessageText = (message: UiMessage) => {
    // console.log("SystemEventType enum:", SystemEventType);
    // console.log("message.system_event_type:", message.system_event_type);
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
            const data = message.metadata as CallEndedMetadata;
            const name = data?.initiator_name || "Ai đó";
            const type = data?.call_type === "video" ? "video" : "thoại";
            const duration = data?.duration_seconds;
            if (duration) {
                const m = Math.floor(duration / 60);
                const s = duration % 60;
                return `Cuộc gọi ${type} với ${name} kết thúc (${m}:${s.toString().padStart(2, "0")})`;
            }
            return `Cuộc gọi ${type} với ${name} kết thúc`;
        }

        case SystemEventType.CALL_MISSED: {
            const data = message.metadata as CallMissedMetadata;
            const name = data?.initiator_name || "Ai đó";
            const type = data?.call_type === "video" ? "video" : "thoại";
            return `Cuộc gọi ${type} nhỡ từ ${name}`;
        }

        default:
            return message.body || "Tin nhắn hệ thống";
    }
};