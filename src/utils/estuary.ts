/* eslint-disable indent */
import {
  ApisauceInstance,
  create
} from 'apisauce'
import * as FormData from 'form-data'
import {
  createReadStream
} from 'fs'
import userConfig from '../config'

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
  uploadKeyApi: ApisauceInstance

  constructor() {
    this.clientKey = loadLocalKey()
    console.log(userConfig.get('estuary'))
    this.uploadKeyApi = create({
      baseURL: userConfig.get('estuary').clientKeyUrl
    })
    let headers = {
      'Authorization': this.clientKey ?
        'Bearer ' + (this.clientKey as EstuaryClientKey).token : ''
    }
    this.api = create({
      baseURL: userConfig.get('estuary').estuaryApiUrl,
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
  }

  async list(): Promise<EstuaryList> {
    return this.api.get('pinning/pins').then(r => r.data as EstuaryList)
  }

  async getPin(pinid: string) {
    return this.api.get('pinning/pins/' + pinid)
  }

  async pushFile(filepath: string) {
    const form = new FormData()
    form.append("data", createReadStream(filepath))
    return this.api.post('content/add', form)
  }
}

// // get a new API key
// api
//   .get('/repos/skellock/apisauce/commits')
//   .then(response => response.data[0].commit.message)
//   .then(console.log)

// // customizing headers per-request
// api.post('/users', {name: 'steve'}, {headers: {'x-gigawatts': '1.21'}})
