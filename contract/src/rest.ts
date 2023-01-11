// npx hardhat run src/transfer.ts --network polygon_mumbai
import { getFastifyServer } from './fastify'
import {TransactionsExecutor} from "./TransactionsExecutor";

async function main() {
    const app = await getFastifyServer()
    await app.listen({ port: 4000, host: '0.0.0.0' })
    const te = new TransactionsExecutor();
    await te.start();
    console.log(`Fastify listen on http://localhost:4000/`)
}

main().catch(console.error)
