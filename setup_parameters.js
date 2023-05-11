/**
 Defines a function named SetParams that uses the readline module to prompt the user to enter various simulation parameters. These parameters include the method for computing interactions, the method for integrating equations of motion, density, timestep, equilibration steps, simulation steps, and other necessary constants. The function sets global variables that will be used throughout the simulation.
 */

import {VSCopy, VProd, VSInt} from './utils.js'
import readline from 'readline';

function askQuestion(question, allowDecimal = false) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function prompt() {
      rl.question(question, (answer) => {
        if ((allowDecimal && !isNaN(parseFloat(answer))) || (!allowDecimal && !isNaN(parseInt(answer))) && answer >= 0) {
          rl.close();
          resolve(answer);
        } else {
          console.log('Error: Please enter a valid number.');
          prompt(); // ask the question again
        }
      });
    }

    prompt();
  });
}

function askInteraction() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function prompt() {
      rl.question('How do you want to compute the interactions?\n1. All pairs\n2. Cell subdivision\n3. Neighbor list\n', (answer) => {
        if (answer === '1') {
          rl.close();
          resolve('all_pairs');
        } else if (answer === '2') {
          rl.close();
          resolve('cell_subdivision');
        } else if (answer === '3') {
          rl.close();
          resolve('neighbor_list');
        } else {
          console.log('Error: Invalid input.');
          prompt(); // ask the question again
        }
      });
    }

    prompt();
  });
}

function askIntegration() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    function prompt() {
      rl.question('How do you want to integrate the equations of motion?\n1. Leapfrog method\n2. Predictor-corrector method\n', (answer) => {
        if (answer === '1') {
          rl.close();
          resolve('leapfrog');
        } else if (answer === '2') {
          rl.close();
          resolve('predictor-corrector');
        } else {
          console.log('Error: Invalid input.');
          prompt(); // ask the question again
        }
      });
    }

    prompt();
  });
}

export const SetParams = async () => {
  global.interaction = await askInteraction();
  global.integration = await askIntegration();

  global.density = await askQuestion('What is the density? ',  true)
  global.deltaT = await askQuestion('What is the timestep?  (suggested 0.001) ', true)
  global.stepEquil = await askQuestion('How many steps to equilibrate? (suggested 1000) ')
  global.stepLimit = await askQuestion('How many steps to simulate? ')
  global.stepAvg = await askQuestion('With which frequency do you want to print the thermodynamic information? ')

  const size = await askQuestion('What will be the size of the simulation box? ')

  global.mol = {}
  global.region = {x: 0, y: 0, z:0}
  global.vSum = {x:0, y:0, z: 0}
  global.initUcell = {x:size, y:size, z: size}
  VSCopy(region, 1. / Math.pow (density / 4., 1./3.), initUcell);
  global.kinEnergy = {val:0, sum:0, sum2:0};
  global.pressure = {val:0, sum:0, sum2:0};
  global.totEnergy = {val:0, sum:0, sum2:0};
  global.rCut = Math.pow(2, 1/6)
  global.temperature = 1;
  global.timeNow = 0;
  global.uSum = 0;
  global.virSum = 0;
  global.vvSum = 0;
  global.NDIM = 3
  global.nMol = 4 * VProd(initUcell);
  global.stepCount = 0;
  global.velMag = Math.sqrt(NDIM * (1. - 1 / nMol) * temperature);
  if(integration === 'leapfrog'){
    for (let n = 0; n < nMol; n ++){
      mol[n] = {r: {}, rv: {}, ra: {}}
    }
  }else if (integration === 'predictor-corrector'){
    for (let n = 0; n < nMol; n ++){
      mol[n] = {r: {}, rv: {}, ra: {}, ro: {}, rvo: {}, ra1: {}, ra2: {}}
    }
  }
  global.kinEnInitSum = 0;
  global.stepInitlzTemp = 200;
  global.countVel = 0;
  global.nebrTabFac = 8 
  global.randSeed  = 17 
  global.rNebrShell = 0.4

  if(interaction === 'cell_subdivision' || interaction === 'neighbor_list'){
    global.OFFSET_VALS = [{x: 0,y: 0,z: 0}, {x: 1, y: 0, z:0}, {x: 1,y:1,z:0}, {x:0,y:1,z:0}, {x:-1,y:1,z:0}, {x:0,y:0,z:1},{x:1,y:0,z:1}, {x:1,y:1,z:1}, {x:0,y:1,z:1}, {x:-1,y: 1,z: 1}, {x: -1, y: 0,z: 1}, {x: -1,y: -1,z: 1}, {x: 0,y: -1,z: 1}, {x: 1,y: -1,z:1}]
    global.N_OFFSET = 14
    global.cells = [];
    global.cellList = [];
    if(interaction ==='cell subdivision'){
      VSCopy(cells, 1. / rCut, region)
      VSInt(cells)
    }else{
      global.dispHi = 0
      global.rNebrShell = 0.4
      global.nebrTab = [] 
      global.nebrNow = 0;
      global.nebrTabFac = 8
      global.nebrTabLen = 0
      global.nebrTabMax = nebrTabFac * nMol;

      VSCopy(cells, 1. / (rCut + rNebrShell), region);
      VSInt(cells)
    }

  }
}


