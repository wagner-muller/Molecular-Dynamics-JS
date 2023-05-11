# Molecular-Dynamics-JS
This is a molecular dynamics simulation code written in JavaScript. The code is executed by simply typing node main.js in the command line. The units used are in Lennard-Jones units, so all inputs must be given in reduced units.

The code is designed for simple monoatomic molecules or beads, but its strength lies in the possibility of comparing different integration schemas (LeapFrog or Predictor-Corrector) as well as different ways of computing forces (all pairs, cell list or neighbour list). During the simulation, the code prints the kinetic and total energy as well as the pressure. 

## Usage

The code does not require any additional package besides node. To execute, simply clone the repository and type *node main.js* in the command line. The user will be prompted to input simulation parameters such as simulation time, box size, etc. The user will also be asked to select which kind of force computation method/integration algorithm will be used.

## Simulation Parameters

The following simulation parameters must be provided by the user:

Density

Timestep

Equilibration time

Simulation time

Output frequency

Box size

### Force computation methods:

All pairs

Cell list

Neighbour list


### Integration Schemas

The user can select one of the following integration schemas:

LeapFrog

Predictor-Corrector

## Output

At the end of the simulation, the code will print out the total simulation time, as well as the kinetic and total energy and the pressure.

## Future Updates

In the future, the code will be expanded to include the calculation of RDFs and perform calculations in other ensembles that are not NVE.

