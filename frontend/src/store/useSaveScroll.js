import { create } from "zustand";

export const useSaveScroll = create((set) => (
    {
        position: {
            x: null, 
            y: null
        },
        setPosition: (position) => set({position})
    }
))