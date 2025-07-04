import { FastifyInstance } from "fastify";
import { FreightController } from "./freight";
import { CreateFreightUseCase } from "../../../../application/use-cases/create-freight";
import { FreightFactory } from "../../../../application/factories/freight";
import { DrizzleFreightRepository } from "../../../../infra/orm/drizzle/repositories/freight/freight";
import { FreightService } from "../../../../application/services/freight/freights";
import { DrizzleCityRepository } from "../../../../infra/orm/drizzle/repositories/city/city";
import { DrizzleClientRepository } from "../../../../infra/orm/drizzle/repositories/client/client";
import { db } from "../../../../infra/orm/drizzle/db";

export async function freightRoutes(app: FastifyInstance) {

    // Refatorar
    const factory = new FreightFactory()
    const clientRepo = new DrizzleClientRepository(db)
    const cityRepo = new DrizzleCityRepository(db)
    const freightRepo = new DrizzleFreightRepository(db, clientRepo, cityRepo)
    const service = new FreightService()

    const createFreightUseCase = new CreateFreightUseCase(
        factory,
        freightRepo,
        clientRepo,
        cityRepo,
        service
    )

    const controller = new FreightController(createFreightUseCase)

    app.post('/freights', controller.create.bind(controller))
    app.get('/freights', controller.read.bind(controller))
}