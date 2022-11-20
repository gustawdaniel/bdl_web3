export {};

declare global {
    interface Window {
        ethereum: import('ethers').providers.ExternalProvider;
        web3: import('web3').default
    }
}
