const Kenya = artifacts.require("Kenya")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const kenya = await Kenya.deployed()
  const farmToken = await FarmToken.deployed()

  const transferAmount = "100";

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await kenya.allowance(
    accounts[0],
    farmToken.address
  )

  console.log(
    "Amount of Kenya FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to Kenya (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of Kenya on our behalf
  await kenya.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of Kenya on our behalf
  const allowanceAfter = await kenya.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of Kenya FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

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

  if(parseFloat(transferAmount) > parseFloat(web3.utils.fromWei(balanceFarmTokenBeforeAccounts0))){
    callback("Error")
    return;
  }

  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei(transferAmount, "ether"))
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