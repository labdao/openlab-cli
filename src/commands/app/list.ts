import { OpenLabApi, Configuration } from "@labdao/openlab-applayer-client"
import { Command, CliUx } from "@oclif/core"
import userConfig from '../../config'

export default class AppList extends Command {
  static enableJsonFlag = false
  static description = 'list applications'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [{name: 'provider', description: 'provider name or URL'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(AppList)
    const path = args.path || '/'
    const api2 = new OpenLabApi(new Configuration({
      basePath: userConfig.get('openlab').baseUrl
    }))
    const apps = await api2.apps()
    CliUx.ux.table(
      apps.data as any[],
      {
        name: {
          get: row => row.appname
        },
        description: {
          minWidth: 40
        },
        version: {
          get: row => row.version,
        },
        endpoints: {
          get: row => row.endpoints.join('\n')
        },
      },
      {
        // printLine: this.log, // current oclif.CliUx bug: https://github.com/oclif/core/issues/377
        ...flags
      }
    )
  }
}
