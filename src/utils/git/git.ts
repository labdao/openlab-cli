import child_process from 'child_process'
import path from 'path'

const basedir = path.resolve(__dirname, '../..')
export default async function shorthash(repopath: string) {
  return child_process
    .execSync('git rev-parse --short HEAD', { cwd: basedir })
    .toString().trim()
}
