import fs from 'fs'
import axios from 'axios'

export async function loadJobRequest(path: string) {
  // check if path is a local filesystem path
  if (fs.existsSync(path)) {
    return JSON.parse(fs.readFileSync(path, 'utf-8'))
  }
  // try to resolve as an IPFS CID
  try {
    const cid = path.replace('ipfs://', '')
    const res = await axios.get(`https://ipfs.infura.io/ipfs/${cid}`)
    if (res.data) {
      return res.data
    }
  } catch (e) {
    throw new Error('Invalid job request')
  }
}
