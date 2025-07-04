import { ICityRepository } from "../../domain/repositories/citiy";
import { IClientRepository } from "../../domain/repositories/client";
import { IFreightRepository } from "../../domain/repositories/freight";
import { IFreightService } from "../../domain/services/freights";
import { CreateFreightRequest, freightSchema } from "../../presentation/http/dtos/input/create-freight-request";
import { CreateFreightResponse } from "../../presentation/http/dtos/output/create-freight-response";
import { APIError } from "../../presentation/http/helpers/api-error";
import { FreightFactory } from "../factories/freight";

export class CreateFreightUseCase {
    constructor(
        private readonly freightFactory: FreightFactory,
        private readonly freightRepository: IFreightRepository,
        private readonly clientsRepository: IClientRepository,
        private readonly cityRepository: ICityRepository,
        private readonly freightService: IFreightService
    ) { }

    async execute(dto: CreateFreightRequest): Promise<CreateFreightResponse> {
        const validFreight = freightSchema.parse(dto)

        const freightClient = await this.clientsRepository.findById(validFreight.clientId)

        if (!freightClient) {
            throw new APIError(400, "This client doesn't exists.")
        }

        const freightCity = await this.cityRepository.findById(validFreight.cityId)

        if (!freightCity) {
            throw new APIError(400, "This city doesn't exists.")
        }

        const freightValue = this.freightService.calculate({
            weight: validFreight.weight,
            cityTax: freightCity.tax
        })

        const freight = this.freightFactory.create({
            description: validFreight.description,
            weight: validFreight.weight,
            client: freightClient,
            city: freightCity,
            value: freightValue
        })

        const savedFreight = await this.freightRepository.save(freight, freightClient.id, freightCity.id)

        return {
            id: savedFreight.id,
            description: savedFreight.description,
            weight: savedFreight.weight,
            value: savedFreight.value,
            clientId: savedFreight.client.id,
            cityId: savedFreight.city.id
        }
    }

}