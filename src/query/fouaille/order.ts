import { ZodError } from "zod/v4";
import { useQuery } from "@tanstack/react-query";

import { OrderListSchema } from "@/schemas/fouaille/order";
import { useAuth } from "@/auth/useAuth";

async function ordersFetcher(token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());
    const parsed = OrderListSchema.safeParse(payload);

    return parsed.data!.data;
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }

    console.error(error);
  }

  return null;
}

export function useOrders() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => ordersFetcher(token),
  });
}
