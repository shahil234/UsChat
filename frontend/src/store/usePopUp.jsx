import { create } from "zustand";

export const usePopUp = create((set) => (
    {
        currentPopUp: null,
        setCurrentPopUp: (popUpName) => set({currentPopUp: popUpName}),
        clearPopUp: () => set({currentPopUp: null})
    }
))