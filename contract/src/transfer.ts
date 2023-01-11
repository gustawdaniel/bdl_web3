import 'dotenv/config';
import hre from 'hardhat';
import ContractJson from '../artifacts/contracts/HelloWorld.sol/Token.json'

const abi = ContractJson.abi;

async function executeTransfer(target: string, value: number): Promise<void> {
    const al = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.POLYGON_ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(process.env.METAMASK_PRIVATE_KEY ?? '', al);

    const C = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS ?? '',
        abi,
        userWallet
    )


    console.log("init " + await C.balanceOf(target));
    const setTx1 = await C.transfer(target, value);
    await setTx1.wait();

    console.log("end" + await C.balanceOf(target));
}

async function main() {
    console.log("process.argv ADDRESS", process.env.ADDRESS);
    console.log("process.argv VALUE", process.env.VALUE);

    const target = process.env.ADDRESS ?? '0xf3c0278076003fa8f1f49eb026422d7c14fe9c04';
    const value = process.env.VALUE ? parseInt(process.env.VALUE) : 50;


    console.log("target, value", target, value);
    console.log("typeof target, value", typeof target, typeof value);

    await executeTransfer(target, value);
}


main().then(() => process.exit()).catch(console.error)
