/* eslint-disable indent */
import {
  ApisauceInstance,
  create as createAPI
} from 'apisauce'
import FormData from 'form-data'
import {
  createReadStream,
  // PathLike
} from 'fs'
// import {
//   create as createIPFSNode
// } from 'ipfs-core'
// import writeIterableToFile from './it-stream'
import userConfig from '../config'
// import {
//   CID
// } from 'multiformats/cid'

interface EstuaryClientKey {
  token: string;
  expiry: string;
}

export interface EstuaryListEntry {
  requestid: string;
  status: string;
  created: Date;
  pin: EstuaryPin;
  delegates: string[];
  info: null;
}

export interface EstuaryPin {
  cid: string;
  name: string;
  origins: null;
  meta: null;
}

export interface EstuaryList {
  count: number;
  results: EstuaryListEntry[];
}

const ONE_HOUR = 3.6e+6 // milliseconds

function isExpired(clientKey: EstuaryClientKey | null) {
  if (!clientKey) return true
  const expiry = (new Date(clientKey.expiry)).getTime()
  const now = Date.now()
  if (now - expiry < ONE_HOUR) {
    // less than one hour left, refresh the key
    return true
  }
  return false
}

function loadLocalKey() {
  return userConfig.get('estuary').clientKey
}

export class EstuaryAPI {
  clientKey: EstuaryClientKey | null
  api: ApisauceInstance
  uploadApi: ApisauceInstance
  uploadKeyApi: ApisauceInstance

  constructor() {
    this.clientKey = loadLocalKey()
    this.uploadKeyApi = createAPI({
      baseURL: userConfig.get('estuary').clientKeyUrl
    })
    let headers = {
      'Authorization': this.clientKey ?
        'Bearer ' + (this.clientKey as EstuaryClientKey).token : ''
    }
    this.api = createAPI({
      baseURL: userConfig.get('estuary').estuaryApiUrl,
      headers: headers
    })
    this.uploadApi = createAPI({
      baseURL: userConfig.get('estuary').estuaryUploadUrl,
      headers: headers
    })
    this.refreshKey()
  }

  async refreshKey() {
    if (isExpired(this.clientKey)) {
      const res = await this.uploadKeyApi.post('/', {})
      if (res.problem) {
        throw res.originalError
      }
      if (!res.data) throw new Error(
        'Could not get Estuary API key - empty respose from issuer API'
      )
      const data = res.data as EstuaryClientKey
      this.clientKey = data
      userConfig.set('estuary.clientKey', this.clientKey)
    }
    if (!this.clientKey) throw new Error('Could not get Estuary API key')
    this.api.setHeader('Authorization', 'Bearer ' + this.clientKey.token)
    this.uploadKeyApi.setHeader('Authorization', 'Bearer ' + this.clientKey.token)
  }

  async list(): Promise < EstuaryList > {
    return this.api.get('pinning/pins').then(r => r.data as EstuaryList)
  }

  async getPin(pinid: string) {
    return this.api.get('pinning/pins/' + pinid)
  }

  async pushFile(filepath: string) {
    const form = new FormData()
    form.append("data", createReadStream(filepath))
    return this.uploadApi.post('content/add', form, {
      headers: {
        ...form.getHeaders()
      }
    })
  }

  // async pullFile(cid: string, outpath: PathLike) {
  //   const node = await createIPFSNode()
  //   const iterable = node.get(CID.parse(cid))
  //   await writeIterableToFile(iterable, outpath)
  // }
}
