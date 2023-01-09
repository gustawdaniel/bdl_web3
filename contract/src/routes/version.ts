import { FastifyRequest } from 'fastify'
import pJson from '../../package.json'

export class Version {
    static async root(req: FastifyRequest) {
        return {
            name: pJson.name,
            version: pJson.version,
        }
    }
}
