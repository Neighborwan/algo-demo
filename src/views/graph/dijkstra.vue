<style>
body {
    font: 300 14px 'Helvetica Neue', Helvetica;
}
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
        <!-- <Graph :g="result" :key="index" :svgid="'svg_' + index" v-for="(result, index) in resultArr"></Graph> -->
        <svg id="svg1" width="660" height="460"><g class="output"></g></svg>
    </div>
</template>

<script>
import Graph from '../components//graph';
import dijkstra from '../../utils//algorithms/dijkstra';
import graph from 'algorithms/data_structures/graph';

export default {
    components: {
        Graph
    },
    data() {
        return {
            visible: false,
            g: {},
            resultArr: [],
            vertexs: ['1', '2', '3', '4', '5'],
            edges: ['1 2 1', '1 4 3', '2 4 1', '3 5 1', '4 5 1']
        };
    },
    created() {},
    mounted() {
        console.log('dijkstra', graph);
        const gA = new graph(false);
        for (const vertex of this.vertexs) {
            gA.addVertex(vertex);
        }
        gA.addEdge('1', '2', 1);
        gA.addEdge('1', '4', 3);
        gA.addEdge('2', '4', 1);
        gA.addEdge('3', '5', 1);
        gA.addEdge('4', '5', 1);

        const resultDijkstra = dijkstra(gA, '1');
        console.log('mounted', gA, resultDijkstra);
        this.resultArr = resultDijkstra.resultArr;

        this._initGraph();
    },
    methods: {
        _initGraph() {
            const g = new dagreD3.graphlib.Graph().setGraph({});
            this.vertexs.forEach(function(node) {
                g.setNode(node, { label: node });
            });
            this.edges.forEach(row => {
                const arr = row.split(' ');
                g.setEdge(arr[0], arr[1], { label: arr[2] });
            });
            const svg = d3.select('#svg1');
            const inner = svg.select('g');
            const zoom = d3.zoom().on('zoom', function() {
                inner.attr('transform', d3.event.transform);
            });
            svg.call(zoom);
            const render = new dagreD3.render();
            render(svg, g);
        }
    }
};
</script>


