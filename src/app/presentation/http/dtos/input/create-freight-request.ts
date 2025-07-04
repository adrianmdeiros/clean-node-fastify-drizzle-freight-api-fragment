import { z } from "zod"

export const freightSchema = z.object({
  description: z.string().min(5).max(30),
  weight: z.number()
    .min(0.01)
    .max(9999.99)
    .refine(val => Number.isInteger(val * 100), {
      message: 'Weight deve ter no máximo duas casas decimais',
    }),
  value: z.number()
    .min(0.01)
    .max(9999.99)
    .refine(val => Number.isInteger(val * 100), {
      message: 'Value deve ter no máximo duas casas decimais',
    }),
  clientId: z.string().length(21),
  cityId: z.string().length(21),
})

export type CreateFreightRequest = z.infer<typeof freightSchema>
