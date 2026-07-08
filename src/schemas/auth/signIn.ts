import { z } from "zod";

export const SignInSchema = z.object({
  email: z.email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(1, { message: "Veuillez entrer un mot de passe" }),
});

export type SignIn = z.infer<typeof SignInSchema>;
