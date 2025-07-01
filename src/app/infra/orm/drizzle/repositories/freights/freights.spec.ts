import 'dotenv/config'
import { expect, afterAll, beforeAll, beforeEach, describe, it } from "vitest";
import { Freight } from "../../../../../domain/entities/freight";
import { Client } from "../../../../../domain/entities/client";
import { City } from "../../../../../domain/entities/city";
import { IFreightsRepository } from "../../../../../domain/repositories/freights";
import { DrizzleFreightsRepository } from "./freights";
import { freights, cities, clients } from "../../schema";
import { DrizzleClientsRepository } from "../clients/clients";
import { DrizzleCitiesRepository } from "../cities/cities";
import { drizzle } from "drizzle-orm/libsql";
import { DrizzleClient } from "../../db";
import { FreightsService } from '../../../../../application/services/freight/freights';
import { IClientsRepository } from '../../../../../domain/repositories/clients';

describe('Freights Repository', () => {
    let repository: IFreightsRepository
    let clientsRepository: IClientsRepository
    let db: DrizzleClient

    beforeAll(() => {
        db = drizzle(process.env.DB_FILE_NAME!)
        clientsRepository = new DrizzleClientsRepository(db)
        repository = new DrizzleFreightsRepository(db, clientsRepository)
    })

    beforeEach(async () => {
        if (freights || clients || cities) {
            await db.delete(freights)
            await db.delete(clients)
            await db.delete(cities)
        }
    })

    afterAll(() => {
        db.$client.close()
    })

    it('should save a freight in the db.', async () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        await new DrizzleClientsRepository(db).save(client)

        const city = new City('São Luís', 'MA', 2.0)
        await new DrizzleCitiesRepository(db).save(city)

        const freight = new Freight('Exemplo de descrição...', 10, 50, client, city)
        const savedFreight = await repository.save(freight)

        expect(savedFreight.id).toBeDefined()
        expect(savedFreight.description).toBe(freight.description)
        expect(savedFreight.weight).toBe(freight.weight);
        expect(savedFreight.value).toBe(freight.value);
    })

    it('should get freights by client and order by value.', async () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const savedClient = await new DrizzleClientsRepository(db).save(client)

        const city = new City('São Luís', 'MA', 2.0)
        await new DrizzleCitiesRepository(db).save(city)

        const freight1 = new Freight('Exemplo de descrição 1...', 10, 50, client, city)
        const freight2 = new Freight('Exemplo de descrição 2...', 5, 30, client, city)
        const freight3 = new Freight('Exemplo de descrição 3...', 20, 100, client, city)
        const freight4 = new Freight('Exemplo de descrição 4...', 30, 200, client, city)

        const savedFreight1 = await repository.save(freight1)
        const savedFreight2 = await repository.save(freight2)
        const savedFreight3 = await repository.save(freight3)
        const savedFreight4 = await repository.save(freight4)

        const freightsByClient = await repository.findByClient(savedClient.id)
        const freightsService = new FreightsService()
        const freightsOrderedByValue = freightsService.orderByValue(freightsByClient)

        const expectedFreightsList = ([
            savedFreight2,
            savedFreight1,
            savedFreight3,
            savedFreight4
        ])

        expect(freightsOrderedByValue).toStrictEqual(expectedFreightsList)
    })
})