import { Command } from '@oclif/core'
const axios = require('axios')

export default class ExchangeClosedJobs extends Command {

  // Update when new subgraph is deployed
  static APIURL = `https://api.thegraph.com/subgraphs/name/tohrnii/openlab-exchange-mumbai-c`

  static query = `
  query {
      jobs(where: {status: 2}) {
          id
          jobURI
          openlabNFTURI
      }
  }
  `

  public async run(): Promise<void> {
    const {
      args,
      flags,
    } = await this.parse(ExchangeClosedJobs)
    const result = await axios.post(
      ExchangeClosedJobs.APIURL,
      {
        query: ExchangeClosedJobs.query
      }
    )
    const jobs = result.data.data.jobs
    if (jobs.length == 0) {
      this.log('NO CLOSED JOBS')
    } else {
      this.log('CLOSED JOBS...')
      for (let i = 0; i < jobs.length; i++) {
        // Substring to remove '0x' prefix on job id
        this.log(`Job ID: ${jobs[i].id.substring(2)}`)
        this.log(`Job Metadata IPFS CID: ${jobs[i].jobURI.substring(5)}`)
        this.log(`Openlab NFT IPFS CID: ${jobs[i].openlabNFTURI.substring(5)}`)
      }
    }
  }
}
