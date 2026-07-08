import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  color: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;
