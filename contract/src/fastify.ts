import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { Version } from './routes/version'

export function getFastifyServer(): FastifyInstance {
    const app = fastify({})

    app.get('/', Version.root)

    return app
}
