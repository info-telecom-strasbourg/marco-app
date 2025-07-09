import { z } from "zod/v4";
import { ProductSchema } from "./product";

export const PresetSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  category: z.number(), // Refer to product_type in ProductListSectionSchema
  products: z.array(ProductSchema)
})

export type Preset = z.infer<typeof PresetSchema>
