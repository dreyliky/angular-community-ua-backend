const fs = require('fs');
const { exec } = require("child_process");

const rawConfig = fs.readFileSync('package.json', 'utf8');
const config = JSON.parse(rawConfig);

const dependencies = Object.keys(config.dependencies);
const devDependencies = Object.keys(config.devDependencies);

const allDependencies = dependencies.concat(devDependencies);
const allDependencyInstallCommands = allDependencies
    .map((dep) => `npm install ${dep} --no-save --no-audit --ignore-scripts --cache ~/.npm`);

const run = (command) => {
    const child = exec(command);

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);

    return new Promise((resolve, reject) => {
        child.on('exit', () => resolve());
        child.on('error', reject);
    });
};

async function installDependencies() {
    for (const command of allDependencyInstallCommands) {
        await run(command);
    }
};

(async function () {
    await installDependencies();
})();
