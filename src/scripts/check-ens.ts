import {getENSrecords} from '../utils/ens'

async function run () {
  const record = await getENSrecords('labadao.eth')
  console.log(record)
}

run()
