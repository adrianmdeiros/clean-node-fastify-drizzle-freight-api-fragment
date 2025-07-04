import { Client } from "../entities/client";

export interface  IClientRepository {
    save(client: Client): Promise<Client>
    findById(clientId: string): Promise<Client>
    findByPhone(phone: string): Promise<Client>
}