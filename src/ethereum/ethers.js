import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import electionFact from '~/ethereum/artifacts/contracts/Election.sol/ElectionFact.json';
import election from '~/ethereum/artifacts/contracts/Election.sol/Election.json';


function Ethers() {
    const electionFactAddress = '0xD9948af91E8184328526f5EEe4cC889bBB1E26d6';
    let signerEth = null;
    let errorMessage = 'Failed !!!';
    return {
        async connectWallet() {
            if (typeof window === 'undefined' && typeof window.ethereum === 'undefined') {
                signerEth = null;
                errorMessage = 'No Ethereum wallet was detected!!!';
            } else {
                // console.log('MetaMask is installed!');
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                //check network is Goerli
                const chainId = await signer.getChainId();
                if (chainId === 5) {
                    signerEth = signer;
                    errorMessage = '';
                } else {
                    signerEth = null;
                    errorMessage = 'Please connect Metamask to Goerli network!!!';
                }
            }
        },
        getError() {
            return errorMessage;
        },
       
        getElectionContract(electionAddress) {
            const electionContract = new ethers.Contract(electionAddress, election.abi, signerEth);
            return electionContract;
        },
        getElectionFactContract() {
            const electionFactContract = new ethers.Contract(electionFactAddress, electionFact.abi, signerEth);
            return electionFactContract;
        },
    };
}

export default Ethers();
