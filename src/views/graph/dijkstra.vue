<style>
body {
    font: 300 14px "Helvetica Neue", Helvetica;
}
</style>

<template>
    <div>
        <Graph v-for="(result, index) in resultArr" :key="index" :svgid="'svg_' + index" :g='result'></Graph>
    </div>
</template>

<script>
import Graph from "../components//graph";
import dijkstra from "../../utils//algorithms/dijkstra";
import graph from "algorithms/data_structures/graph";

export default {
    components: {
        Graph
    },
    data() {
        return {
            visible: false,
            g: {},
            resultArr: []
        };
    },
    created() {},
    mounted() {
        console.log("dijkstra", graph);
        const gA = new graph(false);
        const vertexs = ["1", "2", "3", "4", "5"];
        for (const vertex of vertexs) {
            gA.addVertex(vertex);
        }
        gA.addEdge("1", "2", 1);
        gA.addEdge("1", "4", 3);
        gA.addEdge("2", "4", 1);
        gA.addEdge("3", "5", 1);
        gA.addEdge("4", "5", 1);

        const resultDijkstra = dijkstra(gA, "1");
        console.log("mounted", gA, resultDijkstra);
        this.resultArr = resultDijkstra.resultArr;
    }
};
</script>


