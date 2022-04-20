import {CliUx, Command, Flags} from '@oclif/core'
import Web3 from 'web3'
import userConfig from '../../config'
import fs from 'fs'
import os from 'os'

export default class AccountAdd extends Command {
    static description = 'Add an ethereum account'
    static examples = [
        '<%= config.bin %> <%= command.id %>',
    ]
    public async run(): Promise<void> {
        const web3 = new Web3(userConfig.get('provider').maticMumbai)
        const newWalletType = await CliUx.ux.prompt('1. Create a new ethereum wallet\n2. I already have a private key\n')
        const baseDir = os.homedir()+'/.openlab'
        if (newWalletType == 1) {
            if (fs.existsSync(baseDir+'/wallet.json')) {
                this.log("Wallet already exists")
            } else {
                const account = web3.eth.accounts.create()
                const password = await CliUx.ux.prompt('Enter a password to encrypt the private key (You will not be able to recover the wallet if you forget this password)', {type: 'hide'})
                const encryptedAccount = web3.eth.accounts.encrypt(account.privateKey, password)
                if (!fs.existsSync(baseDir)){
                    fs.mkdirSync(baseDir);
                }
                fs.writeFile (baseDir+"/wallet.json", JSON.stringify(encryptedAccount), function(err) {
                    if (err) throw err;
                });
                this.log("New Wallet Created")
            }
        }
        if (newWalletType == 2) {
            if (fs.existsSync(baseDir+'/wallet.json')) {
                this.log("Wallet already exists")
            } else {
                const privateKey = await CliUx.ux.prompt('Enter your private key', {type: 'hide'})
                const password = await CliUx.ux.prompt('Enter a password to encrypt the private key', {type: 'hide'})
                const encryptedAccount = web3.eth.accounts.encrypt(privateKey, password)
                if (!fs.existsSync(baseDir)){
                    fs.mkdirSync(baseDir);
                }
                fs.writeFile (baseDir+"/wallet.json", JSON.stringify(encryptedAccount), function(err) {
                    if (err) throw err;
                });
                this.log("Wallet Added")
            }
        }
    }
}
