import { statSync, Stats } from 'fs'
import { asyncFolderWalker } from 'async-folder-walker'
import path from 'path'

export async function isDirectory(path: string) {
  try {
    const stat = statSync(path)
    return stat.isDirectory()
  } catch (e) {
    return false
  }
}

export interface FSItem {
  root: string;
  filepath: string;
  stat: Stats;
  relname: string;
  basename: string;
}

export async function walkDirectory(path: string, cb: Function): Promise<void> {
  const walker = asyncFolderWalker(path, {
    shaper: dir => dir
  })
  for await (const entry of walker) {
    const item: FSItem = entry
    await cb(item)
  }
}

export function localisePath(inputPath: string) {
  return inputPath.split(path.sep).join(path.posix.sep)
}

export function universalisePath(inputPath: string) {
  return inputPath.split(path.posix.sep).join(path.sep)
}
