import constants from "../../constants"
import axios from "axios"

// Update when new subgraph is deployed
const APIURL = constants.subgraphs.maticMumbai.exchange
export const JOB_STATUS = [
  'open',
  'active',
  'closed',
  'cancelled'
]

// {id, client, provider, jobCost, jobURI, openlabNFTURI, payableToken, status}
interface Job {
  id: string
  client: string
  provider: string
  jobCost: number
  jobURI: string
  openlabNFTURI: string
  payableToken: string
  status: number | string
  request?: any
}

export async function jobList(latest?: string, status?: string): Promise<any[]> {
  const query = jobListQuery(latest, status)
  const result = await axios.post(APIURL, { query })
  if (!result || !result.data || !result.data.data || !result.data.data.jobs) {
    console.log(result.data.errors)
    throw new Error('No jobs found')
  }
  const jobs: Job[] = result.data.data.jobs
  return jobs.map(labelStatus)
}

function jobListQuery(latest?: string, status?: string): string {
  const latestClause = latest ?
    ` last: ${latest}` : ''
  const whereClause = status ?
    `where: { jobURI_not: "dummy", status: ${status} }` : ''
  const query = [latestClause, whereClause].filter(Boolean).join(' ')
  return `
    query {
        jobs(${query || 'where: { jobURI_not: "dummy" }'}) {
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

export async function jobInfo(jobID: string): Promise<any> {
  const query = jobInfoQuery(jobID)
  const result = await axios.post(APIURL, { query })
  if (!result || !result.data || !result.data.data || !result.data.data.job) {
    console.log(result.data.errors)
    throw new Error('No job found')
  }
  const job: Job = result.data.data.job
  const cid = job.jobURI.replace('ipfs://', '')
  const res = await axios.get(`https://ipfs.infura.io/ipfs/${cid}`)
  job.request = res.data
  return labelStatus(job)
}

function jobInfoQuery(jobId: string): string {
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

function labelStatus(job: Job): Job {
  job.status = JOB_STATUS[job.status as number]
  return job
}
