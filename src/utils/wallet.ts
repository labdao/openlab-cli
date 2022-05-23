import fs from 'fs'
import os from 'os'
import path from 'path'

import { AbiItem, toBN } from 'web3-utils'
import axios from 'axios'
import { CliUx } from '@oclif/core'
import Web3 from 'web3'

import { getERC20Contract, getToken } from './exchange/contracts'
import constants from '../constants'
import testUSDtokenABI from '../abis/testusd.json'

const baseDir = path.join(os.homedir(), '.openlab')
const walletPath = path.join(baseDir, 'wallet.json')
const walletExists = fs.existsSync(walletPath)
const provider = constants.provider.alchemyMumbai
const web3 = new Web3(provider)

// Load local wallet, unlock it and return the account
export async function login(password?: string) {
  assertWalletExists()
  if (!password) {
    password = await CliUx.ux.prompt(
      'Enter wallet password',
      { type: 'hide' }
    )
  }
  const keystore = loadKeystore()
  const account = web3.eth.accounts.decrypt(keystore, password as string)
  web3.eth.accounts.wallet.add(account)
  return account
}

export function assertWalletExists() {
  if (!walletExists) {
    CliUx.ux.log('No wallet found!')
    CliUx.ux.log('You should create or add one by running:')
    CliUx.ux.log('> openlab account add')
    CliUx.ux.exit(1)
  }
}

export function loadKeystore() {
  assertWalletExists()
  const keystore = JSON.parse(fs.readFileSync(walletPath, 'utf-8'))
  return keystore
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
  password: string,
  privkey: string,
) {
  const account = web3.eth.accounts.privateKeyToAccount(privkey)
  const encryptedAccount = account.encrypt(password)

  fs.writeFileSync(
    walletPath,
    JSON.stringify(encryptedAccount)
  )
  return account
}

export async function removeWallet() {
  fs.unlinkSync(walletPath)
}

export async function drinkFromFaucet(address: string) {
  const res = await axios.post(
    "https://api.faucet.matic.network/transferTokens",
    {
      network: "mumbai",
      address: address,
      token: "maticToken"
    }
  )
  return res.data
}

// Get the MATIC balance of the wallet
export async function checkMaticBalance(address: string): Promise<string> {
  const res = await axios.get(
    'https://api-testnet.polygonscan.com/api?module=account&action=balance&address='
    + address
  )
  const rawBalance = parseInt(res.data.result)
  const balance = web3.utils.fromWei(`${rawBalance}`)
  return balance
}

// Mint 100 test USD tokens
export async function makeItRain(address: string): Promise<any> {
  const testusdContract = new web3.eth.Contract(
    testUSDtokenABI as AbiItem[],
    getToken()
  )
  const tx = await testusdContract.methods.mint().send(
    {
      from: address,
      gasLimit: 100000,
      gasPrice: web3.utils.toWei('30', 'gwei')
    }
  )
  return tx
}

// Check ERC20 token balance
export async function checkErc20Balance(address: string): Promise<string> {
  const erc20Contract = await getERC20Contract()
  const rawbalance = await erc20Contract.methods.balanceOf(
    address
  ).call()
  const erc20Balance = web3.utils.fromWei(rawbalance)
  return erc20Balance
}

export default {
  login,
  createWallet,
  importWallet,
  removeWallet,
  drinkFromFaucet,
  checkMaticBalance,
  makeItRain,
  checkErc20Balance,
}
