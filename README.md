# NFT Marketplace

This is a decentralized NFT marketplace built on the Ethereum network. It allows users to buy, sell, and trade unique digital assets, such as art, music, and videos, using cryptocurrency.<br/>
# Features

<ul>
  <li>Create, read, update, and delete NFTs</li>
  <li>Buy and sell NFTs using Ether or other ERC-20 tokens</li>
  <li>Search for NFTs by name, description, or owner</li>
  <li>User authentication and authorization using MetaMask</li>
  <li>Smart contract written in Solidity</li>
  </li>
</ul>
# Technologies

<ul>
 <li>Frontend: React, Web3.js, MetaMask</li>
 <li>Backend: Node.js, Express, MongoDB, Mongoose, Ethereum</li></li>
 <li>Smart contract: Solidity, Truffle, Ganache</li>
 <li>Testing: Jest, Supertest</li>
</ul>
# Installation:

To run the project, you will need to have Node.js, MongoDB, and the Ganache CLI installed.
Clone the repository
Install dependencies for the frontend, backend, and smart contract:
cd frontend
npm install

cd ../backend
npm install

cd ../smart-contract
npm install

Start the Ganache CLI:
ganache-cli
Compile and migrate the smart contract:

<code>
cd smart-contract
truffle compile
truffle migrate</code>
Create a .env file in the backend folder with the following variables:
makefile
Copy code
PORT=<port_number>
MONGODB_URI=<mongodb_uri>
ETHERSCAN_API_KEY=<etherscan_api_key>
INFURA_PROJECT_ID=<infura_project_id>
INFURA_SECRET=<infura_secret>
CONTRACT_ADDRESS=<contract_address>
PORT: the port number for the server
MONGODB_URI: the URI for your MongoDB database
ETHERSCAN_API_KEY: an API key for Etherscan
INFURA_PROJECT_ID: a project ID for Infura
INFURA_SECRET: a secret key for Infura
CONTRACT_ADDRESS: the address of the smart contract on the Ethereum network
Start the frontend and backend servers:
bash
Copy code
cd frontend
npm start

cd ../backend
npm start
Open the app in your browser at http://localhost:3000
Usage
Connect to MetaMask to access your Ethereum wallet
Register or log in to create an account
Create an NFT by clicking the "Create NFT" button and filling out the form
Buy or sell an NFT by clicking the "Buy" or "Sell" button on an NFT card
Search for NFTs by entering a search term in the search bar
Edit or delete an NFT by clicking the "Edit" or "Delete" button on an NFT card
Log out by clicking the "Logout" button
Testing
To run the unit tests for the backend, run the following command in the backend folder:

bash
Copy code
npm test
This will run all the tests in the __tests__ folder using Jest and Supertest.

License
This project is licensed under the MIT License.
