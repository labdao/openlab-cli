import { Command } from '@oclif/core'
import { globalFlags } from '../../utils/cliux'
import { checkErc20Balance, checkMaticBalance, login } from '../../utils/wallet'

export default class AccountBalance extends Command {
  static aliases: string[] = ['wallet:balance']
  static description = 'Get the balance of your local ETH wallet'
  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    password: globalFlags.password
  }

  static args = [{
    name: 'tokenSymbol',
    description: 'symbol of the ERC20 token',
    default: 'USD'
  }]

  public async run(): Promise<void> {
    const {
      args, flags
    } = await this.parse(AccountBalance)

    const account = await login(flags.password)
    const erc20Balance = await checkErc20Balance(account.address)
    const maticBalance = await checkMaticBalance(account.address)
    this.log(`MATIC balance: ${maticBalance}`)
    this.log(`${args.tokenSymbol} balance: ${erc20Balance}`)
  }
}
