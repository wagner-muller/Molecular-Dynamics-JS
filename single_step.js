/**
 This code defines a function that executes a single simulation step for the simulation. The function uses different integrators and force computation methods depending on the input parameters passed to the simulation. The function also evaluates and accumulates some properties, adjusts the initial temperature, and prints a summary of the results at regular intervals.
*/

import { LeapfrogStep } from './Integrator/leapfrog_step.js'
import { ApplyBoundaryCond } from './Boundary/boundary_condition.js'
import { EvalProps } from './evaluate_properties.js'
import { AccumProps } from './accumulate_properties.js'
import { PrintSummary } from './print_summary.js'
import { AdjustInitTemp } from './TemperatureControl/adjust_initial_temperature.js'
import { ComputeForcesAllPairs } from './Interactions/compute_forces_all_pairs.js'
import { ComputeForcesCellList } from './Interactions/compute_forces_cell_list.js'
import { ComputeForcesNeighborsList } from './Interactions/compute_forces_neighbors.js'
import { BuildNebrList } from './NeighborList/build_neighbor_list.js'
import { PredictorStep, CorrectorStep } from './Integrator/predictor_corrector.js'

export const SingleStep  = () => {
    ++ stepCount;
    timeNow = stepCount * deltaT;
    if(integration === 'leapfrog'){
        LeapfrogStep(1);  
    }else if(integration ==='predictor-corrector'){
        PredictorStep()
    }

    ApplyBoundaryCond();
    if (interaction === 'cell_subdivision') {
        ComputeForcesCellList();
    } else if (interaction === 'all_pairs') {
        ComputeForcesAllPairs();
    } else if (interaction === 'neighbor_list'){
        if(nebrNow == 1){
        nebrNow = 0;
        dispHi = 0;
        BuildNebrList();
        }
        ComputeForcesNeighborsList()
    }
    if(integration === 'leapfrog'){
        LeapfrogStep(2);
    }else if(integration === 'predictor-corrector'){
        CorrectorStep()
        ApplyBoundaryCond();
    }
    EvalProps();
    if(stepCount < stepEquil){
        AdjustInitTemp ();
    }
    AccumProps(1); 

    if (stepCount % stepAvg == 0) {
        AccumProps(2);
        PrintSummary();
        AccumProps(0);
    } 
}