# Divide
evolution simulator written in javascript
## Background and Overview

Divide is an evolution simulator that transparently explores the parameters that drive evolution. Through interacting with Divide, users will be able to visualize natural selection in action and play a role in determining the relevant selective pressures.

In Divide, every single-cellular organism is represented by a sphere on a 2d canvas. To explore its surroundings, it is able to rotate as well as move forward in one direction. To consume food, it has a mouth part. Just as in real life, every movement correlates to an energy cost, while consuming food increases energy store. Creatures will be able to make simple movement decisions using sensory cues from its immediate surroundings. 

Once a cell has reached an energy threshold, it will divide in two, populating the canvas with more of itself. This allows selecting of the fittest creatures to take place. Finally, there's a chance for mutation during every division, allowing the genetic pool to adjust to the changing environment. 

## Functionality and MVP Features

In Divide,...
...the simulation will be able to:
 * populate the world with food
 * seed the world with cells
 
...the cells will be able to:
 * keep track of their internal energy state
 * make movement decisions based on their local environment
 * mutate and divide

...the users will be able to: 
 * Initialize a simulation
 * Interact with evolution parameters in real time

## Architecture and Technologies 
 * JavaScript for game logic
 * HTML Canvas for rendering
 
## Implementation Timeline
 * (19-05-16) create canvas for simulation rendering; create cell object
 * (19-05-17) create modal for user-controlled parameters
 

