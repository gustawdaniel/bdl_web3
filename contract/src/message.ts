import 'dotenv/config';
import hre from 'hardhat';
import ContractJson from '../artifacts/contracts/HelloWorld.sol/HelloWorld.json'

const abi = ContractJson.abi;

async function main() {
    const al = new hre.ethers.providers.AlchemyProvider(
        'maticmum',
        process.env.POLYGON_ALCHEMY_API_KEY
    );

    const userWallet = new hre.ethers.Wallet(process.env.METAMASK_PRIVATE_KEY ?? '', al);

    const Mess = new hre.ethers.Contract(
        process.env.CONTRACT_ADDRESS ?? '',
        abi,
        userWallet
    )

    console.log("init " + await Mess.message());
    const setTx1 = await Mess.update("hi codebuddy it is dish for you with id: " + Math.random());
    await setTx1.wait();


    console.log("end" + await Mess.message());

}


main().then(() => process.exit()).catch(console.error)
