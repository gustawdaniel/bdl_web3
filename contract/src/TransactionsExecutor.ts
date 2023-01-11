import {redis, transactionsChannel} from "./storage/redis";
import {execSync} from "child_process";

export class TransactionsExecutor {
    constructor() {

    }

    async start() {
        await redis.subscribe(transactionsChannel)

        redis.on("message", (channel, message) => {
            switch (channel) {
                case transactionsChannel: {
                    console.log(JSON.parse(message));

                    const {address, value} = JSON.parse(message);

                    const cmd = `ADDRESS=${address} VALUE=${value} npx hardhat run src/transfer.ts --network polygon_mumbai`;

                    console.log(cmd);

                    const res = execSync(cmd);

                    console.log(res.toString());
                }
            }
        });
    }

    async stop() {
        return redis.disconnect();
    }
}
