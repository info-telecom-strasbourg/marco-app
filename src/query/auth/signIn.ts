import type { SignIn } from "@/schemas/auth/signIn";

export async function signIn({ email, password }: SignIn) {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/login`, {
    body: JSON.stringify({ email, password }),
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return {}
  }


  return {
    data: await response.json(),
  };
}
