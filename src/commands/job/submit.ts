import { CliUx, Command } from '@oclif/core'
import { checkAllowance, submitJob } from '../../utils/wallet'
import Listr from 'listr'

export default class JobSubmit extends Command {
  static description = 'Submit a new job to OpenLab'

  static flags = {}

  static args = [
    { name: 'jobCost', description: 'Cost to complete job', required: true },
    { name: 'jobURI', description: 'Input file URI', required: true },
  ]

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {
    const {
      args,
      flags
    } = await this.parse(JobSubmit)

    const tasks = new Listr([
      {
        title: 'Confirm job submission',
        task: async () => true
      },
      {
        title: 'Check allowance',
        task: async (ctx, task) => {
          task.title = 'Checking allowance - waiting for contract response'
          ctx.allowanceStatus = await checkAllowance(args.jobCost)
          return ctx.allowanceStatus
        }
      },
      {
        title: 'Submit job to exchange contract',
        task: async ctx => {
          ctx.tx = await submitJob(args.jobCost, args.jobURI)
          return `Job submitted successfully! Transaction hash: ${ctx.tx}`
        }
      }
    ], {})

    const confirm = await CliUx.ux.confirm(
      'Are you sure you want to submit this job?'
    )
    if (confirm) tasks.run()
  }
}
