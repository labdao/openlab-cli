import { Command, CliUx, Flags } from '@oclif/core'
import { jobList, JOB_STATUS } from '../../utils/exchange/graph'

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
      options: JOB_STATUS,
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

  public async run(): Promise<void> {
    const {
      args, flags
    } = await this.parse(JobList)
    try {
      const jobs = await jobList(flags.latest, flags.status)
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
     jobs,
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
