import { CliUx, Command, Flags } from '@oclif/core'
import { login } from '../../utils/wallet'
import { checkAllowance, submitJob } from '../../utils/exchange/contracts'
import { EstuaryAPI } from '../../utils/estuary'
import { flags, getOrCreateCollection } from '../../utils/cliux'
import Listr from 'listr'

const force = flags.force()
const password = flags.password()

export default class JobSubmit extends Command {
  static description = 'Submit a new job to lab-exchange'

  static flags = {
    force, password,
    price: Flags.string({
      name: 'price',
      description: 'Price you will pay for the job (in gwei). If not specified, the default price will be used.',
      default: '10000'
    }),
  }

  static args = [
    {
      name: 'request',
      description: 'Job request JSON file (local path, IPFS path, or IPFS CID)',
      required: true
    },
  ]

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {
    const {
      args,
      flags
    } = await this.parse(JobSubmit)

    const account = await login()

    const tasks = new Listr([
      {
        title: 'Confirm intent to submit job',
        task: async () => true
      },
      {
        title: 'Add job request to lab-exchange file storage network',
        task: async (ctx, task) => {
          const collection = await getOrCreateCollection(account.address)
          const estuary = new EstuaryAPI()
          const request = await estuary.pushJobRequest(
            collection.uuid,
            args.request
          )
          ctx.requestCID = request.cid
          return true
        }
      },
      {
        title: 'Check allowance',
        task: async (ctx, task) => {
          task.title = 'Checking allowance - waiting for contract response'
          ctx.allowanceStatus = await checkAllowance(args.price, account)
          return ctx.allowanceStatus
        }
      },
      {
        title: 'Submit job to exchange contract',
        task: async (ctx, task) => {
          ctx.tx = await submitJob(account, args.price, ctx.requestCID)
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
