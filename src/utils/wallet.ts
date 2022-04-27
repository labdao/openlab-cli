import Web3 from 'web3'
import fs from 'fs'
import os from 'os'
import path from 'path'
import userConfig from '../config'
import exchangeABI from '../abis/exchange.json'
import { CliUx } from '@oclif/core'
import { AbiItem } from 'web3-utils'

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
    throw new Error('No wallet found - you should create or add one using openlab wallet add')
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

// Accept the job contract and return the transaction hash
export async function acceptJob(jobId: string) {
  const account = await login()
  const contract = getExchangeContract()
  const tx = await contract.methods.acceptJob(jobId).send(
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
