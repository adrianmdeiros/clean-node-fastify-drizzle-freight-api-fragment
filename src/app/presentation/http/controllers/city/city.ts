import { CreateCityUseCase } from "../../../../application/use-cases/create-city";
import { CreateCityRequest } from "../../dtos/input/create-city-request";
import { CreateCityResponse } from "../../dtos/output/create-city-response";

export class CityController {
    constructor(
        private readonly createCityUseCase: CreateCityUseCase
    ) { }

    async create(dto: CreateCityRequest): Promise<CreateCityResponse> {
        return this.createCityUseCase.execute(dto)
    }
}