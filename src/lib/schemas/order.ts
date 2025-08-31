import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, "Nombre del producto es requerido"),
  weight: z.number().min(0.1, "Peso debe ser mayor a 0"),
  length: z.number().min(0.1, "Largo debe ser mayor a 0"),
  height: z.number().min(0.1, "Alto debe ser mayor a 0"),
  width: z.number().min(0.1, "Ancho debe ser mayor a 0"),
});

export const orderSchema = z.object({
  collectionAddress: z.string().min(1, "Dirección de recolección es requerida"),
  destinationAddress: z.string().min(1, "Dirección de destino es requerida"),
  destinationFirstName: z.string().min(1, "Nombre es requerido"),
  destinationLastName: z.string().min(1, "Apellido es requerido"),
  destinationEmail: z.string().email("Email inválido"),
  destinationPhone: z.string().min(8, "Número de teléfono inválido"),
  department: z.string().min(1, "Departamento es requerido"),
  province: z.string().min(1, "Municipio es requerido"),
  addressReference: z.string().min(1, "Referencia de dirección es requerida"),
  additionalNotes: z.string().optional(),
  scheduledDate: z.date({ message: "Fecha programada es requerida" }),
  products: z.array(productSchema).min(1, "Debe agregar al menos un producto"),
});

export type OrderFormValues = z.infer<typeof orderSchema>;