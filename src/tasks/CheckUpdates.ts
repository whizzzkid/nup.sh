import { TaskRunner } from './TaskRunner';
import semver from 'semver';
import { name, version } from '../../package.json';
import chalk from 'chalk';

export default class CheckUpdates extends TaskRunner {
    constructor() {
        super('Fetch Latest Version', true);
    }

    async task(): Promise<void> {
        try {
            const { stdout } = await this.execAsync(`npm show ${name} version`);
            if (semver.gt(stdout, version)) {
                const updateMsg = [];
                updateMsg[0] = chalk.bold.greenBright(`A new version of ${name} is available!`);
                updateMsg[1] = chalk.blueBright(`Current version: ${version}`);
                updateMsg[2] = chalk.blueBright(`Latest version: ${stdout}`);
                updateMsg[3] = chalk.greenBright(`Run 'npm i -g ${name}' to update!`);
                console.log(`\n\n${updateMsg.join('\n')}\n\n`);
            }
        } catch (e) {
            this.spinner.fail(`Unable to check for updates!`);
        }
    }
}
