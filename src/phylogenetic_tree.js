const clock = require("./clock");
const { updateDisplayCell } = require("./util");

class TreeNode {
    constructor(cell) {
        this.value = cell;
        this.children = new Map();
    }
}

class PhylogeneticTree {
    constructor(displayArea) {
        this.cells = new TreeNode(null);
        this.displayArea = displayArea;

        this.svg = d3.select("#population svg")
            // .attr("width", 200)
            .attr("height", 400)
            // .attr("viewBox", [-30, -30, 200, 200]);

        this.g = this.svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 3);
        this.link = this.g.append("g");
        this.node = this.g.append("g");
    }

    updateAlive(cellsAlive) {
        this.cellsAlive = cellsAlive;
    }

    addCell(parent, child) {
        const found = this.findCell(this.cells, parent);
        if (found) {
            found.children.set(child, new TreeNode(child))
        } else {
            this.cells.children.set(child, new TreeNode(child));
        }
        this.render();
    }

    editCell(parent) {
        const found = this.findCell(this.cells, parent);
        found.value.deathTime = clock.time;
    }

    findCell(root, parent) {
        if (root.value === parent) {
            return root;
        }
        if (root.children.size === 0) {
            return false;
        }
        for (let i of root.children.keys()) {
            const returnVal = this.findCell(root.children.get(i), parent);
            if (returnVal) {
                return returnVal;
            }
        }
        return false;
    }

    render() {
        const currFrame = clock.time;
        const hNode = d3.hierarchy(this.cells, function children(d) { return Array.from(d.children.values()) })
        const tree = d3.tree().size([100, currFrame]);
        const root = tree(hNode);
        this.svg.attr("width", currFrame * 4 + 100)
            .attr("viewBox", [-10, -10, 30 + currFrame + 10, 130])

        root.descendants().forEach((d, i) => {
            if (!d.children && this.cellsAlive.map(o => o.id).includes(d.data.value.id)) {
                d.y = currFrame;
            }
            else if (d.data.value) {
                d.y = d.data.value.deathTime * 0.95;
            }
        })

        this.link
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-opacity", 1)
            // .attr("stroke-width", 0.2)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("stroke-width", function (d) { return 0.1 + 0.1 * Math.log2(d.target.count(e => !e.children && !e.deathTime).value) })
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));

        const newNode = this.node
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 0.01)
            .selectAll("g")
            .data(root.descendants().filter(function (d) { return d.data.value && !d.data.value.deathTime }))
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .on("click", d => {
                this.displayArea.displayCell = d.data.value;
                this.render();
            });

        newNode.append("circle")
            .attr("fill", d => d.data.value === this.displayArea.displayCell ? "red" : "black")
            .attr("r", 1);

        // newNode.append("text")
        //     .attr("dy", "0.31em")
        //     .attr("x", d => d.children ? -6 : 6)
        //     .attr("text-anchor", d => d.children ? "end" : "start")
        //     .text(d => {
        //         return d.data.value && d.data.value.deathTime ? d.data.value.deathTime : null
        //     })
        //     .clone(true).lower()
        //     .attr("stroke", "white");

    }
}
module.exports = PhylogeneticTree;