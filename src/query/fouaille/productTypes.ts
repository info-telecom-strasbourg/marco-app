import { useQuery } from "@tanstack/react-query";
import { ZodError } from "zod";

import {
  ProductTypeList,
  ProductTypeListSchema,
} from "@/schemas/fouaille/productTypeList";

async function getAll(): Promise<ProductTypeList | null> {
  try {
    const payload = await fetch(
      `${process.env.EXPO_PUBLIC_FOUAILLE_URL}/api/productType`,
    ).then((res) => res.json());

    const parsed = ProductTypeListSchema.safeParse(payload);

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

export function useGetProductTypes() {
  return useQuery({
    queryKey: ["product/types"],
    queryFn: getAll,
  });
}
