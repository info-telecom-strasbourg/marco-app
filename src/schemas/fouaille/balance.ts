import { z } from "zod/v4";

export const BalanceSchema = z.object({
  balance: z.coerce.number(),
  first_name: z.string(),
  last_name: z.string(),
  user_name: z.string(),
});

export const APIBalanceSchema = z.object({
  data: z.object({
    ...BalanceSchema.shape
  })
})

export type Balance = z.infer<typeof BalanceSchema>;
export type APIBalance = z.infer<typeof APIBalanceSchema>;
