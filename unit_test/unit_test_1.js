const request = require('supertest');
const { NFT } = require('./nft');
const app = require('./app');

describe('NFT API', () => {
  let nft;

  beforeEach(() => {
    // Create a new NFT for each test
    nft = new NFT('Test NFT', 'This is a test NFT', 'http://example.com/test.png', 100, 'test_owner');
  });

  describe('POST /nfts', () => {
    it('should create a new NFT', async () => {
      // Send a POST request to create a new NFT
      const response = await request(app)
        .post('/nfts')
        .send({
          name: 'Test NFT 2',
          description: 'This is another test NFT',
          image: 'http://example.com/test2.png',
          price: 200,
          owner: 'test_owner'
        })
        .expect(201);

      // Expect the response to contain the new NFT object
      expect(response.body).toMatchObject({
        name: 'Test NFT 2',
        description: 'This is another test NFT',
        image: 'http://example.com/test2.png',
        price: 200,
        owner: 'test_owner'
      });
    });
  });

  describe('GET /nfts', () => {
    it('should return all NFTs', async () => {
      // Add the test NFT to the array of NFTs
      const response = await request(app).get('/nfts').expect(200);
      expect(response.body).toEqual(expect.arrayContaining([nft]));
    });
  });

  describe('GET /nfts/:id', () => {
    it('should return a specific NFT', async () => {
      // Send a GET request to retrieve the test NFT
      const response = await request(app).get(`/nfts/${nft.id}`).expect(200);

      // Expect the response to contain the test NFT object
      expect(response.body).toMatchObject({
        name: 'Test NFT',
        description: 'This is a test NFT',
        image: 'http://example.com/test.png',
        price: 100,
        owner: 'test_owner'
      });
    });

    it('should return a 404 error if the NFT is not found', async () => {
      // Send a GET request with an invalid ID
      await request(app).get('/nfts/invalid_id').expect(404);
    });
  });

  describe('PUT /nfts/:id', () => {
    it('should update an existing NFT', async () => {
      // Send a PUT request to update the test NFT
      const response = await request(app)
        .put(`/nfts/${nft.id}`)
        .send({
          name: 'Updated Test NFT',
          description: 'This is an updated test NFT',
          image: 'http://example.com/updated_test.png',
          price: 200,
          owner: 'updated_owner'
        })
        .expect(200);

      // Expect the response to contain the updated NFT object
      expect(response.body).toMatchObject({
        name: 'Updated Test NFT',
        description: 'This is an updated test NFT',
        image: 'http://example.com/updated_test.png',
        price: 200,
        owner: 'updated_owner'
      });
    });

    it('should return a 404 error if the NFT is not found', async () => {
      // Send a
