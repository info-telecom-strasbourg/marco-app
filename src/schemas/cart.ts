import { z } from "zod";

import { ProductSchema } from "@/schemas/fouaille/product";

export const CartItemSchema = z.object({
  product: ProductSchema,
  quantity: z.number().min(1),
});

export const CartSchema = z.object({
  items: z.array(CartItemSchema),
});

export type CartItem = z.infer<typeof CartItemSchema>;
export type Cart = z.infer<typeof CartSchema>;
