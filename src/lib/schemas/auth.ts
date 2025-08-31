import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Correo inválido"),
  password: z.string().min(4, "Mínimo 4 caracteres"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstNames: z.string().min(1, "Nombre es requerido"),
  lastNames: z.string().min(1, "Apellido es requerido"),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sexo es requerido" }),
  bornDate: z.date({ message: "Fecha de nacimiento es requerida" }),
  phone: z.string().min(8, "Número de teléfono debe tener al menos 8 dígitos"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
