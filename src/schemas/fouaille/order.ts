import { z } from "zod";

import { MetaSchema } from "../meta";

export const OrderSchema = z.object({
  date: z.coerce.date(),
  total_price: z.coerce.number(),
  amount: z.coerce.number(),
  product: z.object({ name: z.string(), price: z.coerce.number() }),
});

export const APIOrdersSchema = z.object({
  data: z.object({
    orders: z.array(OrderSchema),
  }),
  meta: MetaSchema,
});

export type Order = z.infer<typeof OrderSchema>;
export type APIOrders = z.infer<typeof APIOrdersSchema>;
