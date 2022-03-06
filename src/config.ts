import Conf from 'conf'

const userConfig = new Conf({
  defaults: {
    openlab: {
      baseUrl: 'http://discovery.service.openlab.run',
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
