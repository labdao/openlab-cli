import { Command, CliUx, Flags } from '@oclif/core'
import constants from '../../constants'
import axios from 'axios'
import { jobInfo } from '../../utils/exchange/graph'

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

  public async run(): Promise<void> {
    const {
      args, flags
    } = await this.parse(JobInfo)
    try {
      const jobdata = await jobInfo(args.jobID)
      CliUx.ux.styledJSON(jobdata)
    } catch (e) {
      this.log('Error querying OpenLab graph:', e)
      this.error('Failed to connect to OpenLab graph')
    }
  }
}
