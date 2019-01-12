<style>
body {
    font: 300 14px "Helvetica Neue", Helvetica;
}
</style>

<template>
    <div>
        <Graph :g='g'></Graph>
    </div>
</template>

<script>
import Graph from "../components//graph";
import dijkstra from "../../utils//algorithms/dijkstra";

export default {
    components: {
        Graph
    },
    data() {
        return {
            visible: false,
            g: {}
        };
    },
    created() {},
    mounted() {
        console.log("dijkstra", dijkstra);
    }
};
</script>


