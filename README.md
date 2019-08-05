# Divide
evolution simulator written in javascript
## [Live Demo](https://jathrone.github.io/Divide/)

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

![Cells In Action!](../images/hd_divide_in_action.gif)
![Display Panel: Population](../images/population_panel.png)
![Display Panel: Individual](../images/individual_panel.png)

## Technical Info
 
#### Environment sensing
Every cell has eight sensory feelers, the directions of each is determined by the orientation of the cell. Each sensory feeler has a max sensing distance, and will report the distance to the closest object--if that object is another cell, the distance will be reported as a negative value.

 ```js
    getSenseDist(senseAng) {
        minFoodDist = Cell.MAX_SENSE_DIST;
        const food = this.board.food;
        for (let i = 0; i < food.length; i++) {
            if (calcDistance(this.pos, food[i].pos) < Cell.MAX_SENSE_DIST) {
                let currDist = distanceToCircleBoundary(this.pos, food[i].pos, senseAng, food[i].radius);
                if (currDist && (currDist < minFoodDist)) {
                    minFoodDist = currDist;
                }
            }
        }

        minCellDist = Cell.MAX_SENSE_DIST;
        const otherCells = this.board.cells.filter((cell) => (cell !== this))
        for (let i = 0; i < otherCells.length; i++) {
            if (calcDistance(this.pos, otherCells[i].pos) < Cell.MAX_SENSE_DIST) {
                let currDist = distanceToCircleBoundary(this.pos, otherCells[i].pos, senseAng, otherCells[i].radius);
                if (currDist && (currDist < minCellDist)) {
                    minCellDist = currDist;
                }
            }
        }

        if (minCellDist < minFoodDist) {
            return minCellDist - Cell.MAX_SENSE_DIST;
        } else {
            return minFoodDist;
        }
    }

    getSenseArray() {
        this.senseArray = []
        for (let i = 0; i < this.sensoryNum; i++) {
            let senseAng = (2 * Math.PI * i / this.sensoryNum + this.direction) % (2 * Math.PI);
            this.senseArray.push(this.getSenseDist(senseAng)/Cell.MAX_SENSE_DIST);
        }
        this.storeMemory();
    }
 ```
## Future Features
 * Driveable cell
 

