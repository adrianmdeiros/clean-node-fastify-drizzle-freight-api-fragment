import { ICitiesRepository } from "../../domain/repositories/cities";
import { IClientsRepository } from "../../domain/repositories/clients";
import { IFreightsRepository } from "../../domain/repositories/freights";
import { CreateFreightRequest, freightSchema } from "../../presentation/http/dtos/input/create-freight-request";
import { CreateFreightResponse } from "../../presentation/http/dtos/output/create-freight-response";
import { APIError } from "../../presentation/http/helpers/api-error";
import { FreightFactory } from "../factories/freight";

export class CreateClientUseCase {
    constructor(
        private readonly freightFactory: FreightFactory,
        private readonly freightRepository: IFreightsRepository,
        private readonly clientsRepository: IClientsRepository,
        private readonly cityRepository: ICitiesRepository
    ) { }

    async execute(dto: CreateFreightRequest): Promise<CreateFreightResponse> {
        const validFreight = freightSchema.parse(dto)
        const freightClient = await this.clientsRepository.findById(validFreight.clientId)

        if(!freightClient){
            throw new APIError(400, "This client doesn't exists. Please, check client id.")
        }
        
        const freightCity = await this.cityRepository.findById(validFreight.cityId)
        
        if(!freightCity){
            throw new APIError(400, "This city doesn't exists. Please, check city id.")
        }

        const freight = this.freightFactory.create({
            description: validFreight.description,
            weight: validFreight.weight,
            value: validFreight.value,
            client: freightClient,
            city: freightCity
        })
        const savedClient = await this.freightRepository.save(freight)
        return {
            id: savedClient.id,
            description: savedClient.description,
            weight: savedClient.weight,
            value: savedClient.value,
            clientId: savedClient.clientId,
            cityId: savedClient.cityId
        }
    }

}