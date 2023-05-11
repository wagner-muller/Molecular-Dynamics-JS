//The code applies the Predictor-Corrector algorithm to integrate the equations of motion. The Predictor step uses a 4th order Adams-Bashforth predictor, and the Corrector step uses a 4th order Adams-Moulton corrector. Overall, this algorithm is more accurate than the Leapfrog algorithm, but it is also more computationally expensive.


//The Predictor step first predicts the position and velocity of the molecules at the next time step using the current position, velocity, and acceleration, as well as the acceleration at the previous two time steps. The constants cr and cv are the coefficients used in the algorithm, while wr and wv are weights used to scale the contributions of the previous accelerations to the predicted position and velocity.
import { PCR4, PCV4 } from "../utils.js"

export const PredictorStep = () => {
    const cr = [19, -10, 3]
    const cv = [27, -22, 7]
    const div = 24.
    const wr = (deltaT*deltaT) / div
    const wv = deltaT / div; 
    for (let n = 0; n < nMol; n ++){
        mol[n].rvo = {...mol[n].rv}
        mol[n].ro = {...mol[n].r};
        PCR4(mol[n].r, mol[n].r, mol[n].rv, mol[n].ra, mol[n].ra1, mol[n].ra2, wr, cr)
        PCV4(mol[n].r, mol[n].ro, mol[n].rv, mol[n].ra, mol[n].ra1, mol[n].ra2, wv, cv)
        mol[n].ra2 = {...mol[n].ra1}
        mol[n].ra1 = {...mol[n].ra}
    }
}


//The Corrector step corrects the predicted values using the computed acceleration to obtain more accurate values of the position, velocity, and acceleration at the next time step. 

export const CorrectorStep= () => {
    
    const cr = [3., 10., -1.]
    const cv = [7., 6., -1.]
    const div = 24.
    const wr = (deltaT * deltaT) / div
    const wv = deltaT / div

    for (let n = 0; n < nMol; n ++){
        PCR4(mol[n].r, mol[n].ro, mol[n].rvo, mol[n].ra, mol[n].ra1, mol[n].ra2, wr, cr)
        PCV4(mol[n].r, mol[n].ro, mol[n].rv, mol[n].ra, mol[n].ra1, mol[n].ra2, wv, cv)
    }
}

