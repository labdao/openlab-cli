import { Command, CliUx } from "@oclif/core"
import { EstuaryAPI, EstuaryListEntry, EstuaryPin } from '../../utils/estuary';

export default class FileList extends Command {
  static enableJsonFlag = true
  static description = 'list files'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [{name: 'path', description: 'remote path to list'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FileList)
    const path = args.path || '/'
    const estuary = new EstuaryAPI()
    const data = await estuary.list()
    CliUx.ux.table(
      data.results as any[],
      {
        name: {
          get: row => row.pin && row.pin.name
        },
        cid: {
          get: row => row.pin && row.pin.cid,
          header: 'CID',
          minWidth: 40
        },
        pinid: {
          get: row => row.requestid,
          header: 'PinID'
        },
        created: {
          get: row => new Date(row.created).toISOString().substring(0, 19).replace('T', ' ')
        },
      },
      {
        // printLine: this.log, // current oclif.CliUx bug: https://github.com/oclif/core/issues/377
        ...flags
      }
    )
  }
}
