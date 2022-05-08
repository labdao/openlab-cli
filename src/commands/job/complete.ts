import { CliUx, Command } from '@oclif/core'
import { completeContract } from '../../utils/wallet'
import Listr from 'listr'

export default class JobComplete extends Command {
  static description = 'Complete a job'
  static flags = {}
  static args = [
    {
      name: 'jobId',
      description: 'ID of the job to complete',
      required: true
    },
    {
      name: 'tokenURI',
      description: 'URI of the token to swap',
      required: true
    }
  ]

  static examples = [
    'openlab job complete <jobID> <tokenURI>',
  ]

  public async run(): Promise<void> {
    const {
      args
    } = await this.parse(JobComplete)

    const tasks = new Listr([
      {
        title: 'Confirm job completion',
        task: async () => true
      },
      {
        title: 'Complete job',
        task: async (ctx, task) => {
          task.title = 'Completing job - waiting for contract response'
          ctx.tx = await completeContract(args.jobId, args.tokenURI)
          return `Job completed. Transaction hash: ${ctx.tx}`
        }
      },
      {
        title: 'Get transaction details',
        task: async ctx => `https://mumbai.polygonscan.com/tx/${ctx.tx}`
      }
    ], {})

    const confirm = await CliUx.ux.confirm(
      'Are you sure you want to complete this job?'
    )
    if (confirm) tasks.run()
  }
}
