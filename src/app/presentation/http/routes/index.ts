import { FastifyInstance } from "fastify";
import { freightRoutes } from "../controllers/freight/routes";

export async function routes(app: FastifyInstance) {
    app.register(freightRoutes, { prefix: '/api' })
}