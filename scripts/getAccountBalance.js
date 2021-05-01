const Kenya = artifacts.require("Kenya")

module.exports = async function (callback) {
    kenya = await Kenya.deployed()
    accounts = await web3.eth.getAccounts()
    balance = await kenya.balanceOf(accounts[0])
    console.log(`Acc Balance: ${web3.utils.fromWei(balance.toString())} $KENYA`)
    callback()
}