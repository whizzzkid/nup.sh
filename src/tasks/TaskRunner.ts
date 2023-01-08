import { exec } from 'child_process';
import ora from 'ora';
import { ErrorCustom } from '../types';

export class TaskRunner {
    public readonly spinner = ora();
    public readonly taskName: string;
    public response: any;

    constructor(taskName: string, silent = false) {
        this.taskName = taskName;
        this.spinner = ora({ text: taskName, isSilent: silent});
        this.response = null as unknown as Awaited<ReturnType<this['task']>>;
    }

    async task(...args: any[]): Promise<any> {
        throw new Error('Not implemented');
    }

    async run(...args: any[]): Promise<any> {
        try {
            this.spinner.start(`[Starting] ${this.taskName}...`);
            this.response = await this.task(...args) as Awaited<ReturnType<this['task']>>;
            this.spinner.succeed(`[Completed] ${this.taskName}`);
            return this.response;
        } catch (e) {
            const err = e as ErrorCustom;
            this.spinner.fail(`[Failed]: ${this.taskName} - ${err.message}`);
            throw err;
        }
    }

    async execAsync(cmd: string) {
        return new Promise<{ stdout: string, stderr: string }>((resolve, reject) => {
            exec(cmd, (_err, stdout, stderr) => {
                if (stderr !== '') {
                    reject({ stdout, stderr });
                }
                resolve({ stdout, stderr });
            });
        });
    }
}
