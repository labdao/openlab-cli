const nock = require('nock')
import { Command } from '@oclif/core';
const fs = require('fs')
import AppList from '../commands/app/list';
// For each openlab-cli command, record the request and response
// to a file in the test/nock/commands directory.
//
// The file name is the command name, with spaces replaced by dashes.
//
// For example, the command `openlab app list` will be
// recorded to `test/nock/commands/app-list.js`.
async function recordCommand(cmdstring: string, command: any) {
  // Start recording the requests
  nock.recorder.rec({
    dont_print: true,
    output_objects: true,
    enable_reqheaders_recording: true,
  })
  // Run the command
  await command.run()
  // Stop recording the requests
  const requests = nock.recorder.play()
  // Write the requests to a file
  const fileName = cmdstring.replace(/ /g, '-')
  const filePath = `test/nock/commands/${fileName}.js`
  const file = fs.createWriteStream(filePath)
  file.write(`module.exports = ${JSON.stringify(requests, null, 2)}`)
  file.end()
}

recordCommand('app list', AppList)
