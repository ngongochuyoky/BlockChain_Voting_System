import { ethers } from 'ethers';
import Cookies from 'js-cookie';
import electionFact from '~/ethereum/artifacts/contracts/Election.sol/ElectionFact.json';
import election from '~/ethereum/artifacts/contracts/Election.sol/Election.json';



function Dapp() {
    const electionFactAddress = '0x8362D958C1dd731397F7013579d162E73124b631';
    let signerEth = null;
    let errorMessage = '';
    console.log('da qua');
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
                const contract = new ethers.Contract(electionFactAddress, electionFact.abi, signerEth);
                try {
                    const summary = await contract.getDeployedElection(Cookies.get('company_email'));
                    console.log('address Election:',summary);
                    return summary;
                } catch (error) {
                    console.log(error.message);
                }
            } else return false;
        },
        async createElection(data) {
            if (signerEth) {
                const contract = new ethers.Contract(electionFactAddress, electionFact.abi, signerEth);
                try {
                    const bool = await contract.createElection(
                        Cookies.get('company_email'),
                        data.electionName,
                        data.electionDescription,
                    );
                    return bool;
                } catch (error) {
                    errorMessage = 'Create election failed';
                }
            } else return false;
        },
        async addPosition(positionName) {
            if (signerEth) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const position = await contract.addPosition(positionName);
                    return position;
                }    
                catch (error) {
                    errorMessage = 'New position creation failed!!!';
                }            
            }else return false;
        },
        async getNumOfCandidates() {
            if (signerEth) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const c = await contract.getNumOfCandidates();
                    return c;
                } catch (error) {
                    console.log(error.message);
                }
            }else return false;
        },
        async getCandidate(candidateID) {
            if (signerEth) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const candidate = await contract.getCandidate(candidateID);
                    return candidate;
                }catch (error) {
                    console.log(error.message);
                }
            }else return false;
        },
        async getPositions() {
            if(signerEth) {
                const contract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                try {
                    const positions = await contract.getPositions();
                    return positions
                }catch (error) {
                    console.log(error.message);
                }
            }else return false;
        },
        getError() {
            return errorMessage;
        },
      
        getElectionContract() {
            if(signerEth) {
                const electionContract = new ethers.Contract(Cookies.get('election_address'), election.abi, signerEth);
                return electionContract;
            }
        },
        getElectionFactContract() {
            if(signerEth) {
                const electionFactContract = new ethers.Contract(electionFactAddress, electionFact.abi, signerEth);
                return electionFactContract;
            }
        } 
        

    };
}

const dapp = Dapp();

export default dapp;
