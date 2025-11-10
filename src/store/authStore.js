import { create } from "zustand";

export const useAuthStore = create((set) => ({
    accessToken: null,
    username: null,
    setAuth: ({ accessToken, username }) =>
        set({ accessToken, username }),
    clearAuth: () => set({ accessToken: null, username: null }),
}));