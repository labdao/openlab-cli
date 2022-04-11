import {CliUx, Command, Flags} from '@oclif/core'
const axios = require('axios')

export default class ExchangeActiveJobs extends Command {

    // Update when new subgraph is deployed
    static APIURL = `https://api.thegraph.com/subgraphs/name/tohrnii/openlab-exchange-mumbai-c`

    static query = `
        query {
            jobs(where: {status: 1}) {
                id
                provider
            }
        }
    `

    public async run(): Promise<void> {
        const {
            args,
            flags,
        } = await this.parse(ExchangeActiveJobs)
        const result = await axios.post(
            ExchangeActiveJobs.APIURL, 
            {
                query: ExchangeActiveJobs.query
            }
        )
        const jobs = result.data.data.jobs
        if (jobs.length == 0) {
            this.log('NO ACTIVE JOBS')
        } else {
            this.log('ACTIVE JOBS...')
            for (let i=0; i<jobs.length; i++) {
                // Substring to remove '0x' prefix on job id
                this.log(`Job ID: ${jobs[i].id.substring(2)}`)
                this.log(`Provider: ${jobs[i].provider}`)
            }
        }
    }
}
