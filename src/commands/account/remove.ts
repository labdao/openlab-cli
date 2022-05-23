import { CliUx, Command, Flags } from '@oclif/core'
import Listr from 'listr'
import { removeWallet } from '../../lib/wallet'

export default class AccountRemove extends Command {
  static aliases: string[] = ['wallet:remove']
  static description = 'Remove your local ETH wallet'
  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {

    const tasks = new Listr([
      {
        title: 'Confirm account removal',
        task: async () => true
      },
      // TODO: offer to back up the wallet to a specified location
      {
        title: 'Delete wallet',
        task: async (ctx, task) => {
          task.title = 'Deleting wallet'
          await removeWallet()
          return 'Wallet deleted - account successfully removed'
        }
      }
    ], {})

    const confirm = await CliUx.ux.confirm(
      'Are you sure you want to remove your account? This will delete your local wallet (y/n)'
    )
    if (confirm) tasks.run()
  }
}
