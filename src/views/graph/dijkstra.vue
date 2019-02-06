<style>
body {
    font: 300 14px 'Helvetica Neue', Helvetica;
}
.svg {
    border: 1px solid #f3f3f3;
    width: 100%;
    height: 100%;
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
.demo-split {
    height: 1068px;
    border: 1px solid #dcdee2;
}
.demo-split-pane {
    padding: 10px;
    width: 100%;
    height: 100%;
}
.demo-split-pane.no-padding {
    height: 1068px;
    padding: 0;
}
.result-wrap {
    overflow-x: hidden;
    overflow-y: scroll;
}
</style>

<template>
    <div class="demo-split">
        <Split v-model="split3">
            <div class="demo-split-pane no-padding" slot="left">
                <Split mode="vertical" v-model="split4">
                    <div class="demo-split-pane" slot="top">
                        <svg class="svg" id="svg2">
                            <g class="output" id="g2"></g>
                        </svg>
                    </div>
                    <div class="demo-split-pane" slot="bottom">
                        <svg class="svg" id="svg1">
                            <g class="output" id="g1"></g>
                        </svg>
                    </div>
                </Split>
            </div>
            <div class="demo-split-pane result-wrap" slot="right">
                <button @click="previousMove">上一步</button>
                <button @click="nextMove">下一步</button>
                <div v-if="resultArr[currentMoveIndex]">
                    <div
                        :key="index"
                        v-for="(mes, index) in resultArr[currentMoveIndex].message"
                    >{{mes}}</div>
                    <br>
                    <br>
                </div>
            </div>
        </Split>
    </div>
</template>

<script>
import Graph from '../components/graph';
import dijkstra from '../../utils/algorithms/dijkstra';
import graph from 'algorithms/data_structures/graph';

export default {
    components: {
        Graph
    },
    data() {
        return {
            visible: false,
            g: {},
            svg: '',
            render: null,
            resultArr: [],
            vertexs: ['1', '2', '3', '4', '5'],
            edges: ['1 2 1', '1 4 3', '2 4 1', '3 5 1', '4 5 1'],
            startNode: '1',
            split3: 0.5,
            split4: 0.5,
            currentMoveIndex: 0,
            totalMoveNum: 0
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
        this.totalMoveNum = this.resultArr.length;

        this._initStaticGraph();
        this._initDynamicGraph();
    },
    methods: {
        _initStaticGraph() {
            const g = new dagreD3.graphlib.Graph().setGraph({});
            this.vertexs.forEach(function(node) {
                g.setNode(node, { label: node });
            });
            this.edges.forEach(row => {
                const arr = row.split(' ');
                g.setEdge(arr[0], arr[1], { label: arr[2] });
            });
            const svg = d3.select('#svg1');
            const inner = svg.select('#g1');
            const zoom = d3.zoom().on('zoom', function() {
                inner.attr('transform', d3.event.transform);
            });
            svg.call(zoom);
            const render = new dagreD3.render();
            render(svg, g);
        },
        _initDynamicGraph() {
            const g = new dagreD3.graphlib.Graph().setGraph({});
            const startNode = this.startNode;
            this.vertexs.forEach(function(node) {
                g.setNode(node, {
                    label: `${node}(${node === startNode ? '0' : 'Infinity'})`
                });
            });
            this.edges.forEach(row => {
                const arr = row.split(' ');
                g.setEdge(arr[0], arr[1], { label: arr[2] });
            });
            this.svg = d3.select('#svg2');
            const inner = this.svg.select('#g2');
            const zoom = d3.zoom().on('zoom', function() {
                inner.attr('transform', d3.event.transform);
            });
            this.svg.call(zoom);
            this.render = new dagreD3.render();
            this.render(this.svg, g);
            this.g = g;
        },
        nextMove() {
            if (this.currentMoveIndex < this.totalMoveNum - 1) {
                this.currentMoveIndex++;
                this._renderGraph();
            } else {
                return;
            }
        },
        previousMove() {
            if (this.currentMoveIndex > 0) {
                this.currentMoveIndex--;
                this._renderGraph();
            } else {
            }
        },
        _renderGraph() {
            const { curDistance, currNodeArr } = this.resultArr[
                this.currentMoveIndex
            ].actions;
            for (const [node, distance] of Object.entries(curDistance)) {
                const actionObj = {};
                actionObj[node] = {
                    label: `${node}(${distance})`
                };
                if (currNodeArr.includes(node)) {
                    actionObj[node]['style'] = 'fill: #3fe';
                }
                this.g.setNode(node, actionObj[node]);
            }
            this.render(this.svg, this.g);
        }
    }
};
</script>


