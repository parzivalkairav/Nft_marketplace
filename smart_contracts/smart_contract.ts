pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTMarketplace is ERC721 {
    using SafeMath for uint256;

    uint256 public tokenCounter;

    mapping(uint256 => uint256) public tokenIdToPrice;
    mapping(address => mapping(uint256 => bool)) public ownerToApproved;

    constructor() public ERC721("NFT Marketplace", "NFTM") {
        tokenCounter = 0;
    }

    function createNFT(string memory _tokenURI, uint256 _price) public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        tokenIdToPrice[newTokenId] = _price;
        tokenCounter = tokenCounter.add(1);
        return newTokenId;
    }

    function buyNFT(uint256 _tokenId) public payable {
        require(tokenIdToPrice[_tokenId] > 0, "Token does not exist");
        require(msg.value >= tokenIdToPrice[_tokenId], "Insufficient payment");

        address tokenOwner = ownerOf(_tokenId);
        require(tokenOwner != msg.sender, "You cannot buy your own token");

        _transfer(tokenOwner, msg.sender, _tokenId);
        tokenIdToPrice[_tokenId] = 0;
        payable(tokenOwner).transfer(msg.value);
    }

    function setTokenPrice(uint256 _tokenId, uint256 _price) public {
        require(_exists(_tokenId), "Token does not exist");
        require(ownerOf(_tokenId) == msg.sender, "You are not the token owner");

        tokenIdToPrice[_tokenId] = _price;
    }

    function approve(address _approved, uint256 _tokenId) public override {
        require(ownerOf(_tokenId) == msg.sender, "You are not the token owner");
        ownerToApproved[msg.sender][_tokenId] = true;
        emit Approval(msg.sender, _approved, _tokenId);
    }

    function isApproved(address _owner, uint256 _tokenId) public view returns (bool) {
        return ownerToApproved[_owner][_tokenId];
    }
}
