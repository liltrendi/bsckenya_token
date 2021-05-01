const Kenya = artifacts.require("Kenya")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Kenya)
  const kenya = await Kenya.deployed()
}