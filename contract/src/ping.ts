import {redis, transactionsChannel} from "./storage/redis";

const targetWallet = '0xf3c0278076003fa8f1f49eb026422d7c14fe9c04';

async function main(): Promise<void> {
    const message = { value: 100, address: targetWallet };
    await redis.publish(transactionsChannel, JSON.stringify(message));
    await redis.disconnect();
}

main().catch(console.error)
