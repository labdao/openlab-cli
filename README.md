<h1><code>@labdao/openlab-cli</code> 👋</h1>

## 

<div align="center">
  
  ![](https://flat.badgen.net/badge/icon/LabDAO?c&scale=2&icon=https://raw.githubusercontent.com/labdao/assets/main/badge_logo_green.svg&label)

  ![https://www.npmjs.com/package/@labdao/openlab-cli](https://img.shields.io/npm/v/@labdao/openlab-cli.svg?style=for-the-badge)
  ![https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg?style=for-the-badge&logo=node](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg?style=for-the-badge&logo=node)
  ![[cli.openlab.tools](cli.openlab.tools)](https://img.shields.io/badge/documentation-cli.openlab.tools-brightgreen.svg?style=for-the-badge)
  !["License: MIT"](https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge)

  ![open issues](https://flat.badgen.net/github/open-issues/labdao/openlab-cli)
  ![closed issues](https://flat.badgen.net/github/closed-issues/labdao/openlab-cli)
  ![dependabot](https://flat.badgen.net/github/dependabot/labdao/openlab-cli)

  ![discord](https://flat.badgen.net/discord/members/labdao?icon=discord)
  ![Badge](https://10q9gnv1kv6b.runkit.sh)

  <img src="https://user-images.githubusercontent.com/836040/157021714-83ad4767-dff4-4d42-9193-2d12e793b992.png" />
</div>

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
@labdao/openlab-cli/0.0.1 linux-x64 node-v16.14.0
$ openlab --help [COMMAND]
USAGE
  $ openlab COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`openlab app [APPNAME]`](#openlab-app-appname)
* [`openlab app list [PROVIDER]`](#openlab-app-list-provider)
* [`openlab file list [PATH]`](#openlab-file-list-path)
* [`openlab file pull CID`](#openlab-file-pull-cid)
* [`openlab file push [PATH]`](#openlab-file-push-path)
* [`openlab help [COMMAND]`](#openlab-help-command)

## `openlab app [APPNAME]`

get application details

```
USAGE
  $ openlab app [APPNAME] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  APPNAME  name of the application

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  get application details

EXAMPLES
  $ openlab app
```

_See code: [dist/commands/app.ts](https://github.com/labdao/openlab-cli/blob/v0.0.1/dist/commands/app.ts)_

## `openlab app list [PROVIDER]`

list applications

```
USAGE
  $ openlab app list [PROVIDER] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  PROVIDER  provider name or URL

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

DESCRIPTION
  list applications

EXAMPLES
  $ openlab app list
```

## `openlab file list [PATH]`

list files

```
USAGE
  $ openlab file list [PATH] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  PATH  remote path to list

FLAGS
  -x, --extended     show extra columns
  --columns=<value>  only show provided columns (comma-separated)
  --csv              output is csv format [alias: --output=csv]
  --filter=<value>   filter property by partial string matching, ex: name=foo
  --no-header        hide table header from output
  --no-truncate      do not truncate output to fit screen
  --output=<option>  output in a more machine friendly format
                     <options: csv|json|yaml>
  --sort=<value>     property to sort by (prepend '-' for descending)

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_
<!-- commandsstop -->
