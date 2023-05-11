/*
The following code defines three functions for initializing the coordinates, velocities, and accelerations. InitCoords initializes the coordinates of the particles in the simulation based on the dimensions of the simulation box and the number of unit cells. InitVels initializes the velocities of the particles in the simulation with random values, scaled by a specified velocity magnitude. The function also calculates and subtracts the center-of-mass velocity from each particle's velocity to ensure a net zero velocity for the system. InitAccels initializes the accelerations of the particles in the simulation to zero. If the simulation is using a predictor-corrector integration scheme, additional arrays for storing intermediate acceleration values are also initialized for each particle.
*/

import { VDiv, VSet, VMul, VVSAdd, VZero, VRand, VScale, VVAdd } from "./utils.js";

export const InitCoords = () => {
    let gap = {x: 0, y: 0, z:0}
    let c = {x: 0, y: 0, z: 0}
    VDiv(gap, region, initUcell);
    let n = 0
    for (let nz = 0; nz < initUcell.z; nz ++) {
        for (let ny = 0; ny < initUcell.y; ny ++) {
            for (let nx = 0; nx < initUcell.x; nx ++) {
                VSet (c, nx + 0.25, ny + 0.25, nz + 0.25);                
                VMul(c, c, gap);
                VVSAdd (c, -0.5, region);      
                for(let j = 0; j< 4; j++){
                    mol[n].r.x = c.x; 
                    mol[n].r.y = c.y; 
                    mol[n].r.z = c.z; 
                    if(j != 3){
                        if(j != 0) mol[n].r.x += 0.5 * gap.x
                        if(j != 1) mol[n].r.y += 0.5 * gap.y
                        if(j != 2) mol[n].r.z += 0.5 * gap.z
                    }
                    ++ n; 
                }  
            }
        }
    }
}

export const InitVels = () => {
    VZero(vSum); 
    for (let n = 0; n < nMol; n ++){
        VRand(mol[n].rv);
        VScale(mol[n].rv, velMag); 
        VVAdd(vSum, mol[n].rv);
    }
    for (let n = 0; n < nMol; n ++){
        VVSAdd(mol[n].rv, - 1/nMol, vSum); 
    }
}
   
export const InitAccels = () => {
    for (let n = 0; n < nMol; n ++){
        VZero (mol[n].ra); 
        if(integration === 'predictor-corrector'){
            VZero (mol[n].ra1); 
            VZero (mol[n].ra2); 
        }
    }
}