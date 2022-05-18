import { CliUx } from '@oclif/core'
import { EstuaryAPI, EstuaryCollection, EstuaryCollectionEntry } from './estuary'
import treeify from 'treeify'
import userConfig from '../config'

export async function getOrCreateCollection(address: string): Promise<EstuaryCollection> {
  let collection: EstuaryCollection | undefined = userConfig.get('estuary.collection')
  const estuary = new EstuaryAPI()
  if (collection) {
    CliUx.ux.info(
      `Using collection ${collection.name} with UUID ${collection.uuid}`
    )
  } else {
    const exists = await estuary.collectionExists(address)
    console.info(exists)
    if (!exists) {
      collection = await estuary.createCollection(address)
      userConfig.set('estuary.collection', collection)
      CliUx.ux.info(`collection created: ${collection?.name}`)
    }
    CliUx.ux.info('collection:')
    CliUx.ux.info(JSON.stringify(collection, null, 2))
  }
  return collection as EstuaryCollection
}

export async function estuaryFsTable (
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

export async function estuaryFsTree (data: EstuaryCollectionEntry[]) {
  CliUx.ux.log(treeify.asTree(treeform(data), true, true))
}

function treeform (data: EstuaryCollectionEntry[]) {
  const treedata: any = {}
  data.forEach(d => {
    if (d.children) treedata[d.name] = treeform(d.children)
    else if (d.cid) treedata[d.name] = d.cid
  })
  return treedata
}

function flatform (data: EstuaryCollectionEntry[]) {
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
