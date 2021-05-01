const Kenya = artifacts.require("Kenya")

module.exports = async function (callback) {
    kenya = await Kenya.deployed()
    accounts = await web3.eth.getAccounts()
    totalSupply = await kenya.totalSupply()
    console.log(`Total Supply: ${web3.utils.fromWei(totalSupply.toString())} $KENYA`)
    callback()
}