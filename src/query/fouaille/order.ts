import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { APIOrdersSchema, OrderSchema } from "@/schemas/fouaille/order";
import { useAuth } from "@/auth/useAuth";

async function getAll(pageParam: number, token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/orders?page=${pageParam}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    const { data } = APIOrdersSchema.safeParse(payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function get(orderId: number, token: string) {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/api/fouaille/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then((res) => res.json());

    const { data } = OrderSchema.safeParse(payload);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function useGetAllOrders() {
  const { token } = useAuth();

  return useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam }) => getAll(pageParam, token),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage!.meta.last_page === lastPage!.meta.current_page
        ? undefined
        : lastPage!.meta.current_page + 1;
    },
  });
}

export function useGetOrder(orderId: number) {
  const { token } = useAuth();

  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => get(orderId, token),
  });
}
