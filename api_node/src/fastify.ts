import fastify, {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify'
import {Version} from './routes/version'
import {getUser} from './auth/getUser'
import {JWTUser} from './interfaces/context'
import {User} from './routes/user'
import fastifySensible from '@fastify/sensible'
import {red, yellow} from 'cli-color'
import {isNativeError} from 'util/types'
import cors from '@fastify/cors'

declare module 'fastify' {
    interface FastifyRequest {
        user: JWTUser | null
    }
}

async function auth(request: FastifyRequest, reply: FastifyReply) {
    const token = (request.headers.authorization || '').replace(/Bearer\s+/, '') || undefined
    request.user = getUser(token)
    if (!request.user) reply.unauthorized()
}

export function getFastifyServer(): FastifyInstance {
    const app = fastify({})

    app.register(fastifySensible)
    app.register(cors)

    app.addHook('preSerialization', async (request, reply, payload) => {
        return JSON.parse(JSON.stringify(payload, (d, v) => (typeof v === 'bigint' ? Number(v) : v)))
    })

    app.addHook('onError', async (request, reply, error) => {
        if (process.env.NODE_ENV !== 'test') {
            console.log(red(error), yellow(String(error.stack).replace(`Error: ${error.message}`, '')))
        }


        if (isNativeError(error)) {
            return reply.internalServerError(error.message)
        }
        throw error
    })

    app.get('/me', {preValidation: [auth]}, User.root)
    app.post('/register', User.register)
    app.post('/login', User.login)
    app.get('/users/:address/nonce', User.getNonce)
    app.get('/', Version.root)

    return app
}
