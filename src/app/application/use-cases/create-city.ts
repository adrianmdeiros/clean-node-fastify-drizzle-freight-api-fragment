import { ICityRepository } from "../../domain/repositories/citiy";
import { citySchema, CreateCityRequest } from "../../presentation/http/dtos/input/create-city-request";
import { CreateCityResponse } from "../../presentation/http/dtos/output/create-city-response";
import { CityFactory } from "../factories/city";

export class CreateCityUseCase {
    constructor(
        private readonly cityFactory: CityFactory,
        private readonly cityRepository: ICityRepository
    ) { }

    async execute(dto: CreateCityRequest): Promise<CreateCityResponse> {
        const validCity = citySchema.parse(dto)
        const city = this.cityFactory.create({
            name: validCity.name,
            uf: validCity.uf,
            tax: validCity.tax
        })
        const savedCity = await this.cityRepository.save(city)
        
        return {
            id: savedCity.id,
            name: savedCity.name,
            uf: savedCity.uf,
            tax: savedCity.tax
        }
    }
}