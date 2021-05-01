const Kenya = artifacts.require("Kenya")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const kenya = await Kenya.deployed()
  const farmToken = await FarmToken.deployed()

  const withdrawalAmount = "100";

  // Verify accounts[0] and farmToken balance of Kenya before and after the transfer
  balanceOfKenyaBeforeAccounts0 = await kenya.balanceOf(accounts[0])
  balanceOfKenyaBeforeFarmToken = await kenya.balanceOf(farmToken.address)
  console.log("*** Kenya ***")
  console.log(
    "Balance Kenya Before accounts[0] " +
      web3.utils.fromWei(balanceOfKenyaBeforeAccounts0.toString())
  )
  console.log(
    "Balance Kenya Before TokenFarm " +
      web3.utils.fromWei(balanceOfKenyaBeforeFarmToken.toString())
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

  console.log("*** Kenya ***")
  balanceOfKenyaAfterAccounts0 = await kenya.balanceOf(accounts[0])
  balanceOfKenyaAfterFarmToken = await kenya.balanceOf(farmToken.address)
  console.log(
    "Balance Kenya After accounts[0] " +
      web3.utils.fromWei(balanceOfKenyaAfterAccounts0.toString())
  )
  console.log(
    "Balance Kenya After TokenFarm " +
      web3.utils.fromWei(balanceOfKenyaAfterFarmToken.toString())
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
