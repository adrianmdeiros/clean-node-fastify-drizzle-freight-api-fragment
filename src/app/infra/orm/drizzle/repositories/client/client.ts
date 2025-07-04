
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Client } from "../../../../../domain/entities/client";
import { IClientRepository } from "../../../../../domain/repositories/client";
import { DrizzleClient } from "../../db";
import { clients } from "../../schema";

export class DrizzleClientRepository implements IClientRepository {
    constructor(
        private readonly db: DrizzleClient
    ) { }

    async save(client: Client): Promise<Client> {
        const [savedClient] = await this.db.insert(clients).values({
            id: nanoid(),
            name: client.name,
            address: client.address,
            phone: client.phone
        }).returning()

        return Client.rehydrate(
            savedClient.id,
            savedClient.name,
            savedClient.address,
            savedClient.phone,
        )
    }

    async findById(clientId: string): Promise<Client> {
        const [client] = await this.db
            .select()
            .from(clients)
            .where(eq(clients.id, clientId))

        return Client.rehydrate(
            client.id,
            client.name,
            client.address,
            client.phone
        )
    }

    async findByPhone(phone: string): Promise<Client> {
        const [clientByPhone] = await this.db
            .select()
            .from(clients)
            .where(eq(clients.phone, phone))

        return Client.rehydrate(
            clientByPhone.id,
            clientByPhone.name,
            clientByPhone.address,
            clientByPhone.phone
        )
    }


}