import { pkg } from './types.d';
import figlet from 'figlet';
import { name, version } from '../package.json';
import chalk from 'chalk';

export function nupVer(): void {
    console.log(`${figlet.textSync(name)} v${version}\n\n`);
}

export function nupUpdatePlan(pkgToUpdate: pkg, root: pkg): void {
    const msgLines = [];
    msgLines[0] = chalk.bold.yellow(`NPM Update Plan for ${root.name}@${root.version}`);
    msgLines[1] = chalk.yellow(`[Objective]: to make it compatible with ${pkgToUpdate.name}@${pkgToUpdate.version}`);
    console.log(`\n\n${msgLines.join('\n')}\n\n`)
}
