import { z } from "zod"

export const citySchema = z.object({
    name: z.string().min(10).max(30),
    uf: z.string().min(2).max(2),
    tax: z.number().min(1).max(4)
})

export type CreateCityRequest = z.infer<typeof citySchema>