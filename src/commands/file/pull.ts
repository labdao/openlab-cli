import {
  CliUx,
  Command,
  Flags
} from '@oclif/core'
import download from 'download'
import {
  createWriteStream
} from 'fs'

export default class FilePull extends Command {
  static description = 'Pull a remote file from IPFS to your local file system'

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

  public async run(): Promise<void> {
    const {
      args,
      flags
    } = await this.parse(FilePull)

    this.log(`Running pull command with cid = ${args.CID} and outpath = ${flags.outpath}`)
    this.log('Downloading file...')

    const dlstream = download(
      'https://dweb.link/ipfs/' + args.CID
    )

    let bar = CliUx.ux.progress({

    })
    bar.start(100, 0)

    dlstream.on('downloadProgress', p => {
      if (p.percent === 1) {
        bar.on('redraw-post', () => {
          this.log('\nDownload complete')
          process.exit(1)
        })
      }
      bar.update(p.percent * 100)
    })

    dlstream.pipe(
      createWriteStream(
        flags.outpath
      )
    )
  }
}
