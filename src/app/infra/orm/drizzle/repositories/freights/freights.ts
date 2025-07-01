import { nanoid } from "nanoid";
import { and, eq } from "drizzle-orm";
import { IFreightsRepository } from "../../../../../domain/repositories/freights";
import { DrizzleClient } from "../../db";
import { cities, freights } from "../../schema";
import { Freight } from "../../../../../domain/entities/freight";
import { CreateFreightResponse } from "../../../../../presentation/http/dtos/output/create-freight-response";
import { IClientsRepository } from "../../../../../domain/repositories/clients";

export class DrizzleFreightsRepository implements IFreightsRepository {
    constructor(
        private readonly db: DrizzleClient,
        private readonly clientRepository: IClientsRepository
    ) { }

    async save(freight: Freight): Promise<CreateFreightResponse> {
        const client = await this.clientRepository.findByPhone(freight.client.phone)
        
        const [city] = await this.db
            .select()
            .from(cities)
            .where(and(
                eq(cities.name, freight.city.name),
                eq(cities.uf, freight.city.uf)
            ))

        if(!client || !city){
            throw new Error('Client or City not found.')
        }

        const [savedFreight] = await this.db.insert(freights).values({
            id: nanoid(),
            description: freight.description,
            weight: freight.weight,
            value: freight.value,
            cityId: city.id,
            clientId: client.id
        }).returning()
        
        return savedFreight
    }

    async findByClient(clientId: string): Promise<CreateFreightResponse[]>{
        const freightsByClient = await this.db
            .select()
            .from(freights)
            .where(eq(freights.clientId, clientId))
        return freightsByClient
    }
}