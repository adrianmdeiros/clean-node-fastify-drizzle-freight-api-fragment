import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { APIError } from "../helpers/api-error";

export const errorHandler = function (
    err: FastifyError | Partial<APIError>,
    request: FastifyRequest,
    reply: FastifyReply
) {
    return err instanceof APIError ?
        reply.status(err.statusCode).send({
            name: err.name,
            message: err.message
        })
        :
        reply.status(500).send({
            name: err.name ?? 'Internal Server Error',
            message: 'Internal Server Error'
        })
}