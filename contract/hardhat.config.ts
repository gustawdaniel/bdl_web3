import 'dotenv/config';

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { POLYGON_ALCHEMY_API_URL, METAMASK_PRIVATE_KEY, POLYGON_ALCHEMY_API_KEY, ETHER_SCAN_API_KEY } = process.env;

console.log("API_URL", POLYGON_ALCHEMY_API_URL);
console.log("PRIVATE_KEY", METAMASK_PRIVATE_KEY);

function defaultNetwork(): string {
  if(process.argv.includes('test')) {
    console.log("NETWORK hardhat");
    return 'hardhat';
  } else {
    console.log("NETWORK polygon_mumbai");
    return "polygon_mumbai";
  }
}

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: defaultNetwork(),
  paths: {
    tests: "./test/contract",
  },
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: '10000000000000000000000',
      },
    },
    polygon_mumbai: {
      url: POLYGON_ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
      chainId: 80001,
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: `${POLYGON_ALCHEMY_API_KEY}`
    }
  }
};

export default config;
