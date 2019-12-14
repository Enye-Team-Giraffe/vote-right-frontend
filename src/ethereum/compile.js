/* eslint-disable no-restricted-syntax */
// disabling the no restricted syntax because it refuses to allow the compile loop to run

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// get the path of the build folder, where we store our compiled contracts
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // if the build path exists we delete it and its contents

// get the paths to he contract source and read it to memory
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');
// compile our contract to bytecodes for deployment
const output = solc.compile(source, 1).contracts;
const keys = Object.keys(output);
fs.ensureDirSync(buildPath);// make sure the path exists, and recreate it if it doesnt

// for each contract, save it to a file
for (const contract of keys) {
    let name=contract.replace(':', '')
    fs.outputJSONSync(
        path.resolve(buildPath, `${name}.json`),
        output[contract]
    );
}
