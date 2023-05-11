//The following code applies the Leapfrog algorithm to integrate the equations of motion for a set of particles. The Leapfrog algorithm is a time-stepping method used to numerically integrate the equations of motion for a system of particles in classical mechanics. The algorithm is a second-order method, meaning that it is more accurate than first-order methods like the Euler method. In the first step, the velocities are updated based on the current accelerations, while the positions are updated based on the updated velocities. During the second half-step, the velocities are updated based on the updated accelerations. 

import { VVSAdd } from "../utils.js";

export const LeapfrogStep = (part) => {
    if (part == 1) {
        for (let n = 0; n < nMol; n ++){
            VVSAdd(mol[n].rv, 0.5 * deltaT, mol[n].ra);
            VVSAdd(mol[n].r, deltaT, mol[n].rv); 
        }
    } else {
        for (let n = 0; n < nMol; n ++){
            VVSAdd(mol[n].rv, 0.5 * deltaT, mol[n].ra)
        }
    }
}

