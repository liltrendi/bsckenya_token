const BSCKenya_Token = artifacts.require("BSCKenya_Token")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(BSCKenya_Token)
  const bscKenyaToken = await BSCKenya_Token.deployed()

  await deployer.deploy(FarmToken, bscKenyaToken.address)
  const farmToken = await FarmToken.deployed()
}