const BSCKenya_Token = artifacts.require("BSCKenya_Token")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const bscKenyaToken = await BSCKenya_Token.deployed()
  const farmToken = await FarmToken.deployed()

  const withdrawalAmount = "100";

  // Verify accounts[0] and farmToken balance of BSCKenya_Token before and after the transfer
  balanceOfBscKenyaTokenBeforeAccounts0 = await bscKenyaToken.balanceOf(accounts[0])
  balanceOfBscKenyaTokenBeforeFarmToken = await bscKenyaToken.balanceOf(farmToken.address)
  console.log("*** BSCKenya_Token ***")
  console.log(
    "Balance BscKenya_Token Before accounts[0] " +
      web3.utils.fromWei(balanceOfBscKenyaTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance BscKenya_Token Before TokenFarm " +
      web3.utils.fromWei(balanceOfBscKenyaTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  if(parseFloat(withdrawalAmount) > parseFloat(web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString()))){
    callback("Error")
    return;
  }

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei(withdrawalAmount, "ether"))

  console.log("*** BSCKenya_Token ***")
  balanceOfBscKenyaTokenAfterAccounts0 = await bscKenyaToken.balanceOf(accounts[0])
  balanceOfBscKenyaTokenAfterFarmToken = await bscKenyaToken.balanceOf(farmToken.address)
  console.log(
    "Balance BscKenya_Token After accounts[0] " +
      web3.utils.fromWei(balanceOfBscKenyaTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance BscKenya_Token After TokenFarm " +
      web3.utils.fromWei(balanceOfBscKenyaTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
