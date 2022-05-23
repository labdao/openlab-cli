import { Command, CliUx, Flags } from '@oclif/core'
import constants from '../../constants'
import axios from 'axios'

const jobStatus = [
  'open',
  'active',
  'closed',
  'cancelled'
]

export default class JobInfo extends Command {
  static description = 'Get detail of a specific job on lab-exchange'
  static flags = {}

  static args = [
    {
      name: 'jobID',
      required: true,
      description: 'ID of the job to get info for'
    }
  ]

  // Update when new subgraph is deployed
  static APIURL = constants.subgraphs.maticMumbai.exchange

  // Construct the job query with optional
  // filtering by job status
  private query(jobId: string): string {
    return `
    query {
        job(id: "${jobId}") {
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
    } = await this.parse(JobInfo)
    const query = this.query(args.jobID)
    try {
      const result = await axios.post(JobInfo.APIURL, { query })
      if (!result || !result.data || !result.data.data) {
        this.log(result.data.errors)
        this.error('No job found')
      }
      const contractEntry = result.data.data.job
      contractEntry.status = jobStatus[contractEntry.status] as any
      const cid = contractEntry.jobURI.replace('ipfs://', '')
      const res = await axios.get(`https://ipfs.infura.io/ipfs/${cid}`)
      CliUx.ux.styledJSON(Object.assign(contractEntry, { data: res.data }))
      // this.logJobs(jobs, flags)
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
