/**
A function that adjusts the initial temperature of the simulation by scaling the velocities of the particles.
*/

import { VScale } from "../utils.js";

export const AdjustInitTemp = () => {
    kinEnInitSum += kinEnergy.val;
    if (stepCount % stepInitlzTemp == 0) {
        kinEnInitSum /= stepInitlzTemp;
        let vFac = velMag / Math.sqrt (2. * kinEnInitSum);
        for (let n = 0; n < nMol; n ++){
            VScale(mol[n].rv, vFac);
        } 
        kinEnInitSum = 0.;
    }
}