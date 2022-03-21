import {
  // CliUx,
  Command,
  Flags
} from '@oclif/core'
import download from 'download'
// import { EstuaryAPI } from '../../utils/estuary'
import {
  createWriteStream
} from 'fs'
import { pipeline } from 'stream'

export default class FilePull extends Command {
  static enableJsonFlag = true
  static description = 'pull a remote file from IPFS to your local file system'

  static examples = [
    '<%= config.bin %> <%= command.id %> bafkreictm5biak56glcshkeungckjwf4tf33wxea566dozdyvhrrebnetu -o gp47_tail.fasta',
  ]

  static flags = {
    outpath: Flags.string({
      char: 'o',
      description: 'the path where the pulled file or directory should be stored',
      default: '[CID]'
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

    flags.outpath = flags.outpath === '[CID]' ? args.CID : flags.outpath

    this.log(`Running pull command with cid = ${args.CID} and outpath = ${flags.outpath}`)

    // const estuary = new EstuaryAPI()
    // estuary.pullFile(args.CID, flags.outpath)
    const dlstream = download(
      'https://dweb.link/ipfs/' + args.CID
    )
    // let bar = CliUx.ux.progress()
    // bar.start(100, 0)

    // dlstream.on('downloadProgress', p => {
    //   bar.update(p.percent)
    // })

    this.log('Downloading file...')

    dlstream.pipe(
      createWriteStream(
        flags.outpath
      )
    )
  }
}
