import { CliUx, Command } from '@oclif/core'
import { EstuaryAPI } from '../../utils/estuary'
import { login } from '../../utils/wallet'
import { globalFlags } from '../../utils/cliux'
import { getOrCreateCollection } from '../../utils/cliux'
import { isDirectory } from '../../utils/fs'

export default class FilePush extends Command {
  static description = 'Push a file from your local filesystem to IPFS'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    password: globalFlags.password()
  }

  static args = [
    {
      name: 'path',
      description: 'Path of local file or directory to push',
      required: true
    },
    {
      name: 'remotepath',
      description: 'Remote path where file or directory should be stored',
    }
  ]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(FilePush)
    CliUx.ux.info('Uploading to IPFS')
    CliUx.ux.info('To upload to your userspace, you need to authenticate your wallet')
    const account = await login(flags.password)
    const collection = await getOrCreateCollection(account.address)
    const estuary = new EstuaryAPI()
    const pathIsDir = await isDirectory(args.path)
    let res
    if (pathIsDir) {
      CliUx.ux.info(`Uploading directory: ${args.path}`)
      res = await estuary.pushDirectory(
        collection.uuid, args.path, args.remotepath
      )
    } else {
      res = await estuary.pushFile(
        collection.uuid, args.path, args.remotepath
      )
    }
    console.log(res)
    CliUx.ux.styledJSON(res)
  }
}
