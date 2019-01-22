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
        <svg :id="svgid" width='660' height='460'>
            <!-- <g :id="'g_' + svgid"></g> -->
        </svg>
    </div>
</template>


<script>
export default {
    props: {
        msg: String,
        g: {},
        svgid: String
    },
    mounted() {
        // Create a new directed graph
        const _g = this._props.g;
        delete _g['nodes'];
        console.log('_g', _g.nodes(), _g.edges(), this._props.svgid)
        _g.nodes = _g._nodes;
        var g = new dagreD3.graphlib.Graph().setGraph({});

        // States and transitions from RFC 793
        var states = ["1", "2", "3", "4", "5"];

        // Automatically label each of the nodes
        states.forEach(function(state) {
            g.setNode(state, { label: state });
        });

        // Set up the edges
        g.setEdge("1", "2", { label: "1" });
        g.setEdge("1", "4", { label: '333' });
        g.setEdge("2", "4", { label: "1" });
        g.setEdge("3", "5", { label: "1" });
        g.setEdge("4", "5", { label: "1" });

        // Set some general styles
        g.nodes().forEach(function(v) {
            var node = g.node(v);
            node.rx = node.ry = 5;
        });
        const svgId = '#' + this._props.svgid;
        const g_svgId = '#' + 'g_' + this._props.svgid;
        var svg = d3.select(svgId),
            inner = svg.select("g");
        console.log('++++++++++++++++', g);

        // Set up zoom support
        var zoom = d3.zoom().on("zoom", function() {
            inner.attr("transform", d3.event.transform);
        });
        svg.call(zoom);

        // Create the renderer
        var render = new dagreD3.render();

        // Run the renderer. This is what draws the final graph.
        render(svg, g);
    }
};
</script>
