import { CreateClientUseCase } from "../../../../application/use-cases/create-client";
import { CreateClientRequest } from "../../dtos/input/create-client-request";
import { CreateClientResponse } from "../../dtos/output/create-client-response";

export class ClientController {
    constructor(
        private readonly createClientUseCase: CreateClientUseCase
    ) { }

    async create(dto: CreateClientRequest): Promise<CreateClientResponse> {
        return await this.createClientUseCase.execute(dto)
    }
}