import { z } from "zod/v4";

/**
 * Schema used to represent any user.
 * Private informations are not included
 */
export const UserSchema = z.object({
  id: z.number(),

  user_name: z.string(),
  last_name: z.string(),
  first_name: z.string(),

  birth_date: z.string(),
  description: z.string(),
  avatar_url: z.url(),

  admission_year: z.string(),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export const MeSchema = z.object({
  ...UserSchema,
  email: z.email(),
  phone: z.string(),
  bde_id: z.number().optional(),
  sector_id: z.number().optional(),
  email_verified_at: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>;
export type Me = z.infer<typeof MeSchema>;
