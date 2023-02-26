# Applying blockchain in online voting system Project

Technology used: ReactJS, ExpressJS, MongoDB, Hardhat, Metamask, Alchemy.

***Backend:*** https://github.com/ngongochuyoky/back_end_voting_app
# The development plan 

Here is an idea of all the steps to build voting Dapp:
1.	Create a new Hardhat project.
2.	Design and implement the voting contract, according to the initial requirements.
3.	Compile and deploy contract on Hardhat networks.
4.	Write and execute unit tests for contract.
5.	Create a web UI that connects to the voting contract by reading the ABI and contract address from Hardhat output.
6.	Run the voting workflow through the web UI.
7.	Deploy the Dapp onto a public test network.

![image](https://user-images.githubusercontent.com/54812014/211144891-d75ce3d5-1a34-4e0f-8f04-a55c17eeb2b6.png)

#	System architecture

Describe the numbers on the diagram in detail:
1. Pushing data through the React Dapp.
2. Users will be able to view data on the blockchain and data from the backend.
3. Ethers.js allows us to interact with blockchain node through a http or ipc connection.
4. Metamask allows our front end Dapp to connect to the blockchain service.
5. Smart contracts are stored on a blockchain that are automatically executed when predetermined terms and conditions are met..
6. Data called from the blockchain is returned directly to the frontend Dapp.
7. Call the API to send or receive some data from the backend.
8. Express inserts and retrieves data from MonogoDB

![image](https://user-images.githubusercontent.com/54812014/211144765-147336a7-1546-4df2-bf88-78e91bdf04c3.png)

# Interaction between Blockchain and React

React is allows us to obtain the injected web3 in the browser from metamask, this allows us to get the contract and deployed network address. These variables will then allow us to create a local instance of the smart contract through the deployed network address and the ABI file. This then allows us to carry out functions and methods on the smart contract in the frontend allowing us to make calls and sends to the blockchain. The react frontend also interacts with the Node.js backend, which in turn interacts with MongoDB.

# Interaction between Backend and React

The Nodejs backend was used to connect to the MongoDB database. The backend handles the basic functions of creating new data, retrieving and editing voter data stored on the MongoDB database. Create new, retrieve user's account data, send email to user.

Demo: https://youtu.be/NG1hJ6M1agM

