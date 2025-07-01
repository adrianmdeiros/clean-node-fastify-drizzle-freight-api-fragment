import { Client } from "../../domain/entities/client";
import { IFactory } from "./interfaces/factory";

export class ClientFactory implements IFactory {
    create(validClient: Client): Client {
        return new Client(
            validClient.name,
            validClient.address,
            validClient.phone
        )
    }
}