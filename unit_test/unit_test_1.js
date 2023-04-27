const { expect } = require('chai');
const sinon = require('sinon');
const NFTMarketplace = require('./NFTMarketplace');

describe('NFTMarketplace', () => {
  let nftMarketplace;

  before(() => {
    nftMarketplace = new NFTMarketplace();
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('createNFTSale', () => {
    it('should create a new NFT sale and emit a SaleCreated event', async () => {
      const tokenId = '0x123';
      const price = '1000000000000000000';
      const seller = '0x456';
      const eventSpy = sinon.spy();
      sinon.replace(nftMarketplace.contract.methods, 'createSale', sinon.fake.resolves({ send: sinon.fake.resolves({ events: { SaleCreated: { returnValues: { tokenId, price, seller } } } }) }));
      nftMarketplace.contract.events.SaleCreated({ fromBlock: 'latest' }).on('data', eventSpy);

      await nftMarketplace.createNFTSale(tokenId, price, { from: seller });

      expect(eventSpy.calledOnce).to.be.true;
      expect(eventSpy.firstCall.args[0].returnValues.tokenId).to.equal(tokenId);
      expect(eventSpy.firstCall.args[0].returnValues.price).to.equal(price);
      expect(eventSpy.firstCall.args[0].returnValues.seller).to.equal(seller);
    });

    it('should revert if the caller is not the owner of the NFT', async () => {
      const tokenId = '0x123';
      const price = '1000000000000000000';
      const seller = '0x456';
      sinon.replace(nftMarketplace.contract.methods, 'ownerOf', sinon.fake.resolves('0x789'));

      await expect(nftMarketplace.createNFTSale(tokenId, price, { from: seller })).to.be.revertedWith('NFTMarketplace: caller is not the owner of the NFT');
    });

    it('should revert if the NFT is already on sale', async () => {
      const tokenId = '0x123';
      const price = '1000000000000000000';
      const seller = '0x456';
      sinon.replace(nftMarketplace.contract.methods, 'ownerOf', sinon.fake.resolves(seller));
      sinon.replace(nftMarketplace.contract.methods, 'getSale', sinon.fake.resolves({ active: true }));

      await expect(nftMarketplace.createNFTSale(tokenId, price, { from: seller })).to.be.revertedWith('NFTMarketplace: NFT is already on sale');
    });
  });

  describe('buyNFT', () => {
    it('should buy an NFT and emit a SaleCompleted event', async () => {
      const tokenId = '0x123';
      const price = '1000000000000000000';
      const seller = '0x456';
      const buyer = '0x789';
      const eventSpy = sinon.spy();
      sinon.replace(nftMarketplace.contract.methods, 'buy', sinon.fake.resolves({ send: sinon.fake.resolves({ events: { SaleCompleted: { returnValues: { tokenId, price, seller, buyer } } } }) }));
      nftMarketplace.contract.events.SaleCompleted({ fromBlock: 'latest' }).on('data', eventSpy);

      await nftMarketplace.buyNFT(tokenId, { from: buyer, value: price });

      expect(eventSpy.calledOnce).to.be.true
