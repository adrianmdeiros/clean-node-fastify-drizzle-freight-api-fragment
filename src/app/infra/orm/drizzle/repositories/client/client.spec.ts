import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Client } from '../../../../../domain/entities/client'
import { IClientRepository } from '../../../../../domain/repositories/client'
import { DrizzleClient } from '../../db'
import { cities, clients, freights } from '../../schema'
import { DrizzleClientRepository } from './client'

describe('Clients Repository', () => {
    let repository: IClientRepository
    let db: DrizzleClient
    
    beforeEach(async () => {
        db = drizzle(process.env.DB_FILE_NAME!)
        repository = new DrizzleClientRepository(db)
        await db.delete(freights)
        await db.delete(clients)
        await db.delete(cities)
    })

    afterEach(async () => {
        await db.$client.close()
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