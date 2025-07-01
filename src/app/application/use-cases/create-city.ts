import { ICitiesRepository } from "../../domain/repositories/cities";
import { citySchema, CreateCityRequest } from "../../presentation/http/dtos/input/create-city-request";
import { CreateCityResponse } from "../../presentation/http/dtos/output/create-city-response";
import { CityFactory } from "../factories/city";

export class CreateCityUseCase {
    constructor(
        private readonly cityFactory: CityFactory,
        private readonly cityRepository: ICitiesRepository
    ) { }

    async execute(dto: CreateCityRequest): Promise<CreateCityResponse> {
        const validCity = citySchema.parse(dto)
        const city = this.cityFactory.create(validCity)
        const savedCity = await this.cityRepository.save(city)
        return {
            id: savedCity.id,
            name: savedCity.name,
            uf: savedCity.uf,
            tax: savedCity.tax
        }
    }
}