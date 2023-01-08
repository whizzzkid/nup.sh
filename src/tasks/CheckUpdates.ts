import { TaskRunner } from './TaskRunner';
import semver from 'semver';
import { name, version } from '../../package.json';

export default class CheckUpdates extends TaskRunner {
    constructor() {
        super('Fetch Latest Version', true);
    }

    async task(): Promise<void> {
        try {
            const { stdout } = await this.execAsync(`npm show ${name} version`);
            if (semver.gt(stdout, version)) {
                console.log(`A new version of ${name} is available!`);
                console.log(`Current version: ${version}`);
                console.log(`Latest version: ${stdout}`);
                console.log(`Run 'npm i -g ${name}' to update!`)
            }
        } catch (e) {
            this.spinner.fail(`Unable to check for updates!`);
        }
    }
}
