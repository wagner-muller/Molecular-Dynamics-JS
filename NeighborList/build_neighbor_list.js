/**
 This code builds the neighbor list of each atom using the neighbor list approach. The code uses a grid-based algorithm to divide the simulation box into cells and checks only the atoms in the same or neighboring cells for calculating the neighbor list.
*/

import { VDiv, VSub, VVSub, VProd, VLenSq, VSAdd, VMul, VSInt, VLinear, VZero, VSet, VAdd, VCellWrapAll} from '../utils.js'

export const BuildNebrList = () => {
    let dr = {}
    let invWid = {}
    let rs = {}
    let shift = {}

    let cc = {}
    let m1v = {}
    let m2v = {}
    let vOff = OFFSET_VALS

    let rrNebr = (rCut + rNebrShell)*(rCut + rNebrShell);
    VDiv(invWid, cells, region)

    for (let n = nMol; n < nMol + VProd(cells);n ++) {
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

    nebrTabLen = 0

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
                                if (VLenSq (dr) < rrNebr) {
                                    if (nebrTabLen >= nebrTabMax) console.log('Error! Too many neighbors')
                                    nebrTab[2 * nebrTabLen] = j1;
                                    nebrTab[2 * nebrTabLen + 1] = j2;
                                    ++ nebrTabLen;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}