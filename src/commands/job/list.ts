import { Command, CliUx, Flags } from '@oclif/core'
import constants from '../../constants'
import axios from 'axios'

const jobStatus = [
  'open',
  'active',
  'closed',
  'cancelled'
]

export default class JobList extends Command {
  static description = 'List jobs on lab-exchange'
  static flags = {
    latest: Flags.string({
      description: 'Number of latest jobs to list',
      default: '10',
      char: 'l',
      exclusive: ['all']
    }),
    status: Flags.string({
      description: 'Only list jobs with the given status',
      char: 's',
      options: jobStatus,
      required: false,
      default: 'open',
      exclusive: ['all']
    }),
    all: Flags.boolean({
      description: 'List all jobs',
      char: 'a',
      exclusive: ['latest']
    }),
    ...CliUx.ux.table.flags()
  }

  static args = []

  // Update when new subgraph is deployed
  static APIURL = constants.subgraphs.maticMumbai.exchange

  // Construct the job query with optional
  // filtering by job status
  private query(latest?: string, status?: string): string {
    const latestClause = latest ? `last:${latest}` : ''
    const whereClause = status ? `where: { status: ${status} }` : ''
    return `
    query {
        jobs(${latestClause} ${whereClause}) {
            id
            client
            provider
            jobCost
            jobURI
            openlabNFTURI
            payableToken
            status
        }
    }
    `
  }

  public async run(): Promise<void> {
    const {
      args, flags
    } = await this.parse(JobList)
    const status = jobStatus.indexOf(args.status)
    const query = this.query(`${status > -1 ? status : ''}`)
    try {
      const result = await axios.post(JobList.APIURL, { query })
      if (!result || !result.data || !result.data.data || !result.data.data.jobs) {
        console.log(result.data.errors)
        throw new Error('No jobs found')
      }
      const jobs = result.data.data.jobs
      this.logJobs(jobs, flags)
    } catch (e) {
      this.log('Error querying OpenLab graph:', e)
      this.error('Failed to connect to OpenLab graph')
    }
  }

  async logJobs(jobs: any[], flags: any) {
    const columns = Object.fromEntries(
      new Map(allUniqueKeys(jobs).map(k => [k, {}]))
    )
    CliUx.ux.table(
      jobs.map(j => { j.status = jobStatus[j.status] as any; return j }),
      columns,
      {
        maxWidth: 20,
        printLine: this.log.bind(this),
        ...flags
      }
    )
  }
}

function allUniqueKeys(objects: any[]): string[] {
  const keys = new Set<string>()
  objects.forEach(row => {
    Object.keys(row).forEach(key => keys.add(key))
  })
  return Array.from(keys)
}
