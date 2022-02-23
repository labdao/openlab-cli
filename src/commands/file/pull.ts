import {
  Command,
  Flags
} from '@oclif/core'

export default class FilePull extends Command {
  static description = 'pull a remote file from IPFS to your local file system'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    outpath: Flags.string({
      char: 'o',
      description: 'the path where the pulled file or directory should be stored',
      default: '.'
    })
  }

  static args = [{
    name: 'CID',
    description: 'the IPFS content identifier of the file or directory to pull',
    required: true
  }]

  public async run(): Promise < void > {
    const {
      args,
      flags
    } = await this.parse(FilePull)

    this.log(`running pull command with cid = ${args.cid} and outpath = ${flags.outpath}`)
    if (args.file) {
      this.log(`you input --file: ${args.file}`)
    }
  }
}
