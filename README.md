# Divide
evolution simulator written in javascript
## Background and Overview

Divide is an evolution simulator that transparently explores the parameters that drive evolution. Through interacting with Divide, users will be able to visualize natural selection in action and play a role in determining the relevant selective pressures.

In Divide, every single-cellular organism is represented by a circle on a 2d canvas. To explore its surroundings, it is able to rotate as well as move forward. Cells can maneuver itself around to absorb food particles. Just as in real life, every movement correlates to an energy cost, while consuming food increases the energy store. A cell detects its immediate surroundings with sensory feelers, and can make movement decisions by combining these sensory cues. Every cell contains a different movement matrix, and so would respond uniquely to its environment.

Once a cell reaches an energy threshold, it will divide in two, passing on its movement matrix with minor mutations. This process allows selection of the fittest to take place. 

## Features

 * Simulation logic for initializing canvas with randomly seeded food and cells
 * Cells maintain an internal energy state, will sense its surroundings through feelers, can accurately consume food and other cells, divide, and mutate during division
 * Cells keep track of forward and angular velocity vectors, calculate acceleration vectors based on its movement matrix and perceived environment, and update its velocities every timestep to reflect the acceleration. 
 * Draggable, interactive portal with multiple tabs displaying: RT footage of selected cell, event-driven and dynamically updated population hierarchical tree with selectable nodes, and interactive controls for pausing and altering physical parameters of simulation. 

## Technologies 
 * All simulation and portal logic was implement in vanilla JavaScript
 * HTML Canvas for rendering
 * d3.js was used in creating hierarchical tree
 
## Screenshots

## Technical Info
 
## Future Features
 * Driveable cell
 

