import { z } from "zod/v4";

import { MetaSchema } from "../meta";
import { ProductSchema } from "./product";

export const OrderSchema = z.object({
  date: z.date(),
  total_price: z.number(),
  amount: z.number(),
  product: z.array(ProductSchema).nullable()
})

export const OrderListSchema = z.object({
  data: z.object({
    balance: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string(),
    orders: z.array(OrderSchema)
  }),
  meta: MetaSchema
})

export type Order = z.infer<typeof OrderSchema>;
export type OrderList = z.infer<typeof OrderListSchema>;
