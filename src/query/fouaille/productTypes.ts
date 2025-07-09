import { useQuery } from "@tanstack/react-query";
import { ZodError } from "zod/v4";

import { ProductTypeList, ProductTypeListSchema } from "@/schemas/fouaille/productTypeList";

async function productTypesFetcher(): Promise<ProductTypeList | null> {
  try {
    const payload = await fetch(
      "https://fouaille.bde-tps.fr/api/productType",
      { headers: { "Content-Type": "application/json" } }
    ).then(res => res.json());

    const parsed = ProductTypeListSchema.safeParse(payload);

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

export function getProductTypes() {
  const { data } = useQuery({
    queryKey: ["product/types"],
    queryFn: productTypesFetcher
  });

  if (!data) {
    return null;
  }


  return data;
}
