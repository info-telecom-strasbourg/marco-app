import { z } from "zod/v4";

export const UserCommonSchema = z.object({
  id: z.number(),
  bde_id: z.number().optional(),
  unistra_id: z.number().nullable(),
  user_name: z.string(),
  last_name: z.string(),
  first_name: z.string(),
  email: z.email(),
  phone: z.string(),
  birth_date: z.string(),
  promotion_year: z.number(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  email_verified_at: z.coerce.date()
})

/**
 * Schema used to represent any user.
 * Private informations are not included
 */
export const UserSchema = z.object({
  ...UserCommonSchema.shape // Patch until I found what to do with that
})

export const MeSchema = z.object({
  ...UserCommonSchema.shape,
  avatar_url: z.url(),
  sector: z.string()
})

export type User = z.infer<typeof UserSchema>;
export type Me = z.infer<typeof MeSchema>;
