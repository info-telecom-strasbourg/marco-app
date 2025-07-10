import { useQuery } from "@tanstack/react-query";
import { ZodError } from "zod/v4";

import { BalanceSchema } from "@/schemas/fouaille/balance";
import { useAuth } from "@/auth/useAuth";

async function balanceFetcher(token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    const parsed = BalanceSchema.safeParse(payload);

    return parsed.data!.data;
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
    }

    console.error(error);
  }
}

export function useBalance() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["balance"],
    queryFn: () => balanceFetcher(token),
  });
}
