import Web3 from 'web3';

export function getWeb3(): Web3 {
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
