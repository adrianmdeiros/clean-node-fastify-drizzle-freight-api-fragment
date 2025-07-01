import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { beforeAll, describe, expect, it, beforeEach, afterAll } from 'vitest'
import { Client } from '../../../../../domain/entities/client'
import { IClientsRepository } from '../../../../../domain/repositories/clients'
import { DrizzleClient } from '../../db'
import { DrizzleClientsRepository } from './clients'
import { cities, clients, freights } from '../../schema'

describe('Clients Repository', () => {
    let repository: IClientsRepository
    let db: DrizzleClient

    beforeAll(async () => {
        db = drizzle(process.env.DB_FILE_NAME!)
        repository = new DrizzleClientsRepository(db)
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

    it('should save a client in the db.', async () => {
        const client = new Client(
            'Fulano',
            'Rua Fictícia, nº 1 - 65000000',
            '8955555555'
        )

        const savedClient = await repository.save(client)

        expect(savedClient.id).toBeDefined()
        expect(savedClient.name).toBe(client.name)
        expect(savedClient.address).toBe(client.address);
        expect(savedClient.phone).toBe(client.phone);
    })

    it('should find a client by his phone.', async () => {
        const client = new Client(
            'Fulano',
            'Rua Fictícia, nº 1 - 65000000',
            '8955555555'
        )

        const savedClient = await repository.save(client)

        const clientByPhone = await repository.findByPhone('8955555555')

        expect(clientByPhone).toStrictEqual(savedClient)
        expect(clientByPhone.phone).toBe(client.phone)
    })

})