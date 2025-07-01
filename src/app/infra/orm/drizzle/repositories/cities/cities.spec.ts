import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { beforeAll, describe, expect, it, beforeEach, afterAll } from 'vitest'
import { ICitiesRepository } from '../../../../../domain/repositories/cities'
import { DrizzleClient } from '../../db'
import { DrizzleCitiesRepository } from './cities'
import { cities, clients, freights } from '../../schema'
import { City } from '../../../../../domain/entities/city'

describe('Cities Repository', () => {
    let repository: ICitiesRepository
    let db: DrizzleClient

    beforeAll(() => {
        db = drizzle(process.env.DB_FILE_NAME!)
        repository = new DrizzleCitiesRepository(db)
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


    it('should save a city in the db.', async () => {
        const city = new City('São Luís', 'MA', 10)

        const savedCity = await repository.save(city)

        expect(savedCity.id).toBeDefined()
        expect(savedCity.name).toBe(city.name)
        expect(savedCity.uf).toBe(city.uf);
        expect(savedCity.tax).toBe(city.tax);
    })

    it('should find a city by name.', async () => {
        const city = new City('São Luís', 'MA', 10)

        const savedCity = await repository.save(city)

        const cityByName = await repository.findByName('São Luís')

        expect(cityByName.name).toStrictEqual(savedCity.name)
    })

})