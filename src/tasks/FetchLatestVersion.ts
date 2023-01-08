import { TaskRunner } from './TaskRunner';

export default class FetchLatestVersion extends TaskRunner {
    constructor() {
        super('Check For Updates');
    }

    async task(name: string): Promise<string> {
        try {
            const { stdout } = await this.execAsync(`npm show ${name} version`);
            return stdout.trim();
        } catch (e) {
            this.spinner.fail(`Unable to check for updates!`);
        }
        return '0.0.0';
    }
}
