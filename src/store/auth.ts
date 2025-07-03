import { create } from "zustand"

import type { User } from "@/schemas/user"

type AuthStore = {
  user: User | null
  token: string

  setAuthData: (user: User, token: string) => void
  deleteAuthData: () => void
}

export const useAuthStore = create<AuthStore>((mutate) => ({
  user: null,
  token: '',

  setAuthData: (user: User, token: string) => mutate((state) => ({ user, token })),
  deleteAuthData: () => mutate((state) => ({ user: null, token: '' }))
}))
