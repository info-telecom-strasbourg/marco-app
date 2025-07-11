import { ZodError } from "zod/v4";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/useAuth";
import { APIOrdersSchema, Order } from "@/schemas/fouaille/order";

async function fetcher(token: string): Promise<Order[] | null> {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());
    const { data } = APIOrdersSchema.safeParse(payload);

    const orders = data!.data.orders;
    return orders;
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }

    console.error(error);
  }

  return null;
}

export function useGetOrders() {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => fetcher(token),
  });
}
