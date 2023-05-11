//This code computes the forces using the cell list approach. The cell list is a spatial data structure that partitions the simulation box into a grid of cells and assigns each particle to one or more cells. By doing this, only the interactions between particles within the same or adjacent cells are considered, reducing the number of pair interactions to be computed and resulting in a significant speedup. The code initializes the cell list, assigns particles to cells, and loops through all pairs of particles within neighboring cells. For each pair, it computes the pairwise interaction potential and forces using the Lennard-Jones potential, and accumulates the potential energy and virial. Finally, it updates the forces on each particle.

import { VSub, VZero, VWrapAll, VLenSq, VVSAdd, VSInt, VLinear, VDiv, VProd, VSAdd, VMul, VSet, VAdd, VCellWrapAll, VVSub } from "../utils.js"

export const ComputeForcesCellList = () => {
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
    VDiv(invWid, cells, region);

    for (let n = nMol; n < nMol + VProd (cells); n ++) {
       cellList[n] = -1;
    }

    for(let n = 0; n < nMol; n++){
       VSAdd(rs, mol[n].r, 0.5, region);
       VMul(cc, rs, invWid);
       VSInt(cc)
       let c = VLinear(cc, cells) + nMol;
       cellList[n] = cellList[c];
       cellList[c] = n;
    }

    for(let n=0; n < nMol; n++){
        VZero(mol[n].ra)
    }

   uSum = 0;
   virSum = 0

    for (let m1z = 0; m1z < cells.z; m1z ++) {
        for (let m1y = 0; m1y < cells.y; m1y ++) { 
            for (let m1x = 0; m1x < cells.x; m1x ++) {
                VSet(m1v, m1x, m1y, m1z);
                let m1 = VLinear(m1v, cells) + nMol;
                for (let offset = 0; offset < N_OFFSET; offset ++) {
                    VAdd(m2v, m1v, vOff[offset]);
                    VZero(shift);
                    VCellWrapAll(m2v, shift);
                    let m2 = VLinear(m2v, cells) + nMol;
                    for (let j1 = cellList[m1]; j1 >= 0; j1 = cellList[j1]){
                        for (let j2 = cellList[m2]; j2 >= 0; j2 = cellList[j2]){
                            if (m1 != m2 || j2 < j1) {
                                VSub(dr, mol[j1].r, mol[j2].r);
                                VVSub(dr, shift);
                                rr = VLenSq(dr);
                                if (rr < rrCut) {
                                    rri = 1. / rr;
                                    rri3 = rri * rri * rri;
                                    fcVal=48.*rri3*(rri3-0.5)*rri;
                                    uVal = 4. * rri3 * (rri3 - 1.) + 1.;
                                    VVSAdd (mol[j1].ra, fcVal, dr);
                                    VVSAdd (mol[j2].ra, - fcVal, dr);
                                    uSum += uVal;
                                    virSum += fcVal * rr;
                                }
                            }
                        }
                    }

                }
            }
        }
    }


}
