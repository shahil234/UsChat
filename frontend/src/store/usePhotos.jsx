import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePhotos = create(
  persist(
    (set) => ({
      currentPhotos: [],
      setCurrentPhotos: (photos) => set({ currentPhotos: [...photos] }),
      clearPhotos: () => set({ currentPhotos: [] }),
    }),
    {
      name: "photos",
    }
  )
);
