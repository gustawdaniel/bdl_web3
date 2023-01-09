import 'dotenv/config';
import hre from 'hardhat';
import ContractJson from '../artifacts/contracts/HelloWorld.sol/Token.json'

const abi = ContractJson.abi;

async function main() {
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

    const target = '0xf3c0278076003fa8f1f49eb026422d7c14fe9c04';

    console.log("init " + await C.balanceOf(target));
    const setTx1 = await C.transfer(target, 50);
    await setTx1.wait();

    console.log("end" + await C.balanceOf(target));

}


main().then(() => process.exit()).catch(console.error)
