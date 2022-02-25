import Conf from 'conf'

const userConfig = new Conf({
  defaults: {
    openlab: {
      baseUrl: 'http://toolchest.apps.openlab-api.fibrill.ae',
    },
    estuary: {
      clientKeyUrl: 'https://estuary-auth.labdao-application-layer.workers.dev',
      clientKey: null,
      estuaryApiUrl: 'https://api.estuary.tech'
    },
  },
})

export default userConfig
