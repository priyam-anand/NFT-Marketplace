const Marketplace = artifacts.require("Marketplace");
const Item = artifacts.require("Item");

module.exports = async function (_deployer) {

  await _deployer.deploy(Marketplace);
  const market = await Marketplace.deployed();
  console.log(market.address);
  await _deployer.deploy(Item, market.address);
  
};
