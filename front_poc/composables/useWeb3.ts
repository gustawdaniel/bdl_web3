import Web3 from 'web3';
import { Magic } from 'magic-sdk';
import { ConnectExtension } from '@magic-ext/connect';
import {EthNetworkConfiguration} from "@magic-sdk/types";


// web3.eth.getAccounts().then(accounts => console.log(accounts[0]));

export function getWeb3(source: 'magic' | undefined): Web3 {
    if(source === 'magic') {
        const customNodeOptions: EthNetworkConfiguration = {
            rpcUrl: 'https://rpc-mumbai.maticvigil.com',
            chainId: 80001,
        }

        const magic = new Magic('pk_live_5A70876BD3B6AEAF', {
            extensions: [new ConnectExtension()],
            network: customNodeOptions,
        });
        // @ts-ignore
        const web3 = new Web3(magic.rpcProvider);
        window.web3 = web3;
        return web3;
    }

    let currentWeb3;

    if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            window.ethereum.enable();
            window.web3 = currentWeb3;
            // Acccounts now exposed
            return currentWeb3;
        } catch (error) {
            // User denied account access...
            alert('Please allow access for the app to work');
            throw new Error('Non access to wallet!')
        }
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
        // Acccounts always exposed
        return window.web3;
    } else {
        throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
}
