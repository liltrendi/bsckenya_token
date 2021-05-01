const Kenya = artifacts.require("Kenya")

module.exports = async function (callback) {
    const kenya = await Kenya.deployed()
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]

    const name = await kenya.name()
    const symbol = await kenya.symbol()
    const totalSupply = await kenya.totalSupply()
    const totalFees = await kenya.totalFees()
    const balance = await kenya.balanceOf(account)
    const isExcluded = await kenya.isExcluded(account)
    
    console.log(`Token Name:       ${name}`)
    console.log(`Token Symbol:     ${symbol}`)
    console.log(`Total Supply:     ${web3.utils.fromWei(totalSupply.toString())}`)
    console.log(`Total Fees:       ${web3.utils.fromWei(totalFees.toString())}`)
    console.log(`Account:          ${account}`)
    console.log(`Account Balance:  ${web3.utils.fromWei(balance.toString())}`)
    console.log(`Is Excluded:      ${isExcluded}`)
    callback()
}