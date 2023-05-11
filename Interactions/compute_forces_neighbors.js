//This code computes the forces using the neighbors list approach. The neighbor list approach is a common algorithm used in MD simulations to improve the computational efficiency by reducing the number of pairwise calculations of interatomic forces. Instead of iterating over all possible pairs of atoms, the neighbor list approach builds a list of atoms that are within a certain distance (cutoff distance) of each other. This list is then used to iterate over pairs of neighboring atoms and compute the forces between them, reducing the number of calculations required. In the code, the neighbor list is represented by the array nebrTab, which contains pairs of indices of neighboring atoms. For each pair of neighboring atoms, the code calculates the distance between them, wraps the distance vector using the periodic boundary conditions, and checks if the distance is smaller than the cutoff distance rCut. If the distance is smaller than rCut, the Lennard-Jones potential is used to calculate the interatomic forces and potential energy between the two atoms. The forces and energy are accumulated for each atom and used to update their positions and velocities in the simulation.

import { VSub, VZero, VWrapAll, VLenSq, VVSAdd, VSInt, VLinear, VDiv, VProd, VSAdd, VMul, VSet, VAdd, VCellWrapAll, VVSub } from "../utils.js"

export const ComputeForcesNeighborsList = () => {
    let fcVal = 0;
    let rr = 0;
    let rrCut = 0;
    let rri = 0;
    let rri3 = 0;
    let uVal = 0;

    let dr = {}
    let invWid = {}
    let rs = {}
    let shift = {}

    let cc = {}
    let m1v = {}
    let m2v = {}
    let vOff = OFFSET_VALS

    rrCut = rCut*rCut

    for(let n=0; n < nMol; n++){
        VZero(mol[n].ra)
    }

    uSum = 0;
    virSum = 0

    for (let n = 0; n < nebrTabLen; n++){
        let j1 = nebrTab[2 * n];
        let j2 = nebrTab[2 * n + 1];
        VSub(dr, mol[j1].r,mol[j2].r);
        VWrapAll(dr, region)
        rr = VLenSq(dr)
        if(rr < rrCut){
            rri = 1. / rr;
            rri3 = rri * rri * rri;
            fcVal = 48. * rri3 * (rri3-0.5)*rri;
            uVal = 4. * rri3 * (rri3 - 1) + 1;
            VVSAdd (mol[j1].ra, fcVal, dr);
            VVSAdd (mol[j2].ra, - fcVal, dr);
            uSum += uVal;
            virSum += fcVal * rr;
        }
    }

}
