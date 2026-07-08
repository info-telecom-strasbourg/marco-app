import { z } from "zod";
import { ProductTypeSchema } from "@/schemas/fouaille/productType";

export const ProductTypeListSchema = z.object({
  data: z.array(ProductTypeSchema),
});

export type ProductTypeList = z.infer<typeof ProductTypeListSchema>;
