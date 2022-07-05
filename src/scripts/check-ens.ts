import getLabDAOCID from '../lib/ens'

async function run() {
  const record = await getLabDAOCID()
  console.log(record)
}

run()
