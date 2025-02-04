import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => {
      return {
        accessToken: localStorage.getItem("usChatAuthData")?.accessToken || null,
        refreshToken:  localStorage.getItem("usChatAuthData")?.refreshToken || null,
        isLogedIn: false,
        logInUser: ({ accessToken, refreshToken, userId }) =>
          set(() => ({
            accessToken,
            refreshToken,
            userId,
            isLogedIn: true,
          })),
        logOutUser: () =>
          set(() => ({
            refreshToken: null,
            isLogedIn: false,
            accessToken: null,
          })),
      };
    },
    {
      name: "usChatAuthData",
    }
  )
);
