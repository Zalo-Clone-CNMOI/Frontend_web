import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { authService } from "../service/auth-service";

/**
 * FETCH AUTH DATA từ server
 * Gọi hàm này trong useEffect của auth-related pages
 */
export const fetchAuthData = async () => {
    try {
        useAuthStore.getState().setLoadingAuth(true);

        // Gọi API để lấy current user data
        // Tùy vào API của bạn, có thể là getMe hoặc authRefresh
        // Ví dụ dưới đây giả sử bạn có method để lấy user hiện tại

        // Option 1: Nếu có API getMe
        const userData = await authService.userGetMe();
        const payload = userData?.payload?.data;
        // const response = await authService.getMe();
        // useAuthStore.getState().setAuthData(response.data);

        // Option 2: Nếu dùng refresh token
        // const tokenData = useAuthStore.getState().tokenData;
        // if (tokenData?.refreshToken) {
        //   const response = await authService.authRefresh({
        //     refreshToken: tokenData.refreshToken,
        //   });

        if (userData?.payload?.data?.tokens?.accessToken) {
            // useAuthStore.getState().setAuthData(userData?.payload?.data?.user );
            useAuthStore.getState().setAuthData({
                success: true,
                data: {
                    user: payload.user,
                    tokens: {
                        accessToken: payload.tokens.accessToken ?? "",
                        expiresIn: payload.tokens.expiresIn ?? 0,
                        refreshToken: payload.tokens.refreshToken ?? "",
                    },
                },
                meta: null,
                message: userData?.payload?.message,
                timestamp: userData?.payload?.timestamp,
            });
        }
    }
    // useAuthStore.getState().setErrorAuth(null);
    catch (error: any) {
        console.error("Failed to fetch auth data:", error);
        useAuthStore.getState().setErrorAuth(error?.message || "Lỗi khi tải thông tin người dùng");
    } finally {
        useAuthStore.getState().setLoadingAuth(false);
    }
}

/**
 * FETCH CONVERSATIONS từ server
 * Gọi hàm này trong useEffect của chat/message pages
 */
export const fetchConversations = async (params = { page: 1, limit: 20 }) => {
    try {
        useChatStore.getState().setConversationLoading(true);
        useChatStore.getState().setError(null);

        // Gọi method từ store
        await useChatStore.getState().fetchListConversation(params);

        // Set active conversation nếu có
        const { listConversation } = useChatStore.getState();
        if (listConversation.length > 0) {
            useChatStore.getState().setActiveConversationId(listConversation[0]?.id || null);
        }
    } catch (error: any) {
        console.error("Failed to fetch conversations:", error);
        useChatStore.getState().setError(error?.message || "Không thể tải danh sách cuộc trò chuyện");
    }
};

/**
 * FETCH ALL DATA (Auth + Chat)
 * Gọi hàm này trong root layout hoặc main page khi cần fetch toàn bộ dữ liệu
 */
export const fetchAllData = async () => {
    try {
        // Fetch auth data first
        await fetchAuthData();

        // Sau đó fetch conversations
        await fetchConversations();
    } catch (error) {
        console.error("Failed to fetch all data:", error);
    }
};
