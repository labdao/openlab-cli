import {ethers} from 'ethers'
const chash = require('content-hash')

const provider = new ethers.providers.InfuraProvider(
  ethers.providers.getNetwork('homestead'),
  '38d5a8ea149544eb9bac413ce7c40c8a'
)

export default async function getLabDAOCID() {
  const resolver = await provider.getResolver('labdao.eth')
  if (resolver) {
    const cid = await resolver.getContentHash().catch(
      e => chash.decode(e.data)
    )
    return cid
  }
}
