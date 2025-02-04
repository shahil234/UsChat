import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../store/useAuth";

export default function useRefreshToken() {
  const { refreshToken, logInUser, logOutUser } = useAuth();

  const getNewAccessToken = async () => {
    try {
      const response = await axiosInstance.patch("/api/auth/token", {
        refreshToken,
      });

      logInUser({
        userId: response?.data?.data?.userId,
        refreshToken,
        accessToken: response?.data?.data?.newAccessToken,
      });
      return {
        success: true,
        data: {
          refreshToken,
          accessToken: response?.data?.newAccessToken,
        },
      };
    } catch (error) {
      if (error === 401) {
        logOutUser();
      }
    }
    return { success: false };
  };
  return { getNewAccessToken };
}
