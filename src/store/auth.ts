import { create } from "zustand";

import { AuthUser } from "@/schemas/auth/user";

type AuthStore = {
  user: AuthUser | null;
  token: string;

  setAuthData: (user: AuthUser, token: string) => void;
  deleteAuthData: () => void;
};

export const useAuthStore = create<AuthStore>((mutate) => ({
  user: null,
  token: "",

  setAuthData: (user: AuthUser, token: string) =>
    mutate((state) => ({ user, token })),
  deleteAuthData: () => mutate((state) => ({ user: null, token: "" })),
}));
