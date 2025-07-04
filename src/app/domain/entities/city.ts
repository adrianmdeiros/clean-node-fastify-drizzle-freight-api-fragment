import { Freight } from "./freight";

export class City {
    constructor(
        public readonly name: string,
        public readonly uf: string,
        public readonly tax: number,
        public readonly freights: Freight[] = []
    ) { }

    static rehydrate(id: string, name: string, uf: string, tax: number, freights: Freight[] = []): City {
        const city = new City(name, uf, tax, freights)
            ; (city as any).id = id
        return city
    }

    public readonly id!: string
}