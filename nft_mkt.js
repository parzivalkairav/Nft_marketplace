import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFTMarketplace from './contracts/NFTMarketplace.json';

const Marketplace = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [contract, setContract] = useState();
  const [selectedNft, setSelectedNft] = useState();

  useEffect(() => {
    loadNfts();
  }, []);

  const loadNfts = async () => {
    setLoading(true);
    const { ethereum } = window;
    if (ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_NFT_MARKETPLACE_CONTRACT_ADDRESS,
          NFTMarketplace.abi,
          signer
        );

        const nfts = await contract.getNFTs();
        setNfts(nfts);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      console.log('Please install MetaMask');
      setLoading(false);
    }
  };

  const handleNftSelect = (nft) => {
    setSelectedNft(nft);
  };

  const handleNftBuy = async () => {
    try {
      await contract.buyNFT(selectedNft.id, {
        value: selectedNft.price,
      });
      setSelectedNft(null);
      loadNfts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>NFT Marketplace</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>NFTs for sale</h2>
          <ul>
            {nfts.map((nft) => (
              <li key={nft.id}>
                <img src={nft.imageUri} alt={nft.name} />
                <p>{nft.name}</p>
                <p>Price: {nft.price} ETH</p>
                <button onClick={() => handleNftSelect(nft)}>Buy</button>
              </li>
            ))}
          </ul>
          {selectedNft && (
            <div>
              <h2>Buy {selectedNft.name}</h2>
              <p>Price: {selectedNft.price} ETH</p>
              <button onClick={handleNftBuy}>Confirm purchase</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
This React component uses the ethers.js library to interact with the NFT marketplace smart contract. It loads a list of NFTs from the contract using the getNFTs function and displays them in a list. When a user clicks the "Buy" button next to an NFT, it selects the NFT and displays a confirmation screen with the purchase price. When the user clicks the "Confirm purchase" button, it calls the buyNFT function on the smart contract, transferring ownership of






