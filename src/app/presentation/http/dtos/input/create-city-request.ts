import { z } from "zod" // validacao

export const citySchema = z.object({
    name: z.string().min(4).max(30),
    uf: z.string().min(2).max(2),
    tax: z.number()
      .min(0.01)
      .max(100)
      .refine(val => Number.isInteger(val * 100), {
        message: 'Taxa deve ter no máximo duas casas decimais',
      })
})

export type CreateCityRequest = z.infer<typeof citySchema>
