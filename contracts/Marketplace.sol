// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace {
    // struct for NFTs
    struct NFT_Item {
        uint256 itemId;
        address itemContract;
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool sold;
    }

    // event that is emitted when a new NFT is created
    event ItemCreated(
        uint256 indexed itemId,
        address indexed itemContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    // state variables
    uint256 private itemID;
    address payable private owner;
    uint256 private commission;

    // mapping from ItemID to NFT_Item struct
    mapping(uint256 => NFT_Item) private idToItem;

    constructor() {
        owner = payable(msg.sender);
        commission = 0.00025 ether;
    }

    // function to return commission for listing an nft
    function getCommission() public view returns (uint256) {
        return commission;
    }

    // create a new Item
    function createItem(
        address itemContract,
        uint256 tokenId,
        uint256 price
    ) public payable {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == commission,
            "The sent price must be equal to commision"
        );

        idToItem[itemID] = NFT_Item(
            itemID,
            itemContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        ERC721(itemContract).transferFrom(msg.sender, address(this), tokenId);

        emit ItemCreated(
            itemID,
            itemContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );

        itemID++;
    }

    // sell an Item
    function sellItem(address itemContract, uint256 _itemId) public payable {
        NFT_Item storage item = idToItem[_itemId];

        uint256 price = item.price;
        uint256 tokenId = item.tokenId;

        require(msg.value == price, "Not enough value sent");

        item.seller.transfer(msg.value);
        ERC721(itemContract).transferFrom(address(this), msg.sender, tokenId);

        item.owner = payable(msg.sender);
        item.sold = true;

        owner.transfer(commission);
    }

    // get all the items that are availiable at the market
    function getMarketItems() public view returns (NFT_Item[] memory) {
        uint256 availiable = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (!idToItem[i].sold) {
                availiable++;
            }
        }

        NFT_Item[] memory items = new NFT_Item[](availiable);
        uint256 curr = 0;
        for (uint256 i = 0; i < itemID; i++) {
            if (!idToItem[i].sold) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }

    // get all the items the user has bought
    function getBoughtItems() public view returns (NFT_Item[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].owner == msg.sender) {
                count++;
            }
        }
        NFT_Item[] memory items = new NFT_Item[](count);
        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].owner == msg.sender) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }

    // get all the items the user has created
    function getCreatedItems() public view returns (NFT_Item[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].seller == msg.sender) {
                count++;
            }
        }
        NFT_Item[] memory items = new NFT_Item[](count);
        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].seller == msg.sender) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }
}
