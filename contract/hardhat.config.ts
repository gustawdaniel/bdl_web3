import 'dotenv/config';

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { POLYGON_ALCHEMY_API_URL, METAMASK_PRIVATE_KEY } = process.env;

console.log("API_URL", POLYGON_ALCHEMY_API_URL);
console.log("PRIVATE_KEY", METAMASK_PRIVATE_KEY);

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: POLYGON_ALCHEMY_API_URL,
      accounts: [`0x${METAMASK_PRIVATE_KEY}`],
      chainId: 80001,

    },
  },
};

export default config;
