const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function testtaso1() {
  const { stdout, stderr } = await exec('npx jest api');
  const malli = /Tests:\s+(\d+) passed, (\d+) total/;
  const osumat = stderr.match(malli);
  console.log(`Taso 1 läpi: ${osumat[1]} / ${osumat[2]} testit`);
}
async function taso1() {
    console.log("Testataan taso 1")
    try {
        return await testtaso1();
    } catch (err) {
        console.log("Virheitä, tarkistus loppuu:");
        const virhemalli = /×\s+.+? \(\d+.*?\)/g;
        const tulos = err.stderr.match(virhemalli);
        for(let i = 0 ; i < tulos.length ; ++i) {
            console.log(`\t${tulos[i]}`);
        }
        process.exit(1);
    }
}

const fs = require('fs');
async function testtaso2() {
    const mocktestitOlemassa = fs.existsSync('../__test__/kirjaMock.test.js');
    if (mocktestitOlemassa) {
        console.log("Taso 2 ainakin yritetty");
    } else {
        console.log("Taso 2 ei löydy Mock testejä");
    }
}
async function taso2() {
    await testtaso2();
}

taso1();
taso2();