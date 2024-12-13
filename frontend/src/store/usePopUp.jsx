import { create } from "zustand";

export const useContext = create((set) => (
    {
        currentPopUp: null,
        setCurrentPopUp: (popUpName) => set({currentPopUp: popUpName}),
        clearPopUp: () => set({currentPopUp: null})
    }
))