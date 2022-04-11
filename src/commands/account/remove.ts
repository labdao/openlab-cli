import {CliUx, Command, Flags} from '@oclif/core'
import Web3 from 'web3'
import userConfig from '../../config'
import fs from 'fs'
import os from 'os'

export default class AccountRemove extends Command {
    static description = 'remove an ethereum account'
    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ]
    public async run(): Promise<void> {
        const web3 = new Web3(userConfig.get('provider').maticMumbai)
        const baseDir = os.homedir()+'/.openlab'
        if (!fs.existsSync(baseDir+'/wallet.json')) {
            this.log("Wallet doesn't exist")
        }
        else {
            const password = await CliUx.ux.prompt('Enter a password to decrypt your wallet', {type: 'hide'})
            const keystoreJsonV3 = JSON.parse(fs.readFileSync(baseDir+'/wallet.json', 'utf-8'))
            const account = web3.eth.accounts.decrypt(keystoreJsonV3, password)
            fs.unlinkSync(baseDir+"/wallet.json")
        }
    }
}
