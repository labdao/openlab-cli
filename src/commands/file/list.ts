import { Command, CliUx } from "@oclif/core"
import userConfig from "../../config"
import { EstuaryAPI, EstuaryCollection, EstuaryCollectionEntry } from '../../utils/estuary';
import treeify from 'treeify'
import { estuaryFsTable } from "../../utils/cliux"

export default class FileList extends Command {
  static enableJsonFlag = false
  static description = 'List files'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [
    {name: 'path', description: 'remote path to list', default: '/'}
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FileList)
    const estuary = new EstuaryAPI()
    let collection: EstuaryCollection | undefined = userConfig.get('estuary.collection')
    if (!collection) {
      this.error('no collection configured')
    }
    const data = await estuary.listCollectionFs(collection.uuid, args.path)
    estuaryFsTable(data, flags)
  }
}
