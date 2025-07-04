import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { City } from '../../../../../domain/entities/city'
import { ICityRepository } from '../../../../../domain/repositories/citiy'
import { DrizzleClient } from '../../db'
import { cities, clients, freights } from '../../schema'
import { DrizzleCityRepository } from './city'

describe('Cities Repository', () => {
    let repository: ICityRepository
    let db: DrizzleClient

    beforeEach(async () => {
        db = drizzle(process.env.DB_FILE_NAME!)
        repository = new DrizzleCityRepository(db)
        await db.delete(freights)
        await db.delete(clients)
        await db.delete(cities)
    })

    afterEach(async () => {
        await db.$client.close()
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