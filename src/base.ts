import {Command, Flags} from '@oclif/core'
import logger from './utils/log'

export default abstract class extends Command {
  log(message: string, level: string) {
    logger.log({ level, message })
  }

  // async init() {
  //   // do some initialization
  //   const {flags} = this.parse(this.constructor)
  //   this.flags = flags
  // }
  // async catch(err) {
  //   // add any custom logic to handle errors from the command
  //   // or simply return the parent class error handling
  //   return super.catch(err);
  // }
  // async finally(err) {
  //   // called after run and catch regardless of whether or not the command errored
  //   return super.finally(_);
  // }
}
