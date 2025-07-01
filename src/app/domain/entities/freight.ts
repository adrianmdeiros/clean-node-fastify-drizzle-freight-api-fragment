import { City } from "./city"
import { Client } from "./client"

export class Freight {
    constructor(
        public readonly description: string,
        public readonly weight: number,
        public readonly value: number,
        public readonly client: Client,
        public readonly city: City,
    ) { }
}