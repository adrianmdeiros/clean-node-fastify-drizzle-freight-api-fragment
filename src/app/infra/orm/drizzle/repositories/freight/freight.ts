import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { Freight } from "../../../../../domain/entities/freight";
import { IFreightRepository } from "../../../../../domain/repositories/freight";
import { DrizzleClient } from "../../db";
import { freights } from "../../schema";
import { IClientRepository } from "../../../../../domain/repositories/client";
import { ICityRepository } from "../../../../../domain/repositories/citiy";

export class DrizzleFreightRepository implements IFreightRepository {
    constructor(
        private readonly db: DrizzleClient,
        private readonly clientRepository: IClientRepository,
        private readonly cityRepository: ICityRepository
    ) { }

    async save(freight: Freight, clientId: string, cityId: string): Promise<Freight> {

        const client = await this.clientRepository.findById(clientId)
        if (!client) throw new Error("Client not found")

        const city = await this.cityRepository.findById(cityId)
        if (!city) throw new Error("City not found")

        const [savedFreight] = await this.db.insert(freights).values({
            id: nanoid(),
            description: freight.description,
            weight: freight.weight,
            value: freight.value,
            cityId,
            clientId
        }).returning()

        return Freight.rehydrate(
            savedFreight.id,
            savedFreight.description,
            savedFreight.weight,
            client,
            city,
            savedFreight.value
        )
    }

    async findByClient(clientId: string): Promise<Freight[]> {
        const client = await this.clientRepository.findById(clientId)
        if (!client) throw new Error("Client not found")

        const freightsByClient = await this.db
            .select()
            .from(freights)
            .where(eq(freights.clientId, clientId))

        return Promise.all(
            freightsByClient.map(async (freight) => {
                const city = await this.cityRepository.findById(freight.cityId)
                if (!city) throw new Error("City not found")

                return Freight.rehydrate(
                    freight.id,
                    freight.description,
                    freight.weight,
                    client,
                    city,
                    freight.value
                )
            })
        )
    }
}