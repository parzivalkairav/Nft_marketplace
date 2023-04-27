// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { NFT } = require('./nft');

// Create an instance of the express application
const app = express();

// Set up body-parser middleware to parse JSON data
app.use(bodyParser.json());

// Create an array to store NFTs
let nfts = [];

// Create a new NFT
app.post('/nfts', (req, res) => {
  // Create a new NFT object
  const nft = new NFT(req.body.name, req.body.description, req.body.image, req.body.price, req.body.owner);

  // Add the NFT to the array of NFTs
  nfts.push(nft);

  // Return the new NFT
  res.status(201).json(nft);
});

// Get all NFTs
app.get('/nfts', (req, res) => {
  res.status(200).json(nfts);
});

// Get a specific NFT by ID
app.get('/nfts/:id', (req, res) => {
  // Find the NFT with the specified ID
  const nft = nfts.find((nft) => nft.id === req.params.id);

  // If the NFT is found, return it. Otherwise, return a 404 error.
  if (nft) {
    res.status(200).json(nft);
  } else {
    res.status(404).send();
  }
});

// Update an existing NFT
app.put('/nfts/:id', (req, res) => {
  // Find the NFT with the specified ID
  const nftIndex = nfts.findIndex((nft) => nft.id === req.params.id);

  // If the NFT is found, update it. Otherwise, return a 404 error.
  if (nftIndex !== -1) {
    // Update the NFT object with the new values
    nfts[nftIndex].name = req.body.name;
    nfts[nftIndex].description = req.body.description;
    nfts[nftIndex].image = req.body.image;
    nfts[nftIndex].price = req.body.price;
    nfts[nftIndex].owner = req.body.owner;

    // Return the updated NFT
    res.status(200).json(nfts[nftIndex]);
  } else {
    res.status(404).send();
  }
});

// Delete an existing NFT
app.delete('/nfts/:id', (req, res) => {
  // Find the index of the NFT with the specified ID
  const nftIndex = nfts.findIndex((nft) => nft.id === req.params.id);

  // If the NFT is found, delete it. Otherwise, return a 404 error.
  if (nftIndex !== -1) {
    // Remove the NFT from the array of NFTs
    nfts.splice(nftIndex, 1);

    // Return a 204 status code (no content)
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
