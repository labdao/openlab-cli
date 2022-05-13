import { Command, CliUx } from '@oclif/core'
import userConfig, { defaults } from '../../config'
import axios from 'axios'

const jobStatus = [
  'open',
  'active',
  'closed',
  'cancelled'
]

export default class JobList extends Command {
  static description = 'List jobs on the OpenLab exchange'
  static flags = {
    ...CliUx.ux.table.flags()
  }
  static args = [
    {
      name: 'status',
      description: 'Only list jobs with the given status',
      options: jobStatus,
      required: false
    },
  ]

  // Update when new subgraph is deployed
  static APIURL = defaults.subgraphs.maticMumbai.exchange

  // Construct the job query with optional
  // filtering by job status
  private query(status?: string): string {
    const whereClause = status ? `(where: { status: ${status} })` : ''
    return `
    query {
        jobs${whereClause} {
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
