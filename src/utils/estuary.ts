/* eslint-disable indent */
import {
  ApisauceInstance,
  create as createAPI
} from 'apisauce'
import FormData from 'form-data'
import {
  createReadStream,
} from 'fs'
import path from 'path'
import constants from '../constants'
import { walkDirectory, FSItem } from './fs'


interface EstuaryClientKey {
  token: string
  expiry: string
}

export interface EstuaryCollection {
  name: string
  uuid: string
  description: string
  createdAt: string
  userId: number
}

interface EstuaryPushResponse {
  cid: string
  estuaryId: number
  providers: string[]
}

export interface EstuaryListEntry {
  requestid: string
  status: string
  created: Date
  pin: EstuaryPin
  delegates: string[]
  info: null
}

export interface EstuaryCollectionEntry {
  name: string
  path: string
  type: string
  size: number
  contId: number
  cid?: string
  children?: EstuaryCollectionEntry[]
}

export interface EstuaryPin {
  cid: string
  name: string
  origins: null
  meta: null
}

type Entry = EstuaryListEntry | EstuaryCollectionEntry
export interface EstuaryList {
  count: number
  results: Entry[]
}

export class EstuaryAPI {
  clientKey?: EstuaryClientKey
  api?: ApisauceInstance
  uploadApi?: ApisauceInstance
  uploadKeyApi?: ApisauceInstance

  constructor() { }

  async loadApiKey() {
    const uploadKeyApi = createAPI({
      baseURL: constants.estuary.clientKeyUrl
    })
    const res = await uploadKeyApi.post('/', {})
    if (res.problem) {
      throw res.originalError
    }
    if (!res.data) throw new Error(
      'Could not get Estuary API key - empty respose from issuer API'
    )
    const data = res.data as EstuaryClientKey
    this.clientKey = data
  }

  async buildHeaders() {
    await this.loadApiKey()
    return {
      'Authorization': this.clientKey ?
        'Bearer ' + (this.clientKey as EstuaryClientKey).token : ''
    }
  }

  async getApi() {
    const headers = await this.buildHeaders()
    return createAPI({
      baseURL: constants.estuary.estuaryApiUrl,
      headers: headers
    })
  }

  async getUploadApi() {
    const headers = await this.buildHeaders()
    return createAPI({
      baseURL: constants.estuary.estuaryUploadUrl,
      headers: headers
    })
  }

  async listCollection(name: string) {
    const api = await this.getApi()
    const res = await api.get('collections/content/' + name)
    return res.data as EstuaryList
  }

  async collectionExists(name: string) {
    const api = await this.getApi()
    const res = await api.get('collections/' + name)
    return res.ok
  }

  async createCollection(name: string): Promise<EstuaryCollection | undefined> {
    const api = await this.getApi()
    const res = await api.post('collections/create', {
      name: name,
    })
    if (!res.ok) return undefined
    return res.data as EstuaryCollection
  }

  async list(path: string): Promise<EstuaryList> {
    const api = await this.getApi()
    const res = await api.get('content/list')
    return res.data as EstuaryList
  }

  async getPin(pinid: string) {
    const api = await this.getApi()
    return api.get('pinning/pins/' + pinid)
  }

  async listCollectionFs(collection: string, remotepath: string) {
    const api = await this.getApi()
    let uri = `collections/fs/list?col=${collection}`
    if (remotepath) uri += `&dir=${remotepath}`
    const res = await api.get(uri)
    if (!res.ok) {
      throw new Error(`Could not list collection: ${collection} path: ${remotepath} (${JSON.stringify(res.data)})`)
    }
    const data = await Promise.all(
      (res.data as EstuaryCollectionEntry[]).map(async (entry) => {
        const path = `${remotepath}/${entry.name}`.replace('//', '/')
        entry.path = path
        if (entry.type === 'directory') {
          const children = await this.listCollectionFs(collection, path)
          if (children) entry.children = children
        }
        return entry
      })
    )
    return data as EstuaryCollectionEntry[]
  }

  async addFileToCollection(
    collection: string, estuaryId: number, remotepath: string
  ) {
    const api = await this.getApi()
    const res = await api.post(
      'collections/fs/add',
      null,
      {
        params: {
          col: collection,
          content: estuaryId,
          path: remotepath
        }
      }
    )
    if (!res.ok) {
      throw new Error(
        `Could not add file to collection: ${remotepath} (${res.data})`
      )
    }
    return res.data
  }

  async uploadFile(filepath: string) {
    const form = new FormData()
    const abspath = path.normalize(filepath)
    form.append("data", createReadStream(abspath))
    const uploadApi = await this.getUploadApi()
    const res = await uploadApi.post('content/add', form, {
      headers: {
        ...form.getHeaders()
      }
    })
    if (!res.ok) {
      throw new Error(`Could not upload file: ${filepath} (${res.data})`)
    }
    const data = res.data as EstuaryPushResponse
    return data
  }

  async pushDirectory(
    collection: string, dirpath: string, remotepath: string
  ) {
    walkDirectory(dirpath, async (entry: FSItem) => {
      const remoteRelPath = path.join(remotepath, entry.filepath)
      await this.pushFile(collection, entry.filepath, remoteRelPath)
    })
  }

  async pushFile(collection: string, filepath: string, remotepath: string) {
    const uploadedFile = await this.uploadFile(filepath)
    const collectionEntry = await this.addFileToCollection(
      collection, uploadedFile.estuaryId, remotepath
    )
    const listEntry = await this.listCollectionFs(collection, remotepath)

    return Object.assign(
      {
        collection,
        path: remotepath
      },
      collectionEntry,
      listEntry,
      uploadedFile
    )
  }

  async pushJobRequest(collection: string, filepath: string): Promise<{ collection: string; path: string } & EstuaryCollectionEntry[] & EstuaryPushResponse> {
    const uploadedFile = await this.uploadFile(filepath)
    const remotepath = '/job_requests/' + uploadedFile.cid + '.json'
    const collectionEntry = await this.addFileToCollection(
      collection, uploadedFile.estuaryId, remotepath
    )
    const listEntry = await this.listCollectionFs(collection, remotepath)

    return Object.assign(
      {
        collection,
        path: remotepath
      },
      collectionEntry,
      listEntry,
      uploadedFile
    )
  }

  // async pullFile(cid: string, outpath: PathLike) {
  //   const node = await createIPFSNode()
  //   const iterable = node.get(CID.parse(cid))
  //   await writeIterableToFile(iterable, outpath)
  // }
}
