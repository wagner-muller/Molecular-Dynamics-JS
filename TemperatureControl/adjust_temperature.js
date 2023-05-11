import { VLenSq, VScale } from "../utils.js";

export const AdjustTemp = () => {
    let vvSum = 0;
    for (let n = 0; n < nMol; n ++){
        vvSum += VLenSq(mol[n].rv)
    }
    vFac = velMag / sqrt (vvSum / nMol);

    for (let n = 0; n < 500; n ++){
        VScale (mol[n].rv, vFac);
    }

}