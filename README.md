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




# OpenLab CLI

This repository contains the command line interface to the OpenLab Exchange – a community-run network of wet & dry laboratories accelerating progress in the life sciences.

### Install

```bash
npm install -g @labdao/openlab-cli
```

## For Research Scientists

The OpenLab-Client (CLI) allows scientists do scientific innovation at scale by utilising the networked services of other labs. Scientists in academia, non-profits, startups, enterprise, or independent citizen science can all make use of lab services for both public and private research.

Available lab services can be found via the `app list` command which returns the unique app IDs of services accessible on the exchange. Each app defines its own schema for input files and parameters available via `app info`.

Researchers can submit jobs to the exchange conforming to an app's schema, along with a sum of credits held in escrow to run this service via `job submit` and `file push` for input data.

As a job is accepted by a provider its status is updated and upon completed, the results are returned to the requestor via an NFT that points to an (optionally encrypted) pinned file on IPFS, owned by the requestor. via `job info` and `file pull`.

*While OpenLab is currently still on test net, consuming services are free by requesting test credits (see getting started).*

For more information see Getting Started as a Researcher and reference the detailed CLI Commands section below.  For any questions and suggestions please reach out to the community in the #OpenLab-Cli Discord channel.


## For Scientific Providers

The OpenLab-Client (CLI) allows scientific service providers the tools to offer their specialised services to researchers in the DeSci ecosystem. LabDAO is currently curating top quality service providers in computational biology. If you represent a CROs, virtual lab, institution, or are another other big compute provider, who are interested in gaining reputation count as an early provider, please reach out for a personal onboarding via [typeform here].

*After the service provider governance criteria has been defined and self service onboarding automated, anyone will be able to provide lab services listed on the global exchange in a permission-less manner. For now, please get in touch!*

Meanwhile, anyone can offer and consume lab services not listed on the global exchange via fully qualified app ids.

Scientific Providers can list jobs requests via `job list`,  process job requests via `job accept` + `file pull`, and return completed jobs via `file push` + `job complete`.

For more information see Getting Started as a Provider and reference the detailed CLI Commands section below.  For any questions and suggestions please reach out to the community in the #OpenLab-Cli Discord channel.


## Getting Started as a Researcher

*To be written:*
- create an account
- Request testnet tokens
- list apps
- list app requirements
- format job input parameters
- upload files, submit job
- get job info (repeat)

## Getting Started as a Provider
*To be written*
- create an account
- list jobs
- download job files
- validate job files
- process job
- update job
- complete job
- redeem tokens



---
## Built with love by LabDAO members.
For other LabDAO products see Lab Teams, Lab Funding, Lab Knowledge. To get involved generally, join the Discord, follow us on Twitter, and sign up for our mailing list. To aid as a developer, see the developer docs. To contribute or consume services, continue reading below.*

---

# Appendix


## CLI Commands

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
