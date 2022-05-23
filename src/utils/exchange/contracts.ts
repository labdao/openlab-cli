import { Account } from 'web3-core'
import { AbiItem, toBN } from 'web3-utils'
import Web3 from 'web3'

import wallet from '../wallet'

import constants from '../../constants'
import erc20ABI from '../../abis/erc20.json'
import exchangeABI from '../../abis/exchange.json'

const UINT256_MAX = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

const exchangeAddress = constants.contracts.maticMumbai.exchange
const provider = constants.provider.alchemyMumbai
const web3 = new Web3(provider)

// Submit a new job to the exchange contract
export async function submitJob(
  account: Account,
  jobCost: string,
  jobURI: string
) {
  const contract = getExchangeContract()
  const token = getToken()
  const jobCostWei = web3.utils.toWei(jobCost, 'gwei')

  try {
    const tx = await contract.methods.submitJob(
      account.address,
      token,
      jobCostWei,
      jobURI
    ).send(
      standardContractParams(account.address)
    )
    return tx
  } catch (e) {
    throw e
  }
}

// Accept the job contract and return the transaction hash
export async function acceptJob(account: Account, jobId: string) {
  const contract = getExchangeContract()
  const tx = await contract.methods.acceptJob(jobId).send(
    standardContractParams(account.address)
  )
  return tx
}

// Cancel the job and refund the client
export async function refundJob(account: Account, jobId: string) {
  const contract = getExchangeContract()
  const tx = await contract.methods.returnFunds(jobId).send(
    standardContractParams(account.address)
  )
  return tx
}

// Complete the job contract with the final token swap
// @param jobId - the job id to complete
// @param tokenURI - the token URI to swap
// @returns the transaction hash
export async function completeContract(
  account: Account,
  jobId: string,
  tokenURI: string,
) {
  const contract = getExchangeContract()

  const tx = await contract.methods.swap(
    jobId,
    tokenURI
  ).send(
    standardContractParams(account.address)
  )

  return tx
}

function standardContractParams(address: string) {
  return {
    from: address,
    gasLimit: 500000,
    gasPrice: web3.utils.toWei('30', 'gwei')
  }
}

export function getExchangeContract() {
  return new web3.eth.Contract(
    exchangeABI as AbiItem[], exchangeAddress
  )
}

export function getToken() {
  return constants.tokens.maticMumbai.USD
}

export async function getERC20Contract() {
  return new web3.eth.Contract(
    erc20ABI as AbiItem[],
    getToken()
  )
}

// Get the balance of the token in the exchange contract
export async function checkAllowance(jobCost: string, account?: Account) {
  if (!account) account = await wallet.login()
  const erc20Contract = await getERC20Contract()

  const allowance = await erc20Contract.methods.allowance(
    account.address,
    exchangeAddress
  ).call()

  const jobCostWei = web3.utils.toWei(
    jobCost, 'gwei'
  )
  if (toBN(allowance).gt(toBN(jobCostWei))) {
    return 'Allowance already sufficient'
  }

  const tx = await erc20Contract.methods.approve(
    exchangeAddress,
    UINT256_MAX
  ).send(
    standardContractParams(account.address)
  )
  return 'Exchange contract allowance approved: ' + tx.transactionHash
}

export default {
  submitJob,
  acceptJob,
  refundJob,
  completeContract,
  checkAllowance,
  getExchangeContract,
  getToken,
  getERC20Contract
}
