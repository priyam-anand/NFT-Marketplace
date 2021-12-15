// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Marketplace {

    /*
        - this struct is used to store the details of the Items
     */
    struct NFT_Item {
        uint256 itemId;
        address itemContract;
        uint256 tokenId;
        address payable minter;
        address payable owner;
        uint256 price;
        bool listed;
    }

    /*
        State Variables
            - Current Item Id
            - Owner of the Marketplace
            - Commission per sale of NFT
     */
    uint256 public itemID;
    address payable private owner;
    uint256 private commission;

    /*
        mapping from ItemID to NFT_Item struct
    */
    mapping(uint256 => NFT_Item) private idToItem;

    /*
        constructor sets the owner of contract and the commission fees
     */
    constructor() {
        owner = payable(msg.sender);
        commission = 0.00025 ether;
        itemID = 1;
    }

    /*
        - this function returns the commission price for listing an nft on this market place
        - this commission goes to the owner of this marketplace
        - the commission is transfered to the owner when the listed nft is sold
     */
    function getCommission() public view returns (uint256) {
        return commission;
    }

    /*
        - this function creates an external nft as an item on the market place
        - for listing on the marketplace, the sender must pay the commission fees; the listing price should be greater than 0;
        the owner of the token can only list the token
        - intially the item is not listed for sale
        - the owner and minter of the token is set to msg.sender and it's price is set to 0

    */
    function createItem(address itemContract, uint256 tokenId)
        public
        payable
        TokenOwnerOnly(itemContract, tokenId)
    {
        require(
            msg.value == commission,
            "The sent price must be equal to commision"
        );

        idToItem[itemID] = NFT_Item(
            itemID,
            itemContract,
            tokenId,
            payable(msg.sender),
            payable(msg.sender),
            0,
            false
        );
        itemID++;
    }

    /*
        - function to list items that are not currently listed
        - first check : If Item with the given _itemId exist or not
        - second check : whether the current item's owner is the same as the msg.sender
        - third check : if the Item is already listed
        - fourth check : if the given price is greater than 0
        - if all the conditions are satisfied, change the listed value of the Item to true and set the price as specifed
     */
    function listItem(uint256 _itemId, uint256 price)
        public
        ItemExist(_itemId)
    {
        NFT_Item storage item = idToItem[_itemId];
        require(item.owner == msg.sender, "Only item owner can list");
        require(item.listed == false, "Item already listed");
        require(price > 0, "Price must be greater than 0");

        item.price = price;
        item.listed = true;
    }

    /*
        - this function is used to sell listed items on the marketplace
        - first check : if Item with given _itemId exist or not
        - second check : whether the item is listed on the marketplace or not
        - third check : if the buyer has sent enough money
        - if all conditions are true then transfer 99.5% amount to the owner of the item and 0.5% to the minter of the item
        - transfer the nft from the previous owner to the new onwer
        - change the owner and listing status of the item
     */
    function sellItem(address itemContract, uint256 _itemId)
        public
        payable
        ItemExist(_itemId)
    {
        NFT_Item storage item = idToItem[_itemId];

        require(item.listed == true, "Item is not listed on the market");

        uint256 price = item.price;
        require(msg.value == price, "Not enough value sent");

        uint256 ownerAmt = (995 * msg.value) / 1000;
        uint256 minterAmt = (5 * msg.value) / 1000;

        item.owner.transfer(ownerAmt);
        item.minter.transfer(minterAmt);

        uint256 tokenId = item.tokenId;

        ERC721(itemContract).transferFrom(item.owner, msg.sender, tokenId);

        item.owner = payable(msg.sender);
        item.listed = false;

        owner.transfer(commission);
    }

    /*
        - this function is used to get the items that are listed for sale in the marketplace
        - first find the number of such items
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if their listing status is true
        - return the struct array
    */
    function getMarketItems() public view returns (NFT_Item[] memory) {
        uint256 availiable = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].listed) {
                availiable++;
            }
        }

        NFT_Item[] memory items = new NFT_Item[](availiable);
        uint256 curr = 0;
        for (uint256 i = 0; i < itemID; i++) {
            if (!idToItem[i].listed) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }

    /*
        - this function returns all the items bought by the current user
        - iterater over all the NFT_Items and count the number of items which the user is the owner of but not the minter
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if given condition is true
        - return the struct array
     */
    function getBoughtItems() public view returns (NFT_Item[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (
                (idToItem[i].owner == msg.sender) &&
                (idToItem[i].minter != msg.sender)
            ) {
                count++;
            }
        }
        NFT_Item[] memory items = new NFT_Item[](count);
        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (
                (idToItem[i].owner == msg.sender) &&
                (idToItem[i].minter != msg.sender)
            ) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }

    /*
        - this function returns all the items that are created by the current user
        - iterater over all the NFT_Items and count the number of items which the user is the minter
        - then create an array of type NFT_Item of the given size
        - iterater over all the items and add them to the array if given condition is true
        - return the struct array
    */
    function getCreatedItems() public view returns (NFT_Item[] memory) {
        uint256 count = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].minter == msg.sender) {
                count++;
            }
        }
        NFT_Item[] memory items = new NFT_Item[](count);
        uint256 curr = 0;
        for (uint256 i = 1; i < itemID; i++) {
            if (idToItem[i].minter != msg.sender) {
                items[curr] = idToItem[i];
                curr++;
            }
        }
        return items;
    }

    /*
        Modifiers
     */
    modifier ItemExist(uint256 _itemId) {
        require(idToItem[_itemId].itemId != 0, "No such item exist");
        _;
    }

    modifier TokenOwnerOnly(address itemContract, uint256 tokenId) {
        require(
            ERC721(itemContract).ownerOf(tokenId) == msg.sender,
            "Can only add your own token"
        );
        _;
    }
}
