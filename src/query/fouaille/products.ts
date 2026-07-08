import { useQuery } from "@tanstack/react-query";
import { ZodError } from "zod/v4";

import { ProductList, ProductListSchema } from "@/schemas/fouaille/productList";

async function getAll(): Promise<ProductList | null> {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_FOUAILLE_URL}/api/product`,
    ).then((res) => res.json());

    const parsed = ProductListSchema.safeParse(payload);

    return parsed.data!;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(
        error.issues.map((e) => ({ path: e.path, message: e.message })),
      );
    }

    throw error;
  }
}

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAll,
  });
}
