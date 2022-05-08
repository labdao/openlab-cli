import { CliUx, Command } from '@oclif/core'
import { refundJob } from '../../utils/wallet'
import Listr from 'listr'

export default class JobRefund extends Command {
  static description = 'Cancel a job and return funds'
  static flags = {}
  static args = [
    { name: 'jobId', description: 'ID of the job to cancel', required: true },
  ]
  static examples = [
    'openlab contract refund <jobID>',
  ]

  public async run(): Promise<void> {
    const {
      args
    } = await this.parse(JobRefund)

    const tasks = new Listr([
      {
        title: 'Confirm job refund',
        task: async () => true
      },
      {
        title: 'Refund job',
        task: async (ctx, task) => {
          task.title = 'Refunding job - waiting for contract response'
          ctx.tx = await refundJob(args.jobId)
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
