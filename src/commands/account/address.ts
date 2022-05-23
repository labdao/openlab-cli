import { Command } from '@oclif/core'
import { loadKeystore } from '../../lib/wallet'

export default class AccountAddress extends Command {
  static description = 'Get the address of your local ETH wallet'
  static examples = [
      'openlab account address',
  ]
  public async run(): Promise<void> {
    const account = loadKeystore()
    this.log(`0x${account.address}`)
  }
}
