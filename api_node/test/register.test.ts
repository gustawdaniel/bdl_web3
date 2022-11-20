import { getFastifyServer } from '../src/fastify'
import {seed} from "../src/storage/seed";
import {prisma} from "../src/storage/prisma";
import {Response } from "light-my-request";


describe('user can register account', () => {
  it('first and second registration', async () => {
    await seed();

    async function registerUser(address: string): Promise<Response> {
      return server.inject({
        method: 'POST',
        path: '/register',
        payload: {
          'address': address
        }
      })
    }

    const server = await getFastifyServer()
    const result1 =await registerUser("abc")

    expect(result1.statusCode).toEqual(201);
    expect(result1.body).toEqual("");
    expect(result1.headers['content-type']).toEqual("text/plain; charset=utf-8");

    const result2 =await registerUser("abc")

    expect(result2.statusCode).toEqual(200);
    expect(result2.body).toEqual("");
  })
})
