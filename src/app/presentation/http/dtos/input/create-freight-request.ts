import { z } from "zod"

export const freightSchema = z.object({
    description: z.string().min(5).max(30),
    weight: z.number().min(1).max(4),
    value: z.number().min(1).max(4),
    clientId: z.string().length(21),
    cityId: z.string().length(21)
})

export type CreateFreightRequest = z.infer<typeof freightSchema>