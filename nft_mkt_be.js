const express = require('express');
const Web3 = require('web3');
const NFTMarketplaceABI = require('./abi/NFTMarketplaceABI.json');
const NFTABI = require('./abi/NFTABI.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const web3Provider = new Web3.providers.HttpProvider(process.env.PROVIDER_URL || 'http://localhost:8545');
const web3 = new Web3(web3Provider);

const marketplaceContractAddress = '0x...'; // Replace with your NFT Marketplace contract address
const marketplaceContract = new web3.eth.Contract(NFTMarketplaceABI, marketplaceContractAddress);

const nftContractAddress = '0x...'; // Replace with your NFT contract address
const nftContract = new web3.eth.Contract(NFTABI, nftContractAddress);

app.get('/nfts', async (req, res) => {
  try {
    const nfts = await marketplaceContract.methods.getNFTs().call();
    res.json(nfts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/nfts', async (req, res) => {
  const { name, description, imageUri, price } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();
    const nftId = await nftContract.methods.createNFT(name, description, imageUri).send({ from: accounts[0] });
    const nftPrice = web3.utils.toWei(price, 'ether');
    await marketplaceContract.methods.createNFTSale(nftId, nftPrice).send({ from: accounts[0] });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/nfts/:id/buy', async (req, res) => {
  const { id } = req.params;

  try {
    const accounts = await web3.eth.getAccounts();
    await marketplaceContract.methods.buyNFT(id).send({ from: accounts[0], value: req.body.value });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
