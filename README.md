# nup.sh - NPM Update Plan

<a href="https://github.com/whizzzkid/nup.sh" target="_blank"><img src="https://github.com/whizzzkid/nup.sh/actions/workflows/deploy.yaml/badge.svg"></a>
<a href="https://www.npmjs.com/package/nup.sh" target="_blank"><img src="https://img.shields.io/npm/dm/nup.sh?label=npm-downloads&style=flat-square"></a>

Update npm packages and their dependencies (and their dependencies) the smart way.

## Installation

Simplest Installation:

```sh
source <(curl -sL nup.sh)
```

Or, can be installed from npm or run with npx

```sh
$ npm i -g nup.sh
$ npx nup.sh
```

## Examples

```sh
$ nup.sh multiformats
                         _
  _ __  _   _ _ __   ___| |__
 | '_ \| | | | '_ \ / __| '_ \
 | | | | |_| | |_) |\__ \ | | |
 |_| |_|\__,_| .__(_)___/_| |_|
             |_|                v0.4.0


A new version of nup.sh is available!
Current version: 0.2.0
Latest version: 0.3.0

Run 'npm i -g nup.sh' to update!
✔ [Completed] Check For Updates
Fetching dependencies for multiformats@11.0.0
✔ [Completed] Fetch dependencies
Found 1 package(s), that are below required version [multiformats@10.0.3])}



NPM Update Plan for @libp2p/interop@3.0.4
[Objective]: to make it compatible with multiformats@11.0.0


Phase 1:
- [] @libp2p/interface-peer-id@1.1.2
- [] @libp2p/peer-id@1.1.18

Phase 2:
- [] @libp2p/daemon-client@3.0.6

Phase 3:
- [] @libp2p/interop@3.0.4
```

## Vision - WIP!

- Automate updates to dependencies of dependencies
- Find breaking links between grand-children dependencies
- Present plan to update things systematically.

## Author

[whizzzkid](http://whizzzkid.dev)
