import { CliUx, Command } from '@oclif/core'
import { createWallet, importWallet } from '../../utils/wallet'

export default class AccountAdd extends Command {
  static description = 'Add an ethereum account'
  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    const newWalletType = await CliUx.ux.prompt([
      '1. Create a new ethereum wallet',
      '2. I already have a private key',
      ''
    ].join('\n'))
    const password = await getPassword()
    const importing = newWalletType === '2'
    const privateKey = importing && await CliUx.ux.prompt('Enter your private key')

    const wallet = await (
      importing ?
      importWallet(password, privateKey) :
      createWallet(password)
    )
    this.log(`Wallet created successfully!`)
    this.log(`Your wallet address is ${wallet.address}`)
  }
}

async function getPassword(): Promise<string>  {
  const password = await CliUx.ux.prompt(
    'Enter a password to encrypt the private key ' +
    '(You will not be able to recover the wallet if you forget this password)',
    { type: 'hide' }
  )
  return password
}
