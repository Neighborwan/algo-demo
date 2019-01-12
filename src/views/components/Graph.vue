<style>
.node rect {
    stroke: #333;
    fill: #fff;
}

.edgePath path {
    stroke: #333;
    fill: #333;
    stroke-width: 1.5px;
}
</style>

<template>
    <div>
        <svg width='360' height='460'>
            <g></g>
        </svg>
    </div>
</template>


<script>
export default {
    props: {
        msg: String
    },
    mounted() {
        // Create a new directed graph
        var g = new dagreD3.graphlib.Graph().setGraph({});

        // States and transitions from RFC 793
        var states = ["1", "2", "3", "4", "5"];

        // Automatically label each of the nodes
        states.forEach(function(state) {
            g.setNode(state, { label: state });
        });

        // Set up the edges
        g.setEdge("1", "2", { label: "1" });
        g.setEdge("1", "4", { label: "1" });
        g.setEdge("2", "4", { label: "1" });
        g.setEdge("3", "5", { label: "1" });
        g.setEdge("4", "5", { label: "1" });

        // Set some general styles
        g.nodes().forEach(function(v) {
            var node = g.node(v);
            node.rx = node.ry = 5;
        });
        var svg = d3.select("svg"),
            inner = svg.select("g");

        // Set up zoom support
        var zoom = d3.zoom().on("zoom", function() {
            inner.attr("transform", d3.event.transform);
        });
        svg.call(zoom);

        // Create the renderer
        var render = new dagreD3.render();
        console.log("​created -> render", g, render);

        // Run the renderer. This is what draws the final graph.
        render(svg, g);
    }
};
</script>
