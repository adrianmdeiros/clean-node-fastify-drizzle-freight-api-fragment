
import { eq } from "drizzle-orm";
import { Client } from "../../../../../domain/entities/client";
import { IClientsRepository } from "../../../../../domain/repositories/clients";
import { DrizzleClient } from "../../db";
import { clients } from "../../schema";
import { nanoid } from "nanoid";
import { CreateClientResponse } from "../../../../../presentation/http/dtos/output/create-client-response";

export class DrizzleClientsRepository implements IClientsRepository {
    constructor(
        private readonly db: DrizzleClient
    ) { }

    async save(client: Client): Promise<CreateClientResponse> {
        const [savedClient] = await this.db.insert(clients).values({
            id: nanoid(),
            name: client.name,
            address: client.address,
            phone: client.phone
        }).returning()
        return savedClient
    }

    async findById(clientId: string): Promise<CreateClientResponse>{
         const [client] = await this.db
            .select()
            .from(clients)
            .where(eq(clients.id, clientId))
        return client
    }

    async findByPhone(phone: string): Promise<CreateClientResponse> {
        const [clientByPhone] = await this.db
            .select()
            .from(clients)
            .where(eq(clients.phone, phone))
        return clientByPhone
    }


}