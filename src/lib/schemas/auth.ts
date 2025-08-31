import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido"),
  password: z.string().min(4, "Mínimo 4 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
