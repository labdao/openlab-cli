import { OpenLabApi, Configuration } from "@labdao/openlab-applayer-client"
import { Command, CliUx } from "@oclif/core"
import { empty } from "multiformats/bytes"
import userConfig from '../config'

export default class FileList extends Command {
  static enableJsonFlag = false
  static description = 'get application details'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [{name: 'appname', description: 'name of the application'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FileList)
    CliUx.ux.action.start(`Fetching app details for '${args.appname}'`)
    const path = args.path || '/'
    const api2 = new OpenLabApi(new Configuration({
      basePath: userConfig.get('openlab').baseUrl
    }))
    const app = await api2.getApp(args.appname)
    CliUx.ux.action.stop()
    const a = app.data
    CliUx.ux.styledHeader(`${a.appname} v${a.version} from LabDAO Openlab`)
    this.log('App name:', a.appname)
    this.log('App description:', a.description)
    this.log('Available from:', 'LabDAO Openlab', userConfig.get('openlab').baseUrl)
    const eps = a.endpoints?.map(
      ep => {
        const url = new URL(
          ['v1/apps/', ep].join('/').replace('//', '/'),
          userConfig.get('openlab').baseUrl
        )
        const docsurl = new URL(
          ['docs#', ep].join('/').replace('//', '/'),
          userConfig.get('openlab').baseUrl
        )
        return {
          endpoint: ep,
          url: url.href,
          docs: docsurl.href
        }
      }
    )
    CliUx.ux.table(
      eps as any[],
      {
        endpoint: {},
        url: {
          minWidth: 40
        },
        docs: {}
      },
      {
        // printLine: this.log, // current oclif.CliUx bug: https://github.com/oclif/core/issues/377
        ...flags
      }
    )
  }
}
