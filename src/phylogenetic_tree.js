class PhylogeneticTree {
    constructor() {
        this.cells = new Map();
        window.d3 = d3;
        window.cellsMap = this.cells;

        this.svg = d3.select("#population svg")
            .attr("width", 200)
            .attr("height", 200)
            .attr("viewBox", [-30, -30, 200, 200]);

        this.g = this.svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10);
        this.link = this.g.append("g");
        this.node = this.g.append("g");
    }

    addCell(parent, child) {
        const found = this.findCell(this.cells, parent);
        if (found) {
            found.set(child, new Map())
        } else {
            this.cells.set(child, new Map());
        }
        this.render();
    }

    findCell(root, parent) {
        if (root.has(parent)) {
            return root.get(parent)
        }
        if (root.size === 0) {
            return false;
        }
        for (let i of root.keys()) {
            const returnVal = this.findCell(root.get(i), parent);
            if (returnVal) {
                return returnVal;
            }
        }
        return false;
    }

    render() {
        const hNode = d3.hierarchy(this.cells, function children(d) { return Array.from(d.values()) })
        const tree = d3.tree().size([100, 100]);
        const root = tree(hNode);
        debugger;
        this.link
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.4)
            .attr("stroke-width", 1.5)
            .selectAll("path")
            .data(root.links())
            .join("path")
            .attr("d", d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x));
        
        this.node
            .attr("stroke-linejoin", "round")
            .attr("stroke-width", 0.01)
            .selectAll("g")
            .data(root.descendants())
            .join("g")
            .attr("transform", d => `translate(${d.y},${d.x})`);

        // node.append("circle")
        //     .attr("fill", d => d.children ? "#555" : "#999")
        //     .attr("r", 2);
    }
}

module.exports = PhylogeneticTree;