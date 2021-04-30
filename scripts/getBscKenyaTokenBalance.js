const BSCKenya_Token = artifacts.require("BSCKenya_Token")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
    bscKenyaToken = await BSCKenya_Token.deployed()
    farmToken = await FarmToken.deployed()
    balance = await bscKenyaToken.balanceOf(farmToken.address)
    console.log(web3.utils.fromWei(balance.toString()))
    callback()
}