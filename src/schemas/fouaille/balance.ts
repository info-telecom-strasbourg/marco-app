import { z } from "zod/v4";

export const BalanceSchema = z.object({
  data: z.object({
    balance: z.coerce.number(),
    first_name: z.string(),
    last_name: z.string(),
    user_name: z.string(),
  }),
});

export type Balance = z.infer<typeof BalanceSchema>;
