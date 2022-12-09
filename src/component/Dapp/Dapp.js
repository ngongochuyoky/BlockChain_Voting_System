import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import electionFact from '~/ethereum/artifacts/contracts/Election.sol/ElectionFact.json';
import election from '~/ethereum/artifacts/contracts/Election.sol/Election.json';

//Create candidate array
function createData(name, dateOfBirth, email, voteCount, description) {
    return {
        name,
        dateOfBirth,
        email,
        voteCount,
        description,
    };
}

function Dapp() {
    const FacecontractAddress = '0xC2636c2445e0F7f5a128E9f7285624742A936722';
    let signerEth = null;
    let errorMessage = '';
    return {
        async connectWallet() {
            if (typeof window === 'undefined' && typeof window.ethereum === 'undefined') {
                signerEth = null;
                errorMessage = 'No Ethereum wallet was detected!!!';
            } else {
                console.log('MetaMask is installed!');
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
        async getDeployedElection() {
            if (signerEth) {
                const contract = new ethers.Contract(FacecontractAddress, electionFact.abi, signerEth);
                try {
                    const summary = await contract.getDeployedElection(Cookies.get('company_email'));
                    return summary;
                } catch (error) {
                    console.log(error.Message);
                }
            } else return false;
        },
        async createElection(data) {
            if (signerEth) {
                const contract = new ethers.Contract(FacecontractAddress, electionFact.abi, signerEth);
                try {
                    const bool = await contract.createElection(
                        Cookies.get('company_email'),
                        data.electionName,
                        data.electionDescription,
                    );
                    return bool;
                } catch (error) {
                    console.log(error.Message);
                }
            } else return false;
        },
        async getNumOfCandidate() {
            if (signerEth) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const c = await contract.getNumOfCandidate();
                    return contract;
                } catch (error) {
                    console.log(error.Message);
                }
            }
        },
        async getCandidates() {
            const c = await this.getNumOfCandidate();
            if (c) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const candidates = [];
                    for (let i = 0; i < c; i++) {
                        let candidate = await contract.getCandidate(i);
                        console.log(candidate);
                    }
                } catch (error) {
                    console.log(error.Message);
                }
            }
            console.log('Khong co');
        },
        getError() {
            return errorMessage;
        },
    };
}

export default Dapp;
