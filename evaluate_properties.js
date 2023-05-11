/** 
 Evaluates the energies (kinetic and total, the potential can be obtained by substraction) and pressure of the system
*/ 

import { VVAdd, VLenSq, VZero } from "./utils.js";

export const EvalProps = () => {
    let vv
    VZero(vSum); 
    vvSum = 0; 
    let vvMax = 0

    for (let n = 0; n < nMol; n ++){
        VVAdd(vSum, mol[n].rv);
        vv = VLenSq(mol[n].rv); 
        vvSum += vv;
        interaction === 'neighbor_list' ? vvMax = Math.max(vvMax, vv) : null
    }
    if(interaction === 'neighbor_list'){
        dispHi += Math.sqrt (vvMax) * deltaT;
        if(dispHi > 0.5 * rNebrShell) {
            nebrNow = 1;
        }
    }
    kinEnergy.val = 0.5 * vvSum / nMol;
    totEnergy.val = kinEnergy.val + uSum / nMol;
    pressure.val = density * (vvSum + virSum) / (nMol * NDIM);
}