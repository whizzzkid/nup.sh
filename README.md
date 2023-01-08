# nup.sh

Update npm packages and their dependencies the smart way.

## Installation

Can be installed from npm or run with npx

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
             |_|                v0.0.1


✔ [Completed] Check For Updates
Fetching dependencies for multiformats@11.0.0
✔ [Completed] Fetch dependencies


NPM Update Plan for @libp2p/interop@3.0.4 to make it compatible with multiformats@11.0.0


Found 1 package(s), that are below required version = [multiformats@10.0.3])}
Phase 1:
- @libp2p/interface-peer-id@1.1.2
- @libp2p/peer-id@1.1.18

Phase 2:
- @libp2p/daemon-client@3.0.6

Phase 3:
- @libp2p/interop@3.0.4

Phase 4:
- Finally Update @libp2p/interop@3.0.4
```
## Author

Whizzzkid (me@nishantarora.in)
