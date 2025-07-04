import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { FreightService } from '../../../../../application/services/freight/freights';
import { City } from "../../../../../domain/entities/city";
import { Client } from "../../../../../domain/entities/client";
import { Freight } from "../../../../../domain/entities/freight";
import { ICityRepository } from '../../../../../domain/repositories/citiy';
import { IClientRepository } from '../../../../../domain/repositories/client';
import { IFreightRepository } from "../../../../../domain/repositories/freight";
import { IFreightService } from '../../../../../domain/services/freights';
import { DrizzleClient } from "../../db";
import { cities, clients, freights } from "../../schema";
import { DrizzleCityRepository } from "../city/city";
import { DrizzleClientRepository } from "../client/client";
import { DrizzleFreightRepository } from "./freight";

describe('Freights Repository', () => {
    let repository: IFreightRepository
    let clientRepo: IClientRepository
    let cityRepo: ICityRepository
    let service: IFreightService
    let db: DrizzleClient

    beforeEach(async () => {
        db = drizzle(process.env.DB_FILE_NAME!)
        clientRepo = new DrizzleClientRepository(db)
        cityRepo = new DrizzleCityRepository(db)
        repository = new DrizzleFreightRepository(db, clientRepo, cityRepo)
        service = new FreightService()
        await db.delete(freights)
        await db.delete(clients)
        await db.delete(cities)
    })

    afterEach(async () => {
        await db.$client.close()
    })

    it('should save a freight in the db.', async () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const savedClient = await clientRepo.save(client)

        const city = new City('São Luís', 'MA', 2.0)
        const savedCity = await cityRepo.save(city)

        const freight = new Freight('Exemplo de descrição...', 10, client, city)
        freight.value = service.calculate({ weight: freight.weight, cityTax: city.tax })

        const savedFreight = await repository.save(freight, savedClient.id, savedCity.id)

        expect(savedFreight.id).toBeDefined()
        expect(savedFreight.description).toBe(freight.description)
        expect(savedFreight.weight).toBe(freight.weight);
        expect(savedFreight.value).toBe(freight.value);
    })

    it('should get freights by client and order by value.', async () => {
        const client = new Client('Adrian', 'Parque Athenas', '98955555555')
        const savedClient = await clientRepo.save(client)

        const city = new City('São Luís', 'MA', 2.0)
        const savedCity = await cityRepo.save(city)

        const freight1 = new Freight('Exemplo de descrição 1...', 10, client, city)
        const freight2 = new Freight('Exemplo de descrição 2...', 5, client, city)
        const freight3 = new Freight('Exemplo de descrição 3...', 20, client, city)
        const freight4 = new Freight('Exemplo de descrição 4...', 30, client, city)

        freight1.value = service.calculate({ weight: freight1.weight, cityTax: city.tax })
        freight2.value = service.calculate({ weight: freight2.weight, cityTax: city.tax })
        freight3.value = service.calculate({ weight: freight3.weight, cityTax: city.tax })
        freight4.value = service.calculate({ weight: freight4.weight, cityTax: city.tax })


        const savedFreight1 = await repository.save(freight1, savedClient.id, savedCity.id)
        const savedFreight2 = await repository.save(freight2, savedClient.id, savedCity.id)
        const savedFreight3 = await repository.save(freight3, savedClient.id, savedCity.id)
        const savedFreight4 = await repository.save(freight4, savedClient.id, savedCity.id)

        const freightsByClient = await repository.findByClient(savedClient.id)
        const freightsOrderedByValue = service.orderByValue(freightsByClient)

        const expectedFreightsList = ([
            savedFreight2,
            savedFreight1,
            savedFreight3,
            savedFreight4
        ])

        expect(freightsOrderedByValue).toStrictEqual(expectedFreightsList)
    })
})