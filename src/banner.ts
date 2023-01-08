import figlet from 'figlet';
import { name, version } from '../package.json';

export default function banner(): void {
    console.log(`${figlet.textSync(name)} v${version}\n\n`);
}
