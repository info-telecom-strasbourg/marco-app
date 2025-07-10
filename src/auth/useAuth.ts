import { clearAuthData, getAuthData, saveAuthData } from "@/auth/deviceStorage";
import { useAuthStore } from "@/store/auth";
import { SignIn } from "@/schemas/auth/signIn";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, token, setAuthData, deleteAuthData } = useAuthStore();

  // Try to fetch credentials data from device storage (app startup)
  useEffect(() => {
    async function loadFromDevice() {
      const { token, user } = await getAuthData();

      if (token && user) {
        setAuthData(user, token);
      }
    }

    loadFromDevice();
  }, [setAuthData]);

  const signIn = async (payload: SignIn) => {
    // Query API to get a new token
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return null;
    }

    const { user, token } = await res.json();

    saveAuthData(token, user); // save data in local store
    setAuthData(user, token); // save data on device storage

    return { token, user };
  };

  const signOut = async () => {
    // Query API to invalidate token
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    deleteAuthData(); // Delete existing data in local store
    clearAuthData(); // Delete existing data on device storage
  };

  return { user, token, signIn, signOut };
};
