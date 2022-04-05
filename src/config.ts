import Conf from 'conf'

const userConfig = new Conf({
  defaults: {
    openlab: {
      baseUrl: 'https://applayer-gateway-serverless.labdao-application-layer.workers.dev'
      // baseUrl: 'http://toolchest.apps.openlab-api.fibrill.ae',
    },
    estuary: {
      clientKeyUrl: 'https://estuary-auth.labdao-application-layer.workers.dev',
      clientKey: null,
      estuaryApiUrl: 'https://api.estuary.tech',
      estuaryUploadUrl: 'https://shuttle-5.estuary.tech'
    },
    provider: {
        maticMumbai: 'https://matic-mumbai.chainstacklabs.com'
    },
    contracts: {
        maticMumbai: {
            exchange: '0xfcF2b192c888d411827fDa1884C6FE2438C15Ad0',
            exchangeFactory: '0x3B7bAcB0DB759E8Ba5BeeddAFeA4Fb65B89DC4Ea',
            openLabNFT: '0xC9f04360ca658d1baF50398f754F00bAE56ebF04'
        }
    },
    tokens: {
        maticMumbai: {
            USD: '0x7fD2493c6ec0400be7247D6A251F00fdccc17375'
        }
    }
  },
})

export default userConfig
