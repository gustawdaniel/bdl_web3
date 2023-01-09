import pJson from '../package.json'
import { getFastifyServer } from '../src/fastify'
import {expect} from "@jest/globals";

const correctVersion = { name: pJson.name, version: pJson.version }

describe('Version in available', () => {
  it('for GET request', async () => {
    const server = await getFastifyServer()
    const result = await server.inject({
      method: 'GET',
      path: '/',
    })

    expect(result.statusCode).toEqual(200)
    expect(result.headers['content-type']).toContain('application/json')
    expect(result.body).toEqual(JSON.stringify(correctVersion))
  })
})
