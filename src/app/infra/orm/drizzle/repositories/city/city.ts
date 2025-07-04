import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { City } from "../../../../../domain/entities/city";
import { ICityRepository } from "../../../../../domain/repositories/citiy";
import { DrizzleClient } from "../../db";
import { cities } from "../../schema";

export class DrizzleCityRepository implements ICityRepository {
    constructor(
        private readonly db: DrizzleClient
    ) { }

    async save(city: City): Promise<City> {
        const [savedCity] = await this.db.insert(cities).values({
            id: nanoid(),
            name: city.name,
            uf: city.uf,
            tax: city.tax
        }).returning()

        return City.rehydrate(
            savedCity.id,
            savedCity.name,
            savedCity.uf,
            savedCity.tax
        )
    }

    async findById(cityId: string): Promise<City> {
        const [cityById] = await this.db
            .select()
            .from(cities)
            .where(eq(cities.id, cityId))

        return City.rehydrate(
            cityById.id,
            cityById.name,
            cityById.uf,
            cityById.tax
        )
    }

    async findByName(name: string): Promise<City> {
        const [cityByName] = await this.db
            .select()
            .from(cities)
            .where(eq(cities.name, name))

        return City.rehydrate(
            cityByName.id,
            cityByName.name,
            cityByName.uf,
            cityByName.tax
        )
    }
}