import {CliUx, Command, Flags} from '@oclif/core'
const axios = require('axios')

export default class ExchangeOpenJobs extends Command {

    // Update when new subgraph is deployed
    static APIURL = `https://api.thegraph.com/subgraphs/name/tohrnii/openlab-exchange-mumbai-c`

    static query = `
        query {
            jobs(where: {status: 0}) {
                id
                jobURI
            }
        }
    `

    public async run(): Promise<void> {
        const {
            args,
            flags,
        } = await this.parse(ExchangeOpenJobs)
        const result = await axios.post(
            ExchangeOpenJobs.APIURL, 
            {
                query: ExchangeOpenJobs.query
            }
        )
        const jobs = result.data.data.jobs
        if (jobs.length == 0) {
            this.log('NO OPEN JOBS')
        } else {
            this.log('OPEN JOBS...')
            for (let i=0; i<jobs.length; i++) {
                // Substring to remove '0x' prefix on job id
                this.log(`Job ID: ${jobs[i].id.substring(2)}`)
                // Substring to only provide CID (not with ipifs/)
                this.log(`IPFS CID: ${jobs[i].jobURI.substring(5)}`)
            }
        }
    }
}
