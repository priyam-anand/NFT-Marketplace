const Marketplace = artifacts.require("Marketplace");
const Item = artifacts.require("Item");

contract("Marketplace", function (accounts) {
  it("should assert true", async function () {
    await Marketplace.deployed();
    return assert.isTrue(true);
  });



});
