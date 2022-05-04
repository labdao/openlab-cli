import fs from 'fs'
import os from 'os'
import path from 'path'

import { AbiItem, toBN } from 'web3-utils'
import { CliUx } from '@oclif/core'
import Web3 from 'web3'

import userConfig from '../config'
import erc20ABI from '../abis/erc20.json'
import exchangeABI from '../abis/exchange.json'

const UINT256_MAX = `${2**256-1}`

const baseDir = path.join(os.homedir(), '.openlab')
const walletPath = path.join(baseDir, 'wallet.json')
const walletExists = fs.existsSync(walletPath)
const exchangeAddress = userConfig.get('contracts').maticMumbai.exchange
const provider = userConfig.get('provider').maticMumbai
const web3 = new Web3(provider)

let keystore

// Load local wallet, unlock it and return the account
export async function login() {
  if (!walletExists) {
    throw new Error('No wallet found - you should create or add one using openlab account add')
  }
  const password = await CliUx.ux.prompt(
    'Enter a password to decrypt your wallet',
    { type: 'hide' }
  )
  keystore = JSON.parse(fs.readFileSync(walletPath, 'utf-8'))
  const account = web3.eth.accounts.decrypt(keystore, password)
  web3.eth.accounts.wallet.add(account)
  return account
}

export async function createWallet(
  password: string,
) {
  const account = web3.eth.accounts.create()
  const encryptedAccount = web3.eth.accounts.encrypt(
    account.privateKey,
    password
  )
  fs.writeFileSync(
    walletPath,
    JSON.stringify(encryptedAccount)
  )
  return account
}

export async function importWallet(
  privkey: string,
  password: string
) {
  const account = web3.eth.accounts.privateKeyToAccount(privkey)
  const encryptedAccount = web3.eth.accounts.encrypt(
    account.privateKey,
    password
  )
  fs.writeFileSync(
    walletPath,
    JSON.stringify(encryptedAccount)
  )
  return account
}

export async function removeWallet() {
  fs.unlinkSync(walletPath)
}

// Submit a new job to the exchange contract
export async function submitJob(
  tokenName: string,
  jobCost: string,
  jobURI: string
) {
  const account = await login()
  const contract = getExchangeContract()
  const token = getToken(tokenName)
  const jobCostWei = web3.utils.toWei(jobCost, 'ether')

  const tx = await contract.methods.submitJob(
    account.address,
    token,
    jobCostWei,
    jobURI
  ).send(
    standardContractParams(account)
  )
  return tx
}

// Accept the job contract and return the transaction hash
export async function acceptJob(jobId: string) {
  const account = await login()
  const contract = getExchangeContract()
  const tx = await contract.methods.acceptJob(jobId).send(
    standardContractParams(account)
  )
  return tx
}

// Cancel the job and refund the client
export async function refundJob(jobId: string) {
  const account = await login()
  const contract = getExchangeContract()
  const tx = await contract.methods.returnFunds(jobId).send(
    standardContractParams(account)
  )
  return tx
}

// Complete the job contract with the final token swap
// @param jobId - the job id to complete
// @param tokenURI - the token URI to swap
// @returns the transaction hash
export async function completeContract(
  jobId: string,
  tokenURI: string,
  account?: any,
  contract?: any
) {
  if (!account) {
    account = await login()
  }
  if (!contract) {
    contract = getExchangeContract()
  }

  const tx = await contract.methods.swap(
    jobId,
    tokenURI
  ).send(
    standardContractParams(account)
  )

  return tx
}

function standardContractParams(account: { address: any }) {
  return {
    from: account.address,
    gasLimit: 500000,
    gasPrice: web3.utils.toWei('30', 'gwei')
  }
}

function getExchangeContract() {
  return new web3.eth.Contract(
    exchangeABI as AbiItem[], exchangeAddress
  )
}

function getToken(tokenSymbol = 'USD') {
  return userConfig
    .get('tokens')['maticMumbai'][tokenSymbol]
}

async function getERC20Contract(tokenSymbol: string = 'USD') {
  return new web3.eth.Contract(
    erc20ABI as AbiItem[],
    getToken(tokenSymbol)
  )
}

// Get the balance of the token in the exchange contract
export async function checkAllowance(jobCost: string) {
  const account = await login()
  const erc20Contract = await getERC20Contract()

  const allowance = await erc20Contract.methods.allowance(
    account.address,
    exchangeAddress
  ).call()

  const jobCostWei = web3.utils.toWei(jobCost, 'ether')
  if (toBN(allowance).gt(toBN(jobCostWei))) {
    return 'Allowance already sufficient'
  }

  const tx = await erc20Contract.methods.approve(
    exchangeAddress,
    UINT256_MAX
  ).send(
    standardContractParams(account)
  )
  return 'Exchange contract allowance approved: ' + tx.transactionHash
}
