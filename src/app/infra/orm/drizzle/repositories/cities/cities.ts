import { nanoid } from "nanoid";
import { City } from "../../../../../domain/entities/city";
import { ICitiesRepository } from "../../../../../domain/repositories/cities";
import { DrizzleClient } from "../../db";
import { cities } from "../../schema";
import { eq } from "drizzle-orm";
import { CreateCityResponse } from "../../../../../presentation/http/dtos/output/create-city-response";

export class DrizzleCitiesRepository implements ICitiesRepository {
    constructor(
        private readonly db: DrizzleClient
    ) { }

    async save(city: City): Promise<City & { id: string; }> {
        const [savedCity] = await this.db.insert(cities).values({
            id: nanoid(),
            name: city.name,
            uf: city.uf,
            tax: city.tax
        }).returning()
        return savedCity
    }

    async findById(cityId: string): Promise<CreateCityResponse> {
        const [cityById] = await this.db
            .select()
            .from(cities)
            .where(eq(cities.id, cityId))
        return cityById
    }

    async findByName(name: string): Promise<City & { id: string; }> {
        const [cityByName] = await this.db
            .select()
            .from(cities)
            .where(eq(cities.name, name))
        return cityByName
    }
}