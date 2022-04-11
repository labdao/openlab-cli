import {CliUx, Command, Flags} from '@oclif/core'
const axios = require('axios')

export default class ExchangeCancelledJobs extends Command {

    // Update when new subgraph is deployed
    static APIURL = `https://api.thegraph.com/subgraphs/name/tohrnii/openlab-exchange-mumbai-c`

    static query = `
        query {
            jobs(where: {status: 3}) {
                id
            }
        }
    `

    public async run(): Promise<void> {
        const {
            args,
            flags,
        } = await this.parse(ExchangeCancelledJobs)
        const result = await axios.post(
            ExchangeCancelledJobs.APIURL, 
            {
                query: ExchangeCancelledJobs.query
            }
        )
        const jobs = result.data.data.jobs
        if (jobs.length == 0) {
            this.log('NO CANCELLED JOBS')
        } else {
            this.log('CANCELLED JOBS...')
            for (let i=0; i<jobs.length; i++) {
                // Substring to remove '0x' prefix on job id
                this.log(`Job ID: ${jobs[i].id.substring(2)}`)
            }
        }
    }
}
