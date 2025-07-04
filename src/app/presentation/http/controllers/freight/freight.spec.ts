import 'dotenv/config';
import { drizzle } from "drizzle-orm/libsql";
import fastify, { FastifyInstance } from 'fastify';
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { CityFactory } from '../../../../application/factories/city';
import { ClientFactory } from '../../../../application/factories/client';
import { CreateCityUseCase } from '../../../../application/use-cases/create-city';
import { CreateClientUseCase } from '../../../../application/use-cases/create-client';
import { DrizzleClient } from "../../../../infra/orm/drizzle/db";
import { DrizzleCityRepository } from '../../../../infra/orm/drizzle/repositories/city/city';
import { DrizzleClientRepository } from '../../../../infra/orm/drizzle/repositories/client/client';
import { cities, clients, freights } from '../../../../infra/orm/drizzle/schema';
import { errorHandler } from '../../middlewares/error-handler';
import { routes } from '../../routes';

describe('Freight Controller', () => {
    let db: DrizzleClient
    let app: FastifyInstance

    beforeEach(async () => {
        app = fastify()
        app.register(routes)
        app.setErrorHandler(errorHandler)

        db = drizzle(process.env.DB_FILE_NAME!)

        await db.delete(freights)
        await db.delete(clients)
        await db.delete(cities)
    })

    afterEach(async () => {
        await db.$client.close()
    })

    it('should create a freight.', async () => {
        const client = {
            name: 'Adrian',
            address: 'Estrada Velha do Calhau',
            phone: '98955555555'
        }

        const city = {
            name: 'São Luís',
            uf: 'MA',
            tax: 2.00
        }

        const savedClient = await new CreateClientUseCase(
            new ClientFactory(),
            new DrizzleClientRepository(db)
        ).execute(client)

        const savedCity = await new CreateCityUseCase(
            new CityFactory(),
            new DrizzleCityRepository(db)
        ).execute(city)

        const freight = {
            description: 'Exemplo de descrição...',
            weight: 5.00,
            clientId: savedClient.id,
            cityId: savedCity.id
        }

        const response = await app.inject({
            method: 'POST',
            url: '/api/freights',
            payload: freight
        })

        expect(response.statusCode).toBe(201)

        const data = response.json()
        expect(data.id).toBeDefined()
        expect(data.description).toBe(freight.description)
    })

    it('should get freights by client.', async () => {
        const client = {
            name: 'Adrian',
            address: 'Estrada Velha do Calhau',
            phone: '98955555555'
        }

        const city = {
            name: 'São Luís',
            uf: 'MA',
            tax: 2.00
        }

        const savedClient = await new CreateClientUseCase(
            new ClientFactory(),
            new DrizzleClientRepository(db)
        ).execute(client)

        const savedCity = await new CreateCityUseCase(
            new CityFactory(),
            new DrizzleCityRepository(db)
        ).execute(city)

        const freight = {
            description: 'Exemplo de descrição 1...',
            weight: 5.00,
            clientId: savedClient.id,
            cityId: savedCity.id
        }

        const freight2 = {
            description: 'Exemplo de descrição 2...',
            weight: 10.00,
            clientId: savedClient.id,
            cityId: savedCity.id
        }

        await app.inject({
            method: 'POST',
            url: '/api/freights',
            payload: freight
        })

        await app.inject({
            method: 'POST',
            url: '/api/freights',
            payload: freight2
        })

        const response3 = await app.inject({
            method: 'GET',
            url: '/api/freights'
        })

        expect(response3.statusCode).toBe(200)
        const data = response3.json()
        expect(data).toHaveLength(2)
        expect(data[0].client.id).toBe(savedClient.id)
    })
})