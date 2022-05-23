import { CliUx, Command } from '@oclif/core'
import { refundJob } from '../../utils/exchange/contracts'
import Listr from 'listr'
import { login } from '../../utils/wallet'
import { globalFlags } from '../../utils/cliux'

export default class JobRefund extends Command {
  static description = 'Cancel an accepted job on lab-exchange and return funds'

  static flags = {
    password: globalFlags.password()
  }

  static args = [
    { name: 'jobId', description: 'ID of the job to cancel', required: true },
  ]
  static examples = [
    'openlab contract refund <jobID>',
  ]

  public async run(): Promise<void> {
    const {
      args, flags
    } = await this.parse(JobRefund)

    const account = await login(flags.password)

    const tasks = new Listr([
      {
        title: 'Confirm job refund',
        task: async () => true
      },
      {
        title: 'Refund job',
        task: async (ctx, task) => {
          task.title = 'Refunding job - waiting for contract response'
          ctx.tx = await refundJob(account, args.jobId)
          return `Job refunded. Transaction hash: ${ctx.tx}`
        }
      },
      {
        title: 'Get transaction details',
        task: async ctx => `https://mumbai.polygonscan.com/tx/${ctx.tx}`
      }
    ], {})

    const confirm = await CliUx.ux.confirm(
      'Are you sure you want to refund this job?'
    )
    if (confirm) tasks.run()
  }
}
