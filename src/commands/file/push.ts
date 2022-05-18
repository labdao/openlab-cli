import { CliUx, Command } from '@oclif/core'
import { EstuaryAPI } from '../../utils/estuary'
import { login } from '../../utils/wallet'
import { getOrCreateCollection } from '../../utils/cliux'

export default class FilePush extends Command {
  static description = 'Push a local file from your storage system to IPFS'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {}

  static args = [
    {
      name: 'path',
      description: 'path of file or directory to push',
      required: true
    },
    {
      name: 'remotepath',
      description: 'remote path where file or directory should be stored',
    }
  ]

  public async run(): Promise<void> {
    const account = await login()
    let collection = await getOrCreateCollection(account.address)
    const estuary = new EstuaryAPI()
    const { args } = await this.parse(FilePush)
    const res = await estuary.pushFile(
      collection.uuid, args.path, args.remotepath
    )
    CliUx.ux.styledJSON(res)
  }
}
