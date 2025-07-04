import { Freight } from "./freight";

export class Client {
    constructor(
        public readonly name: string,
        public readonly address: string,
        public readonly phone: string,
        public freights: Freight[] = []
    ) { }
    
    static rehydrate(id: string, name: string, address: string, phone: string, freights: Freight[] = []): Client {
        const client = new Client(name, address, phone, freights)
        ; (client as any).id = id
        return client
    }
    
    public readonly id!: string
}