@labdao/openlab-cli
=================

LabDAO OpenLab CLI

> !! NOTE !! - this repo is in active development and not ready to use. Please wait for the first release.

[![LabDAO OpenLab](https://img.shields.io/badge/LabDAO-OpenLab-39bfad.svg)](https://labdao.com)
[![Version](https://img.shields.io/npm/v/labdao/openlab-cli)](https://npmjs.org/package/labdao/openlab-cli)
[![CircleCI](https://circleci.com/gh/labDAO/openlab-CLI/tree/main.svg?style=shield)](https://circleci.com/gh/labDAO/openlab-CLI/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/labdao/openlab-cli.svg)](https://npmjs.org/package/labdao/openlab-cli)
[![License](https://img.shields.io/npm/l/labdao/openlab-cli.svg)](https://github.com/labdao/openlab-cli/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->

# Usage
Install via NPM
<!-- usage -->
```sh-session
$ npm install -g @labdao/openlab-cli
$ openlab COMMAND
running command...
$ openlab (--version)
@labdao/openlab-cli/0.0.0 linux-x64 node-v14.18.2
$ openlab --help [COMMAND]
USAGE
  $ openlab COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`openlab file list [PATH]`](#openlab-file-list-path)
* [`openlab file pull CID`](#openlab-file-pull-cid)
* [`openlab file push [PATH]`](#openlab-file-push-path)
* [`openlab help [COMMAND]`](#openlab-help-command)

## `openlab file list [PATH]`

list files

```
USAGE
  $ openlab file list [PATH] [--json]

ARGUMENTS
  PATH  remote path to list

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  list files

EXAMPLES
  $ openlab file list
```

## `openlab file pull CID`

pull a remote file from IPFS to your local file system

```
USAGE
  $ openlab file pull [CID] [-o <value>]

ARGUMENTS
  CID  the IPFS content identifier of the file or directory to pull

FLAGS
  -o, --outpath=<value>  [default: .] the path where the pulled file or directory should be stored

DESCRIPTION
  pull a remote file from IPFS to your local file system

EXAMPLES
  $ openlab file pull
```

## `openlab file push [PATH]`

push a local file from your storage system to IPFS

```
USAGE
  $ openlab file push [PATH]

ARGUMENTS
  PATH  path of file or directory to push

DESCRIPTION
  push a local file from your storage system to IPFS

EXAMPLES
  $ openlab file push
```

## `openlab help [COMMAND]`

Display help for openlab.

```
USAGE
  $ openlab help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for openlab.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.11/src/commands/help.ts)_
<!-- commandsstop -->
