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
  },
})

export default userConfig
