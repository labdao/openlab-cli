import {CliUx, Command, Flags} from '@oclif/core'
import {EstuaryAPI} from '../../utils/estuary';

export default class FilePush extends Command {
  static description = 'Push a local file from your storage system to IPFS'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {}

  static args = [{name: 'path', description: 'path of file or directory to push'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FilePush)
    const estuary = new EstuaryAPI()
    const res = await estuary.pushFile(args.path)
    CliUx.ux.styledJSON(res.data)
  }
}
