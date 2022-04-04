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
            exchange: '0xad987CdEE0b0C42789a3EcFABf23382424bb7aE0',
            exchangeFactory: '0xfE4A6F713d9D28A0AFd9b7934418Ae5b5b71230A',
            openLabNFT: '0x18d7EAA555D813595BCEBDaDD6b0C55A8FEa89c7'
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
