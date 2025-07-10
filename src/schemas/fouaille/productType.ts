import { z } from "zod/v4";

export const ProductTypeSchema = z.object({
  id: z.number(),
  type: z.string(), // name
});

export type ProductType = z.infer<typeof ProductTypeSchema>;
