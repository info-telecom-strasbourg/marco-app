import { z } from "zod/v4";

// import { APIOrderSchema } from "@/schemas/fouaille/order";

const APIOrderSchema = z.object({
  id: z.number(),
  product_id: z.coerce.number(),
  member_id: z.coerce.number().nullable(),
  date: z.coerce.date(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
});

const APICommonCartSchema = z.object({
  id: z.number(),
  price: z.number(),
  orders: z.array(APIOrderSchema).optional(),
  status: z.enum(["waiting", "payed"]),

  member_id: z.number().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

/**
 * Represent a Cart obtained through the API
 */
export const APICartSchema = z.object({
  data: z.object({
    ...APICommonCartSchema.shape,
  }),
});

export const APICartCollectionSchema = z.object({
  data: z.array(APICartSchema),
});

export type APICart = z.infer<typeof APICartSchema>;
export type APICartCollection = z.infer<typeof APICartCollectionSchema>;
