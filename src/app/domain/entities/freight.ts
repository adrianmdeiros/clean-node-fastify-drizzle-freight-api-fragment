import { City } from "./city"
import { Client } from "./client"

export class Freight {
    constructor(
        public readonly description: string,
        public readonly weight: number,
        public readonly client: Client,
        public readonly city: City,
        public value: number = 0
    ) { }

    static rehydrate(id: string, description: string, weight: number, client: Client, city: City, value: number = 0): Freight {
        const freight = new Freight(
            description,
            weight,
            client,
            city,
            value
        );(freight as any).id = id
        return freight
    }

    public readonly id!: string
}