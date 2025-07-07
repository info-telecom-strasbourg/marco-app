import { z } from "zod/v4";
import { UserCommonSchema } from "../user";

export const AuthUserSchema = z.object({
  ...UserCommonSchema.shape,
  sector_id: z.number().optional(),
  deleted_at: z.coerce.date().nullable()
})

export type AuthUser = z.infer<typeof AuthUserSchema>
