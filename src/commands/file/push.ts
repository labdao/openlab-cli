import {Command, Flags} from '@oclif/core'

export default class FilePush extends Command {
  static description = 'push a local file from your storage system to IPFS'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {}

  static args = [{name: 'path', description: 'path of file or directory to push'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FilePush)

    // const name = flags.name ?? 'world'
    // this.log(`hello ${name} from /home/rik/c/labdao/openlab-cli/src/commands/file/push.ts`)
    // if (args.file && flags.force) {
    //   this.log(`you input --force and --file: ${args.file}`)
    // }
  }
}
