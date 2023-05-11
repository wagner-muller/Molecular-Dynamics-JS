import { PropZero, PropAccum, PropAvg } from "./utils.js";

export const AccumProps = (icode) => {
    if (icode == 0) {
        PropZero(totEnergy);
        PropZero(kinEnergy); 
        PropZero(pressure);
    } else if (icode == 1) {
        PropAccum(totEnergy);
        PropAccum(kinEnergy);
        PropAccum(pressure);
    } else if (icode == 2) {
        PropAvg(totEnergy, stepAvg);
        PropAvg(kinEnergy, stepAvg);
        PropAvg(pressure, stepAvg);
    }
}