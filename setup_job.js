/**
Sets up the simulation job by initializing coordinates, velocities, and accelerations for the molecular system, accumulating properties, and logging data to a file.
*/

import { InitCoords, InitVels, InitAccels } from './initial_condition.js'
import { AccumProps } from './accumulate_properties.js';
import fs from 'fs'

export const SetupJob = () => {
    stepCount = 0;
    countVel = 0;
    interaction === 'neighbor_list' ? nebrNow = 1 : null

    InitCoords();
    InitVels();
    InitAccels();
    AccumProps(0);

    let data = `${'Timestep'.padStart(8)}   ${'Time'.padStart(8)}   ${'sum(v)'.padStart(8)}   ${'TotEnergy'.padStart(8)}   ${'KinEnergy'.padStart(8)}   ${'Press'.padStart(5)} \n`

    console.log(data)

    fs.appendFile('./log.txt',data, err => {
        if(err) throw err
    })
}