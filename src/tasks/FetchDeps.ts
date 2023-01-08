import { TaskRunner } from './TaskRunner';
import { rootPkgInfo } from '../types';

export default class FetchDeps extends TaskRunner {
    public response: rootPkgInfo;

    constructor() {
        super('Fetch dependencies');
        this.response = null as unknown as rootPkgInfo;
    }

    async task(pkg: string): Promise<rootPkgInfo> {
        if (!pkg || pkg === '' || typeof pkg !== 'string') {
            throw new Error('No package name provided');
        }

        let stdout, stderr;

        try {
            ({ stdout, stderr } = await this.execAsync(`npm ls ${pkg} --json`));
            return JSON.parse(stdout) as rootPkgInfo;
        } catch (e) {
            throw new Error(`Something didn't work! Error: ${stderr}`);
        }
    }
}
