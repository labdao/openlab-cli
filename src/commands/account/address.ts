import { Command } from '@oclif/core'
import { login } from '../../utils/wallet'

export default class AccountAddress extends Command {
    static description = 'Get the address of your local wallet'
    static examples = [
        'openlab account address',
    ]
    public async run(): Promise<void> {
      const account = await login()
      this.log(account.address)
    }
}
