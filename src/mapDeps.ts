import chalk from 'chalk';
import { parse } from 'parse-package-name';
import semver from 'semver';
import { nupUpdatePlan } from './banner';
import FetchDeps from './tasks/FetchDeps';
import FetchLatestVersion from './tasks/FetchLatestVersion';
import { dependencies, pkg } from './types.d';

const fetchLatestVersion = new FetchLatestVersion();
const revDepMap: Record<string, { dependedBy: string[], level: number }> = {};
const seeds: Set<string> = new Set();

const pkgKey = ({ name, version }: pkg): string => `${name}@${version}`;

function populateRevDepMap(
    pkgToFind: pkg,
    root: pkg,
    deps: dependencies
): void {
    const rootKey = pkgKey(root);
    if (!(rootKey in revDepMap)) {
        revDepMap[rootKey] = { dependedBy: [], level: 0 };
    }
    Object.entries(deps).forEach(([depName, depInfo]) => {
        if (depName === pkgToFind.name) {
            if (pkgToFind.version === depInfo.version || semver.lt(pkgToFind.version, depInfo.version)) {
                return;
            } else {
                seeds.add(pkgKey({ name: depName, version: depInfo.version }));
            }
        }
        const depKey = pkgKey({ name: depName, version: depInfo.version });
        if (!(depKey in revDepMap)) {
            revDepMap[depKey] = { dependedBy: [], level: 0 };
        }
        revDepMap[depKey].dependedBy.push(rootKey);
        if (depInfo.dependencies) {
            populateRevDepMap(pkgToFind, { name: depName, version: depInfo.version }, depInfo.dependencies)
        }
    });
}

function assignLevels(pkgToFind: pkg, root: pkg) {
    let lvl = 1;
    let packages = new Set([...seeds]);
    console.log(`Found ${packages.size} package(s), that are below required version [${[...packages].join(', ')}])}\n`)

    nupUpdatePlan(pkgToFind, root);
    // Assign levels to packages. Packages with level 0 are not updated.
    while (packages.size > 0) {
        packages = new Set([...packages].map(pkg => revDepMap[pkg].dependedBy).flat());
        packages.forEach(pkg => revDepMap[pkg].level = lvl);
        lvl += 1;
    }

    // Create update order.
    const updateOrder = new Array(lvl - 2).fill([]).map(() => new Array());
    Object.entries(revDepMap).forEach(([pkg, { level }]) => {
        if (level > 0) { // Don't update packages with level 0.
            updateOrder[level - 1].push(pkg);
        }
    });

    // dump update order in the terminal
    updateOrder.forEach((pkgs, i) => {
        console.log(chalk.bold.red(`Phase ${i + 1}:`));
        console.log(`- [ ] ${pkgs.sort().join(`\n- [] `)}\n`);
    });
}

export default async function mapDeps(pkg: string) {
    let { name, version } = parse(pkg);
    if (version === 'latest') {
        version = await fetchLatestVersion.run(name);
    }
    const pkgToFind = { name, version };
    console.log(`Fetching dependencies for ${name}@${version}`);
    const fetchDep = new FetchDeps();
    await fetchDep.run(name);
    const { response } = fetchDep;
    if (!response.dependencies) {
        console.log(`No dependencies depend on ${name}@${version}`);
    } else {
        const rootPkg: pkg = { name: response.name, version: response.version };
        populateRevDepMap(pkgToFind, rootPkg, response.dependencies);
        assignLevels(pkgToFind, rootPkg);
    }
}
