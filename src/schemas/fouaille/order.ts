import { z } from "zod/v4";

import { MetaSchema } from "../meta";
import { ProductSchema } from "./product";

export const OrderSchema = z.object({
  date: z.date(),
  total_price: z.number(),
  amount: z.number(),
  product: z.array(ProductSchema),
});

export const APIOrdersSchema = z.object({
  data: z.object({
    orders: z.array(OrderSchema),
  }),
  meta: MetaSchema,
});

export type Order = z.infer<typeof OrderSchema>;
export type APIOrders = z.infer<typeof APIOrdersSchema>;
