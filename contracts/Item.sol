// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Item is ERC721URIStorage{

    uint private tokenId;
    address private contractAddress;

    constructor(address _contractAddress) ERC721("NFT Token", "NT")
    {
        contractAddress = _contractAddress;
        tokenId = 1;
    }

    function createToken(string memory _tokenURI) public returns(uint){
        
        _mint(msg.sender,tokenId);
        _setTokenURI(tokenId, _tokenURI);
        setApprovalForAll(contractAddress,true);
        tokenId++;

        return tokenId-1;
    }
}