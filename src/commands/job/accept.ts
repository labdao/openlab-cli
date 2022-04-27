import { CliUx, Command } from '@oclif/core'
import { acceptJob } from '../../utils/wallet'
import Listr from 'listr'

export default class JobAccept extends Command {
  static description = 'Accept a job'

  static flags = {}

  static args = [
    { name: 'jobId', description: 'ID of the job to accept', required: true },
  ]

  static examples = [
    'openlab job accept <jobID>',
  ]

  public async run(): Promise<void> {
    const {
      args
    } = await this.parse(JobAccept)

    const tasks = new Listr([
      {
        title: 'Confirm job acceptance',
        task: async () => true
      },
      {
        title: 'Accept job',
        task: async (ctx, task) => {
          task.title = 'Accepting job - waiting for contract response'
          ctx.tx = await acceptJob(args.jobId)
          return `Job accepted. Transaction hash: ${ctx.tx}`
        }
      },
      {
        title: 'Get transaction details',
        task: async ctx => `https://mumbai.polygonscan.com/tx/${ctx.tx}`
      }
    ], {})

    const confirm = await CliUx.ux.confirm(
      'Are you sure you want to accept this job?'
    )
    if (confirm) tasks.run()
  }
}
