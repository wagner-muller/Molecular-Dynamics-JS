/** 
 Main simulation script for the simulation.Starts by setting up simulation parameters, the job, and performing single simulation steps. Calculates and outputs execution time.
*/

import { SetParams } from './setup_parameters.js'
import { SetupJob } from './setup_job.js'
import { SingleStep } from './single_step.js'

const main = async () => {
  var start = new Date().getTime()

  await SetParams(); 
  SetupJob();
  while (stepCount <= stepLimit) {
    SingleStep();
  }
  var end = new Date().getTime()
  var time = end - start
  console.log(`Execution time was ${time/1000} seconds`)
}

main();