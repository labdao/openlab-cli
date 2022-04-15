import { CliUx, Command } from '@oclif/core'
import Web3 from 'web3'
import userConfig from '../../config'
import fs from 'fs'
import os from 'os'
import exchangeJson from '../../abis/exchange.json'
import { AbiItem } from 'web3-utils'

export default class ExchangeSwap extends Command {
  static description = 'swap'

  static flags = {}

  static args = [
    { name: 'jobId', description: 'ID of the job to complete', required: true },
    { name: 'tokenURI', description: 'tokenURI ', required: true }
  ]

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {
    const {
      args
    } = await this.parse(ExchangeSwap)
    const web3 = new Web3(userConfig.get('provider').maticMumbai)
    const baseDir = os.homedir() + '/.openlab'
    if (!fs.existsSync(baseDir + '/wallet.json')) {
      this.log("Wallet doesn't exist")
    }
    else {
      const exchangeAddress = userConfig.get('contracts').maticMumbai.exchange
      const password = await CliUx.ux.prompt('Enter a password to decrypt your wallet', { type: 'hide' })
      const keystoreJsonV3 = JSON.parse(fs.readFileSync(baseDir + '/wallet.json', 'utf-8'))
      const account = web3.eth.accounts.decrypt(keystoreJsonV3, password)
      web3.eth.accounts.wallet.add(account)

      this.log(`Swap...`)
      const exchangeContract = new web3.eth.Contract(exchangeJson as AbiItem[], exchangeAddress)
      const txHash = await exchangeContract.methods.swap(args.jobId, args.tokenURI).send({ 'from': account.address, 'gasLimit': 500000, 'gasPrice': web3.utils.toWei('30', 'gwei') })
      this.log(`Swap Successful`)
      this.log(`https://mumbai.polygonscan.com/tx/${txHash.transactionHash}`)
    }
  }
}
