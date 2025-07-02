import { z } from "zod/v4";
import { ProductSchema } from "@/schemas/fouaille/product";

export const ProductListSectionSchema = z.object({
  id: z.number(),
  product_type: z.string(),
  products: z.array(ProductSchema)
})

export const ProductListSchema = z.object({
  data: z.array(ProductListSectionSchema)
})

export type ProductListSection = z.infer<typeof ProductListSectionSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
