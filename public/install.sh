#!/bin/sh
package_name='nup.sh'

if ! [ -x "$(command -v npm)" ]; then
    echo 'Error: NPM is not installed. nup.sh requires Node, install Node and Try again!' >&2
    exit 1
fi

echo "Installing $package_name ..."
npm install --global --update $package_name

echo "To create an Update Plan, run: nup.sh <pkg>@<version>"
