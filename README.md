<h1><code>@labdao/openlab-cli</code> 👋</h1>

<div align="center">
  
  ![](https://flat.badgen.net/badge/icon/LabDAO?c&scale=2&icon=https://raw.githubusercontent.com/labdao/assets/main/logo/labdao_logo.svg&label)

  ![https://www.npmjs.com/package/@labdao/openlab-cli](https://img.shields.io/npm/v/@labdao/openlab-cli.svg?style=for-the-badge)
  ![https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg?style=for-the-badge&logo=node](https://img.shields.io/badge/node-%3E%3D16.0.0-blue.svg?style=for-the-badge&logo=node)
  ![[cli.openlab.tools](http://cli.openlab.tools)](https://img.shields.io/badge/documentation-cli.openlab.tools-brightgreen.svg?style=for-the-badge)
  !["License: MIT"](https://img.shields.io/badge/license-MIT-purple.svg?style=for-the-badge)

  ![open issues](https://flat.badgen.net/github/open-issues/labdao/openlab-cli)
  ![closed issues](https://flat.badgen.net/github/closed-issues/labdao/openlab-cli)
  ![dependabot](https://flat.badgen.net/github/dependabot/labdao/openlab-cli)

  ![discord](https://flat.badgen.net/discord/members/labdao?icon=discord)
  ![badge game](https://10q9gnv1kv6b.runkit.sh)
</div>

## What is this?

`openlab-cli` is a command-line tool for the OpenLab ecosystem.

It allows you to:

- manage files stored in the OpenLab IPFS network
- discover and explore available bioinformatics apps
- run apps by creating and managing jobs

## When shoud I use this?

When you want to interact with OpenLab from the command-line.

## How do I use this?

* [Install](#install)
* [Commands](#commands)

## Install

```bash
npm install -g @labdao/openlab-cli
```

## Commands

<!-- commands -->
  - [`openlab account add`](#openlab-account-add)
  - [`openlab account address`](#openlab-account-address)
  - [`openlab account balance [TOKENSYMBOL]`](#openlab-account-balance-tokensymbol)
  - [`openlab account makeitrain`](#openlab-account-makeitrain)
  - [`openlab account remove`](#openlab-account-remove)
  - [`openlab app info [APPNAME]`](#openlab-app-info-appname)
  - [`openlab app list [PROVIDER]`](#openlab-app-list-provider)
  - [`openlab file list [PATH]`](#openlab-file-list-path)
  - [`openlab file pull CID`](#openlab-file-pull-cid)
  - [`openlab file push PATH [REMOTEPATH]`](#openlab-file-push-path-remotepath)
  - [`openlab job accept JOBID`](#openlab-job-accept-jobid)
  - [`openlab job complete JOBID TOKENURI`](#openlab-job-complete-jobid-tokenuri)
  - [`openlab job info JOBID`](#openlab-job-info-jobid)
  - [`openlab job list`](#openlab-job-list)
  - [`openlab job refund JOBID`](#openlab-job-refund-jobid)
  - [`openlab job submit REQUEST`](#openlab-job-submit-request)

### `openlab account add`

Add an account by creating or importing an ETH wallet

```
USAGE
  $ openlab account add

DESCRIPTION
  Add an account by creating or importing an ETH wallet

ALIASES
  $ openlab wallet add

EXAMPLES
  $ openlab account add
```

### `openlab account address`

Get the address of your local ETH wallet

```
USAGE
  $ openlab account address

DESCRIPTION
  Get the address of your local ETH wallet

EXAMPLES
  $ openlab account address
```

### `openlab account balance [TOKENSYMBOL]`

Get the balance of your local ETH wallet

```
USAGE
  $ openlab account balance [TOKENSYMBOL] [-p <value>]

ARGUMENTS
  TOKENSYMBOL  [default: USD] symbol of the ERC20 token

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Get the balance of your local ETH wallet

ALIASES
  $ openlab wallet balance

EXAMPLES
  $ openlab account balance
```

### `openlab account makeitrain`

Mint test USD tokens to your local ETH wallet

```
USAGE
  $ openlab account makeitrain [-p <value>]

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Mint test USD tokens to your local ETH wallet

EXAMPLES
  $ openlab account makeitrain
```

### `openlab account remove`

Remove your local ETH wallet

```
USAGE
  $ openlab account remove

DESCRIPTION
  Remove your local ETH wallet

ALIASES
  $ openlab wallet remove

EXAMPLES
  $ openlab account remove
```

### `openlab app info [APPNAME]`

Get the details of an application on lab-exchange

```
USAGE
  $ openlab app info [APPNAME] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  APPNAME  Application name

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
  Get the details of an application on lab-exchange

EXAMPLES
  $ openlab app revcomp
```

### `openlab app list [PROVIDER]`

List the applications available on lab-exchange

```
USAGE
  $ openlab app list [PROVIDER] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  PROVIDER  Provider name or URL

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
  List the applications available on lab-exchange

EXAMPLES
  $ openlab app list
```

### `openlab file list [PATH]`

List the files and directories stored in IPFS

```
USAGE
  $ openlab file list [PATH] [--columns <value> | -x] [--sort <value>] [--filter <value>] [--output
    csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

ARGUMENTS
  PATH  [default: /] Remote path to list

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
  List the files and directories stored in IPFS

EXAMPLES
  $ openlab file list
```

### `openlab file pull CID`

Pull a remote file from IPFS to your local file system

```
USAGE
  $ openlab file pull [CID] [-o <value>]

ARGUMENTS
  CID  IPFS content identifier of the file or directory to pull

FLAGS
  -o, --outpath=<value>  [default: .] Path where the pulled file or directory should be stored

DESCRIPTION
  Pull a remote file from IPFS to your local file system

EXAMPLES
  $ openlab file pull bafkreictm5biak56glcshkeungckjwf4tf33wxea566dozdyvhrrebnetu -o gp47_tail.fasta
```

### `openlab file push PATH [REMOTEPATH]`

Push a file from your local filesystem to IPFS

```
USAGE
  $ openlab file push [PATH] [REMOTEPATH] [-p <value>]

ARGUMENTS
  PATH        Path of local file or directory to push
  REMOTEPATH  Remote path where file or directory should be stored

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Push a file from your local filesystem to IPFS

EXAMPLES
  $ openlab file push
```

### `openlab job accept JOBID`

Accept a job on lab-exchange

```
USAGE
  $ openlab job accept [JOBID] [-p <value>]

ARGUMENTS
  JOBID  ID of the job to accept

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Accept a job on lab-exchange

EXAMPLES
  $ openlab job accept <jobID>
```

### `openlab job complete JOBID TOKENURI`

Complete a job on lab-exchange

```
USAGE
  $ openlab job complete [JOBID] [TOKENURI] [-p <value>]

ARGUMENTS
  JOBID     ID of the job to complete
  TOKENURI  URI of the token to swap

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Complete a job on lab-exchange

EXAMPLES
  $ openlab job complete <jobID> <tokenURI>
```

### `openlab job info JOBID`

Get detail of a specific job on lab-exchange

```
USAGE
  $ openlab job info [JOBID]

ARGUMENTS
  JOBID  ID of the job to get info for

DESCRIPTION
  Get detail of a specific job on lab-exchange
```

### `openlab job list`

List jobs on lab-exchange

```
USAGE
  $ openlab job list [-l <value> | -a] [-s open|active|closed|cancelled | ] [--columns <value> | -x] [--sort
    <value>] [--filter <value>] [--output csv|json|yaml |  | [--csv | --no-truncate]] [--no-header | ]

FLAGS
  -a, --all              List all jobs
  -l, --latest=<value>   [default: 10] Number of latest jobs to list
  -s, --status=<option>  [default: open] Only list jobs with the given status
                         <options: open|active|closed|cancelled>
  -x, --extended         show extra columns
  --columns=<value>      only show provided columns (comma-separated)
  --csv                  output is csv format [alias: --output=csv]
  --filter=<value>       filter property by partial string matching, ex: name=foo
  --no-header            hide table header from output
  --no-truncate          do not truncate output to fit screen
  --output=<option>      output in a more machine friendly format
                         <options: csv|json|yaml>
  --sort=<value>         property to sort by (prepend '-' for descending)

DESCRIPTION
  List jobs on lab-exchange
```

### `openlab job refund JOBID`

Cancel an accepted job on lab-exchange and return funds

```
USAGE
  $ openlab job refund [JOBID] [-p <value>]

ARGUMENTS
  JOBID  ID of the job to cancel

FLAGS
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)

DESCRIPTION
  Cancel an accepted job on lab-exchange and return funds

EXAMPLES
  $ openlab contract refund <jobID>
```

### `openlab job submit REQUEST`

Submit a new job to lab-exchange

```
USAGE
  $ openlab job submit [REQUEST] [-f] [-p <value>] [--jobPrice <value>]

ARGUMENTS
  REQUEST  Job request JSON file (local path, IPFS path, or IPFS CID)

FLAGS
  -f, --force             Force submit job (if false, will prompt for confirmation)
  -p, --password=<value>  Wallet password (if not supplied, will prompt for password)
  --jobPrice=<value>      [default: 10000] Price you will pay for the job (in gwei). If not specified, the default price
                          will be used.

DESCRIPTION
  Submit a new job to lab-exchange

EXAMPLES
  $ openlab job submit
```

<!-- commandsstop -->

## License

MIT
