import { Command, CliUx } from "@oclif/core"
import { estuaryFsTable, getOrCreateCollection } from "../../utils/cliux"
import { EstuaryAPI } from "../../utils/estuary"
import { login } from "../../utils/wallet"

export default class FileList extends Command {
  static enableJsonFlag = false
  static description = 'List the files and directories stored in IPFS'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    ...CliUx.ux.table.flags()
  }

  static args = [
    {name: 'path', description: 'Remote path to list', default: '/'}
  ]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FileList)
    const account = await login()
    const collection = await getOrCreateCollection(account.address)
    const estuary = new EstuaryAPI()
    const data = await estuary.listCollectionFs(collection.uuid, args.path)
    estuaryFsTable(data, flags)
  }
}
