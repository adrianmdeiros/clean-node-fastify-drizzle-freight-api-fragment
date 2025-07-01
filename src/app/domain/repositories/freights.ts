import { CreateFreightResponse } from "../../presentation/http/dtos/output/create-freight-response";
import { Freight } from "../entities/freight";

export interface IFreightsRepository {
    save(freight: Freight): Promise<CreateFreightResponse>
    findByClient(clientId: string): Promise<CreateFreightResponse[]>
}