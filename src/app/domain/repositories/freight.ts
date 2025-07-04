import { Freight } from "../entities/freight";

export interface IFreightRepository {
    save(freight: Freight, clientId: string, cityId: string): Promise<Freight>
    findByClient(clientId: string): Promise<Freight[]>
}