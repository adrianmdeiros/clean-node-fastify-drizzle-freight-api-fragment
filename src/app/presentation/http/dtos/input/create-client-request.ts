import { z } from "zod"

export const clientSchema = z.object({
    name: z.string().min(4).max(30),
    address: z.string().min(10).max(30),
    phone: z.string().min(11).max(30)
})

export type CreateClientRequest= z.infer<typeof clientSchema>