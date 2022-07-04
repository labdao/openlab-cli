import { CliUx, Flags } from '@oclif/core'
import { EstuaryAPI, EstuaryCollection, EstuaryCollectionEntry } from './estuary'
import treeify from 'treeify'
import userConfig from '../config'
import { login } from './wallet'

// Given a wallet address, check if a collection exists
// If it does, return the collection
// If it doesn't, create a new collection and return it
export async function getOrCreateCollection(address: string): Promise<EstuaryCollection> {
  let collection: any = userConfig.get('estuary.collection')
  const estuary = new EstuaryAPI()
  if (collection) {
    printCollection(collection)
  } else {
    const exists = await estuary.collectionExists(address)
    console.info(exists)
    if (!exists) {
      collection = await estuary.createCollection(address)
      userConfig.set('estuary.collection', collection)
      CliUx.ux.info(`Collection created: ${collection?.name}`)
    }
    printCollection(collection as EstuaryCollection)
  }
  return collection as EstuaryCollection
}

// Print the collection name and uuid of an EstuaryCollection
export function printCollection(collection: EstuaryCollection) {
  CliUx.ux.info(`Using collection ${collection.name}`)
  CliUx.ux.info(`Collection UUID ${collection.uuid}`)
}

// Log an EstuaryCollectionEntry as an OCIF CLI UX table
export async function estuaryFsTable(
  data: EstuaryCollectionEntry[],
  flags: CliUx.Table.table.Options
) {
  CliUx.ux.table(
    flatform(data),
    {
      name: {
        get: row => row.name
      },
      path: {
        get: row => row.path
      },
      cid: {
        get: row => row.cid,
        header: 'CID',
        minWidth: 40
      },
    },
    {
      printLine: l => console.log(l),
      ...flags
    }
  )
}

// Log an EstuaryCollectionEntry as a treeify tree
export async function estuaryFsTree(data: EstuaryCollectionEntry[]) {
  CliUx.ux.log(treeify.asTree(treeform(data), true, true))
}

// Convert an array of Estuary collection entry descriptions
// to a tree compatible with treeify
export function treeform(data: EstuaryCollectionEntry[]) {
  const treedata: any = {}
  data.forEach(d => {
    if (d.children) treedata[d.name] = treeform(d.children)
    else if (d.cid) treedata[d.name] = d.cid
  })
  return treedata
}

// Convert an array of Estuary collection entry descriptions
// to a flat array compatible with OCLIF CLI UX table
export function flatform(data: EstuaryCollectionEntry[]) {
  const flatdata: any = data.flatMap(d => {
    if (d.children) {
      return flatform(d.children)
    } else if (d.cid) {
      return d
    }
    return null
  })
  return flatdata.filter((d: any) => d !== null)
}

// Boolean flag to force a command by skipping confirmation
export const force = Flags.boolean({
  char: 'f',
  description: 'Force submit job (if false, will prompt for confirmation)',
  env: 'OPENLAB_CLI_FORCE',
})

// String flag for wallet password
export const password = Flags.string({
  char: 'p',
  description: 'Wallet password (if not supplied, will prompt for password)',
  env: 'OPENLAB_CLI_PASSWORD'
})

export const globalFlags = {
  force, password
}
