//This code computes the forces using the all pairs approach. This approach computes the interaction between all pairs of particles in the system, in contrast to other approaches that use approximations to reduce the computational cost of the simulation. The code computes the force between pairs of particles that are closer than a given cutoff distance, and accumulates the potential energy and virial of the system.

import { VSub, VZero, VWrapAll, VLenSq, VVSAdd } from "../utils.js"

export const ComputeForcesAllPairs = () => {
    let fcVal = 0;
    let rr = 0;
    let rrCut = 0;
    let rri = 0;
    let rri3 = 0;

   let dr = {}
   rrCut = rCut*rCut
   for(let n=0; n < nMol; n++){
       VZero(mol[n].ra)
   }

   uSum = 0;
   virSum = 0

   for (let j1 = 0; j1<nMol-1; j1++){
       for(let j2 = j1+1; j2 < nMol; j2++){
        VSub(dr,mol[j1].r,mol[j2].r)
        VWrapAll(dr, region)
        rr = VLenSq(dr)
        if(rr < rrCut){
            rri = 1/rr;
            rri3 = rri* rri * rri;
            fcVal = 48*rri3*(rri3-0.5)*rri
            VVSAdd(mol[j1].ra,fcVal,dr)
            VVSAdd(mol[j2].ra,-fcVal,dr)
            uSum += 4*rri3*(rri3-1)+1
            virSum += fcVal * rr
        }
       }
   }
}
