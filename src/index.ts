import { nupVer } from './banner';
import mapDeps from './mapDeps';
import CheckUpdates from './tasks/CheckUpdates';

const checkUpdates = new CheckUpdates();

async function main() {
    await nupVer();
    await checkUpdates.run();
    await mapDeps(process.argv[2]);
};

main();
