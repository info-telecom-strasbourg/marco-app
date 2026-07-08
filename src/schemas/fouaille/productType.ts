import { z } from "zod";

export const ProductTypeSchema = z.object({
  id: z.number(),
  type: z.string(), // name
});

export type ProductType = z.infer<typeof ProductTypeSchema>;
