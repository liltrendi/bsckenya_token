const BSCKenya_Token = artifacts.require("BSCKenya_Token")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const bscKenyaToken = await BSCKenya_Token.deployed()
  const farmToken = await FarmToken.deployed()

  const transferAmount = "100";

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await bscKenyaToken.allowance(
    accounts[0],
    farmToken.address
  )

  console.log(
    "Amount of BSCKenya_Token FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to BSCKenya_Token (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of BSCKenya_Token on our behalf
  await bscKenyaToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of BSCKenya_Token on our behalf
  const allowanceAfter = await bscKenyaToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of BSCKenya_Token FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of BSCKenya_Token before and after the transfer
  balanceOfBscKenyaTokenBeforeAccounts0 = await bscKenyaToken.balanceOf(accounts[0])
  balanceOfBscKenyaTokenBeforeFarmToken = await bscKenyaToken.balanceOf(farmToken.address)
  console.log("*** BSCKenya_Token ***")
  console.log(
    "Balance BSCKenya_Token Before accounts[0] " +
      web3.utils.fromWei(balanceOfBscKenyaTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance BSCKenya_Token Before TokenFarm " +
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

  if(parseFloat(transferAmount) > parseFloat(web3.utils.fromWei(balanceFarmTokenBeforeAccounts0))){
    callback("Error")
    return;
  }

  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei(transferAmount, "ether"))
  console.log("*** BSCKenya_Token ***")
  balanceOfBscKenyaTokenAfterAccounts0 = await bscKenyaToken.balanceOf(accounts[0])
  balanceOfBscKenyaTokenAfterFarmToken = await bscKenyaToken.balanceOf(farmToken.address)
  console.log(
    "Balance BSCKenya_Token After accounts[0] " +
      web3.utils.fromWei(balanceOfBscKenyaTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance BSCKenya_Token After TokenFarm " +
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