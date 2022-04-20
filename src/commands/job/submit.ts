import { CliUx, Command } from '@oclif/core'
import Web3 from 'web3'
import userConfig from '../../config'
import fs from 'fs'
import os from 'os'
import erc20Json from '../../abis/erc20.json'
import exchangeJson from '../../abis/exchange.json'
import { AbiItem } from 'web3-utils'

export default class ExchangeSubmitJob extends Command {
  static description = 'submit a new job to openlab exchange'

  static flags = {}

  static args = [
    { name: 'tokenSymbol', description: 'Path of file or directory to push', required: true },
    { name: 'jobCost', description: 'Cost to complete job', required: true },
    { name: 'jobURI', description: 'Input file URI', required: true },
  ]

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {
    const {
      args,
      flags
    } = await this.parse(ExchangeSubmitJob)
    const web3 = new Web3(userConfig.get('provider').maticMumbai)
    const baseDir = os.homedir() + '/.openlab'
    if (!fs.existsSync(baseDir + '/wallet.json')) {
      this.log("Wallet doesn't exist")
    }
    else {

      const erc20Symbol: string = args.tokenSymbol
      const exchangeAddress = userConfig.get('contracts').maticMumbai.exchange
      const token = userConfig.get('tokens')['maticMumbai'][erc20Symbol]
      const password = await CliUx.ux.prompt('Enter a password to decrypt your wallet', { type: 'hide' })
      const keystoreJsonV3 = JSON.parse(fs.readFileSync(baseDir + '/wallet.json', 'utf-8'))
      const account = web3.eth.accounts.decrypt(keystoreJsonV3, password)
      const client = account.address
      const jobCost = web3.utils.toWei(args.jobCost, 'ether')
      web3.eth.accounts.wallet.add(account)
      const erc20Contract = new web3.eth.Contract(erc20Json as AbiItem[], token)
      const allowance = await erc20Contract.methods.allowance(account.address, exchangeAddress).call()
      const allowanceBN = new (web3.utils as any).BN(allowance)
      const jobCostBN = new (web3.utils as any).BN(jobCost)
      const uint256Max = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
      if (allowanceBN.lt(jobCostBN)) {
        //approve tokens
        this.log(`Approving the exchange contract to spend your ${erc20Symbol} tokens...`)
        await erc20Contract.methods.approve(exchangeAddress, uint256Max).send({ 'from': account.address, 'gasLimit': 100000, 'gasPrice': web3.utils.toWei('30', 'gwei') })
        this.log("Approve Successful")
      }
      //call submitjob
      this.log(`Submitting Job...`)
      const exchangeContract = new web3.eth.Contract(exchangeJson as AbiItem[], exchangeAddress)
      const txHash = await exchangeContract.methods.submitJob(client, token, jobCost, args.jobURI).send({ 'from': account.address, 'gasLimit': 500000, 'gasPrice': web3.utils.toWei('30', 'gwei') })
      this.log(`Job Submitted Successfully`)
      this.log(`https://mumbai.polygonscan.com/tx/${txHash.transactionHash}`)
    }
  }
}
