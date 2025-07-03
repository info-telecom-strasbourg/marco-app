import { ZodError } from "zod/v4";
import { useQuery } from "@tanstack/react-query";

import { OrderList, OrderListSchema } from "@/schemas/fouaille/order";

async function ordersFetcher(): Promise<OrderList | null> {
  try {
    const payload = await fetch(
      "https://fouaille.bde-tps.fr/api/fouaille",
      { headers: { "Content-Type": "application/json" } }
    ).then(res => res.json());

    const parsed = OrderListSchema.safeParse(payload);

    return parsed.data!;
  } catch (error) {
    if (error instanceof ZodError) {
      error.issues.map((e) => ({ path: e.path, message: e.message }));
      console.error(error);
    }

    console.error(error);
  }

  return null;
}

export function getOrders() {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: ordersFetcher
  })

  if (!data) {
    return null;
  }


  return data;
}




