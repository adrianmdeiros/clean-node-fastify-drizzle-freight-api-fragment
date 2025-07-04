import { IClientRepository } from "../../domain/repositories/client";
import { clientSchema, CreateClientRequest } from "../../presentation/http/dtos/input/create-client-request";
import { CreateClientResponse } from "../../presentation/http/dtos/output/create-client-response";
import { ClientFactory } from "../factories/client";

export class CreateClientUseCase {
    constructor(
        private readonly clientFactory: ClientFactory,
        private readonly clientRepository: IClientRepository
    ) { }

    async execute(dto: CreateClientRequest): Promise<CreateClientResponse> {
        const validClient = clientSchema.parse(dto)
        const client = this.clientFactory.create({
            name: validClient.name,
            address: validClient.address,
            phone: validClient.phone
        })
        const savedClient = await this.clientRepository.save(client)
        return {
            id: savedClient.id,
            name: savedClient.name,
            address: savedClient.address,
            phone: savedClient.phone
        }
    }

}