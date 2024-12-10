import { z } from "zod";

export const authUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords must match",
  path: ["confirm_password"], // Montre l'erreur sous le champ confirm_password
});
