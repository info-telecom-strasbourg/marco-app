import { useQuery } from "@tanstack/react-query";
import { ZodError } from "zod/v4";

import { ProductList, ProductListSchema } from "@/schemas/fouaille/productList";

async function getAll(): Promise<ProductList | null> {
  try {
    const payload = await fetch("https://fouaille.bde-tps.fr/api/product", {
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());

    const parsed = ProductListSchema.safeParse(payload);

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

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getAll,
  });
}
