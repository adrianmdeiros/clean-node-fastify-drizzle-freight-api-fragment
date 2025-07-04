import { FastifyReply, FastifyRequest } from "fastify";
import { CreateFreightUseCase } from "../../../../application/use-cases/create-freight";
import { CreateFreightRequest } from "../../dtos/input/create-freight-request";

export class FreightController {
    constructor(
        private readonly createFreightUseCase: CreateFreightUseCase
    ) { }

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const createdFreight = await this.createFreightUseCase.execute(request.body as CreateFreightRequest)
            
            return reply.code(201).send(createdFreight)    
        } catch (error) {
            throw error
        }
    }
    // to-do
    async read(request: FastifyRequest, reply: FastifyReply){}

}