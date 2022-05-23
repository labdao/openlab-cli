import { CliUx, Command, Flags } from '@oclif/core'
import { login } from '../../lib/wallet'
import { checkAllowance, submitJob } from '../../lib/exchange/contracts'
import { EstuaryAPI } from '../../lib/estuary'
import { globalFlags, getOrCreateCollection } from '../../lib/cliux'
import Listr from 'listr'
import { loadJobRequest } from '../../lib/job'

export default class JobSubmit extends Command {
  static description = 'Submit a new job to lab-exchange'

  static flags = {
    force: globalFlags.force,
    password: globalFlags.password,
    jobPrice: Flags.string({
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
    console.log(flags)

    const account = await login(flags.password as string)
    const ctx = {} as any
    const tasks = new Listr([
      {
        title: 'Confirm intent to submit job',
        task: async () => true,
      },
      {
        title: 'Validate job request',
        task: async (ctx, task) => {
          const jobRequest = await loadJobRequest(args.request)
          if (!jobRequest) {
            throw new Error('Invalid job request')
          } else if (!jobRequest.inputs) {
            throw new Error('Job request must contain inputs')
          } else if (!jobRequest.appname) {
            throw new Error('Job request must contain appname')
          }
          ctx.jobRequest = jobRequest
          return `Validated: ${jobRequest.appname}`
        },
      },
      {
        title: 'Add job request to lab-exchange file storage network',
        task: async (ctx, task) => {
          const collection = await getOrCreateCollection(account.address)
          const estuary = new EstuaryAPI()

          // upload job request object to IPFS
          const requestUpload = await estuary.uploadObject(
            ctx.jobRequest, 'job-request'
          )

          // upload metadata to IPFS
          ctx.requestMeta = {
            createdAt: Date.now(),
            requestedBy: account.address,
            request: '/ipfs/' + requestUpload.cid
          }
          const metaUpload = await estuary.uploadObject(
            ctx.requestMeta, 'job-request-meta'
          )
          ctx.metaUpload = metaUpload

          // add metadata to virtual file system
          const request = await estuary.pushJobRequest(
            collection.uuid,
            ctx.metaUpload,
          )
          ctx.requestCID = request.cid
          task.output = `Added job request to virtual file system: ${request.cid}`
          return true
        }
      },
      {
        title: 'Check allowance',
        task: async (ctx, task) => {
          task.title = 'Checking allowance - waiting for contract response'
          task.output = flags.jobPrice
          ctx.allowanceStatus = await checkAllowance(
            flags.jobPrice, account
          ).catch(
            (err) => {
              throw new Error(err)
            }
          )
          task.output = ctx.allowanceStatus
          return ctx.allowanceStatus
        }
      },
      {
        title: 'Submit job to exchange contract',
        task: async (ctx, task) => {
          ctx.tx = await submitJob(account, flags.jobPrice, ctx.requestCID)
          return `Job submitted successfully! Transaction hash: ${ctx.tx}`
        }
      }
    ], {})

    let confirm = true
    if (!flags.force) {
      confirm = await CliUx.ux.confirm(
        'Are you sure you want to submit this job?'
      )
    }
    tasks.run()
  }
}
