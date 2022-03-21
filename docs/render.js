const helpdata = require('./helpdata.json')
const { exec } = require("child_process")
const fs = require('fs')

const transformCommand = c => {
  c.globalFlags = c._globalFlags
  delete c._globalFlags
  return c
}

const recordExample = async e => {
  return new Promise((resolve, _reject) => {
    exec(e, (error, stdout, stderr) => {
      resolve({ input: e, output: stdout })
    })
  })
}

const recordExamples = async c => {
  c.examples = c.examples || []
  const examples = await Promise.all(c.examples.map(recordExample))
  return Object.assign({}, c, { examples })
}

const renderCommand = c => {
  const md = `
## \`openlab ${c.id.split(':').join(' ')}\`

${c.description}

### args

${c.args.map(a => `- \`${a.name}\`: ${a.description}`)}

### flags

${Object.values(c.flags).map(f => `- \`--${f.name}\`${f.char ? ' / \`-' + f.char + '\`' : ''}:  ${f.description}`).join('\n')}
  `
  return md
}

const renderApp = a => a.commands
  .map(renderCommand)
  .map(c => c.replace('<%= config.bin %>', 'openlab'))
  .join('\n')

async function run() {
  const output = Object.assign({}, helpdata)
  output.commands = await Promise.all(
    helpdata.commands
      .map(transformCommand)
    // .map(recordExamples)
  )

  console.log(renderApp(output))

  fs.writeFileSync(__dirname + '/cli.api.json', JSON.stringify(helpdata))
}

run()