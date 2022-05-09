import Conf from 'conf'

export const defaults = {
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
      maticMumbai: 'https://polygon-mumbai.g.alchemy.com/v2/RbQoqBm8Vp-taNd4jg7YRDB5t9QSoAAb', 
      // maticMumbai: 'https://rpc-mumbai.matic.today',
      alchemyMumbai: 'https://polygon-mumbai.g.alchemy.com/v2/RbQoqBm8Vp-taNd4jg7YRDB5t9QSoAAb'
  },
  contracts: {
      maticMumbai: {
          exchange: '0xfee53bffb6b70593478cd027cb2b52776fd8c064',
          exchangeFactory: '0x53Eb5C8EF42D7261C0C2c9B8cF637a13B04f860A',
          openLabNFT: '0x29bdc464C50F7680259242E5E2F68ab1FC75C964'
      }
  },
  tokens: {
      maticMumbai: {
          USD: '0x7fD2493c6ec0400be7247D6A251F00fdccc17375'
      }
  }
}

const userConfig = new Conf({
  defaults
})

export default userConfig
