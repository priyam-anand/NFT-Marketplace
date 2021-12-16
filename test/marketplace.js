const Marketplace = artifacts.require("Marketplace");
const Item = artifacts.require("Item");
const { expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');


contract("Marketplace", function (accounts) {

  let marketplace;
  let item;

  beforeEach(async () => {
    marketplace = await Marketplace.new();
    item = await Item.new(marketplace.address);
  })

  it("should assert true", async function () {
    await Marketplace.deployed();
    assert.isTrue(true);
  });

  it("should get Item contract address", async () => {
    await Item.deployed();
    const address = Item.address;
    assert(address != 0);
  });

  it("should get Commission fee", async () => {
    const fee = web3.utils.toBN(await marketplace.getCommission());
    assert(fee.toNumber() === 250000000000000);
  });

  it("should create new ERC721 Token", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenID = (token.logs[2].args[0]).toNumber();
    assert(tokenID === 1);
  });

  it("should not create Item if not owner of token", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();

    expectRevert(
      marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[1] }),
      "Can only add your own token"
    )
  })

  it("should create Item", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();
    await marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[0] });

    const itemId = await marketplace.itemID();
    assert(itemId.toNumber() === 2);
  })

  it("should not list Item if not owner", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();
    await marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[0] });

    const itemId = await marketplace.itemID();
    expectRevert(
      marketplace.listItem(itemId.toNumber() - 1, 500, { from: accounts[1] }),
      "Only item owner can list"
    )
  });

  it("should list Item", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();
    await marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[0] });

    const itemId = await marketplace.itemID();
    await marketplace.listItem(itemId.toNumber() - 1, 500, { from: accounts[0] });
    assert(true);
  });

  it("should not sell if not listed", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();
    await marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[0] });

    const itemId = (await marketplace.itemID()).toNumber() - 1;

    expectRevert(
      marketplace.sellItem(item.address, itemId),
      "Item is not listed on the market"
    )
  });

  it("should sell item", async () => {
    const token = await item.createToken("https://sampleLink1.com");
    const tokenId = (token.logs[2].args[0]).toNumber();
    await marketplace.createItem(item.address, tokenId, { value: 250000000000000, from: accounts[0] });

    const itemId = (await marketplace.itemID()).toNumber() - 1;
    await marketplace.listItem(itemId, 500, { from: accounts[0] });

    const iniBal = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
    await marketplace.sellItem(item.address, itemId, { from: accounts[1], value: 500 });
    const finalBal = web3.utils.toBN(await web3.eth.getBalance(accounts[0]));
    const newOwner = await item.ownerOf(tokenId);
    const dif = (finalBal.sub(iniBal));
    assert(dif.toNumber() === 250000000000499 && newOwner.toLowerCase() === accounts[1].toLowerCase())
  });
});
