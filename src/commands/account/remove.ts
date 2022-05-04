import {CliUx, Command, Flags} from '@oclif/core'
import Web3 from 'web3'
import userConfig from '../../config'
import fs from 'fs'
import os from 'os'
import Listr from 'listr'
import { removeWallet } from '../../utils/wallet'

export default class AccountRemove extends Command {
    static description = 'remove an ethereum account'
    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ]
    public async run(): Promise<void> {

      const tasks = new Listr([
        {
          title: 'Confirm account removal',
          task: async () => true
        },
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
