// npx hardhat run src/transfer.ts --network polygon_mumbai

import { getFastifyServer } from './fastify'

async function main() {
    const app = await getFastifyServer()
    await app.listen({ port: 4000, host: '0.0.0.0' })
    console.log(`Fastify listen on http://localhost:4000/`)
}

main().catch(console.error)
