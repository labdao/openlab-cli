import { OpenLabApi, Configuration } from "@labdao/openlab-applayer-client"
import { Command, CliUx } from "@oclif/core"
import userConfig from '../config'
import logger from "../utils/log"
export default class App extends Command {
  static enableJsonFlag = true
  static description = 'get application details'

  static examples = [
    'openlab app revcomp',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [{name: 'appname', description: 'name of the application'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(App)
    CliUx.ux.action.start(`🖥️  Fetching app details for '${args.appname}'`)
    const path = args.path || '/'
    const api2 = new OpenLabApi(new Configuration({
      basePath: userConfig.get('openlab').baseUrl
    }))
    const app = await api2.getApp(args.appname)
    CliUx.ux.action.stop()
    const a = app.data
    if (flags.json) return console.log(JSON.stringify(a, null, 2))
    logger.info(`App name: ${a.appname}`)
    logger.info(`App version ${a.version}`)
    logger.info(`App description: ${a.description}`)
    logger.info(`Provider: LabDAO Openlab `)
    logger.info(`API server: ${userConfig.get('openlab').baseUrl}`)
    // const eps = a.endpoints?.map(
    //   ep => {
    //     const url = new URL(
    //       ['v1/apps/', ep].join('/').replace('//', '/'),
    //       userConfig.get('openlab').baseUrl
    //     )
    //     const docsurl = new URL(
    //       ['docs#', ep].join('/').replace('//', '/'),
    //       userConfig.get('openlab').baseUrl
    //     )
    //     return {
    //       endpoint: ep,
    //       url: url.href,
    //       docs: docsurl.href
    //     }
    //   }
    // )
    // eps?.forEach(e => {
    //   logger.info(`Endpoint: ${e.endpoint}`)
    //   logger.info(`  - URL: ${e.url}`)
    //   logger.info(`  - docs: ${e.docs}`)
    // })
  }
}
