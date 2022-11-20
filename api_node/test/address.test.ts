import { getFastifyServer } from '../src/fastify'
import {seed} from "../src/storage/seed";
import {prisma} from "../src/storage/prisma";


describe('address is ok', () => {
  it('rest address', async () => {
    await seed();

    const server = await getFastifyServer()
    const result = await server.inject({
      method: 'GET',
      path: '/users/abc/nonce',
    })


    expect(result.statusCode).toEqual(404);
    expect(result.body).toEqual(JSON.stringify({
      statusCode: 404,
      error: "Not Found",
      message: "Not Found"
    }))
  })

  it('rest address positive', async () => {
    await prisma.users.upsert({
      where: {
        address: "abc"
      },
      create: {
        address: "abc",
        nonce: "secret"
      },
      update: {}
    })

    const server = await getFastifyServer()
    const result = await server.inject({
      method: 'GET',
      path: '/users/abc/nonce',
    })

    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual(JSON.stringify({
      nonce: 'secret'
    }))

  })
})
