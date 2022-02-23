import {Command, Flags} from '@oclif/core'

export default class FileList extends Command {
  static enableJsonFlag = true
  static description = 'list files'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    // name: Flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    // force: Flags.boolean({char: 'f'}),
  }

  static args = [{name: 'path', description: 'remote path to list'}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(FileList)

  //   const name = flags.name ?? 'world'
  //   this.log(`hello ${name} from /home/rik/c/labdao/openlab-cli/src/commands/file/list.ts`)
  //   if (args.file && flags.force) {
  //     this.log(`you input --force and --file: ${args.file}`)
  //   }
  }
}
