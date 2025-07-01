import fastify from "fastify"
import { errorHandler } from "./app/presentation/http/middlewares/error-handler"

const server = fastify({
    logger: true
})

const PORT = parseInt(process.env.SERVER_PORT || '3000')

server.setErrorHandler(errorHandler)

server.get('/', async (request, reply) => {
    return 'Hello World!'
})

server.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1)
    }
    console.log(`Server is listening at ${address}...`);
})