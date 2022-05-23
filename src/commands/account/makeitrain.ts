import { Command } from '@oclif/core'
import { checkErc20Balance, login, makeItRain } from '../../utils/wallet'
import Listr from 'listr'
import { globalFlags } from '../../utils/cliux'

export default class MakeItRain extends Command {
  static description = 'Mint test USD tokens to your local ETH wallet'

  static examples = [
    'openlab account makeitrain',
  ]

  static flags = {
    password: globalFlags.password(),
  }

  public async run(): Promise<void> {
    const {
      flags
    } = await this.parse(MakeItRain)
    const account = await login(flags.password)
    const list = new Listr([
      {
        title: 'Checking wallet',
        task: async () => {
          return `Wallet confirmed with address ${account.address}`
        }
      },
      {
        title: 'Mint test USD tokens',
        task: async (ctx, task) => {
          try {
            const res = await makeItRain(account.address)
          } catch (e) {
            task.skip('Minting failed: ' + (e as Error).message)
            return false
          }
          return 'Test tokens minted'
        }
      },
      {
        title: 'Check wallet balance',
        task: async (ctx, task) => {
          const erc20Balance = checkErc20Balance(account.address)
          return `USD balance: ${erc20Balance}`
        }
      }

    ], {})
    list.run()
  }
}
