import {create} from "zustand"
export const useAuth = create((set) => {
    return {
        accessToken: null,
        refreshToken: null,
        isLogedIn: false,
        logOutUser: () => set((state) => ({
            ...state,
            isLogedIn: false,
            accessToken: null
        }))
    }
})