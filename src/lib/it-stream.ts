import * as util from 'util'
import * as stream from 'stream'
import * as fs from 'fs'

const pipeline = util.promisify(stream.pipeline)

export default async function writeIterableToFile(iterable: Iterable<any> | AsyncIterable<any>, filePath: fs.PathLike) {
  const readable = stream.Readable.from(
    iterable, {encoding: 'utf8'}
  )
  const writable = fs.createWriteStream(filePath)
  await pipeline(readable, writable)
}
