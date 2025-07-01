import { CreateClientResponse } from "../../presentation/http/dtos/output/create-client-response";
import { Client } from "../entities/client";

export interface  IClientsRepository {
    save(client: Client): Promise<CreateClientResponse>
    findById(clientId: string): Promise<CreateClientResponse>
    findByPhone(phone: string): Promise<CreateClientResponse>
}