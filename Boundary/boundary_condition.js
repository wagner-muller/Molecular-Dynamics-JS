//The following code applies periodic boundary conditions to a set of molecular positions. 
//It uses the VWrapAll function for the utils.js

import { VWrapAll } from '../utils.js'

export const ApplyBoundaryCond = () => {
    for (let n = 0; n < nMol; n ++){
        VWrapAll(mol[n].r, region)
    }
}


