import { Client } from "../../domain/entities/client";
import { IFactory } from "./interfaces/factory";

export class ClientFactory implements IFactory {
    create(validClient: Omit<Client, 'id' | 'freights'>): Client {
        return new Client(
            validClient.name,
            validClient.address,
            validClient.phone
        )
    }
}