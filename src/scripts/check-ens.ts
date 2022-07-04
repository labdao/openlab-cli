import { getENSrecords } from '../lib/ens'

async function run() {
  const record = await getENSrecords('labadao.eth')
  console.log(record)
}

run()
