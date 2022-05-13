import { CliUx, Command } from '@oclif/core'
import Listr from 'listr'
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

    const list = new Listr([
      {
        title: 'Create wallet',
        task: async (ctx, task) => {
          const wallet = await (
            importing ?
              importWallet(password, privateKey) :
              createWallet(password)
          )
          ctx.wallet = wallet
          const op = importing ? 'imported' : 'created'
          return `Wallet ${op}: ${wallet.address}`
        }
      },
      {
        title: 'Check wallet balance',
        task: async (ctx, task) => {
          const startbal = await checkMaticBalance(ctx.wallet.address)
          ctx.startbal = startbal
          return `Wallet balance: ${startbal} MATIC`
        },
      },
      {
        title: 'Get MATIC from faucet?',
        skip: () => {
          const getMatic = await CliUx.ux.confirm('Do you want to get some free MATIC tokens from the Polygon MATIC Faucet? (recommended)')
          list.render()
          if (!getMatic) {
            return 'MATIC faucet skipped'
          }
        },
        task: async (ctx, task) => {
          task.title = `MATIC tokens requested from Mumbai testnet faucet...`
          const res = await drinkFromFaucet(ctx.wallet.address)
          if (res.hash === 'TRANSACTION_SENT_TO_DB') {

          } else {
            return 'Failed to request tokens from faucet, please try again in a few minutes'
          }
          return 'Drop requested. The MATIC may take a couple of minutes to show up in your account.'
        }
      },
      {
        title: '',
        task: async (ctx, task) => {
          task.
            this.log(`MATIC tokens requested from Mumbai testnet faucet.`)
          this.log('The MATIC may take a couple of minutes to show up in your account.')
          this.log(`You can check your balance at https://mumbai.polygonscan.com/address/${ctx.wallet.address}`)
        }
      }
    ],
      {}
    )
  }
}

async function getPassword(): Promise<string> {
  const password = await CliUx.ux.prompt(
    'Enter a password to encrypt the private key ' +
    '(You will not be able to recover the wallet if you forget this password)',
    { type: 'hide' }
  )
  return password
}
