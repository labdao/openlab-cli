import { CliUx, Command } from '@oclif/core'
import { checkMaticBalance, createWallet, drinkFromFaucet, importWallet } from '../../utils/wallet'

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

    const getMatic = await CliUx.ux.confirm('Do you want to get some free MATIC tokens from the Polygon MATIC Faucet? (recommended)')
    if (!getMatic) {
      CliUx.ux.exit(1)
    }
    this.log(`Requesting a drop from the MATIC faucet`)
    const res = await drinkFromFaucet(wallet.address)
    if (res.hash === 'TRANSACTION_SENT_TO_DB') {
      const startbal = await checkMaticBalance(wallet.address)
      this.log('Starting balance:', startbal)
      this.log(`MATIC tokens requested from Mumbai testnet faucet.`)
      this.log('The MATIC may take a couple of minutes to show up in your account.')
      this.log(`You can check your balance at https://mumbai.polygonscan.com/address/${wallet.address}`)
    } else {
      CliUx.ux.error('Failed to request tokens from faucet, please try again in a few minutes')
    }
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
