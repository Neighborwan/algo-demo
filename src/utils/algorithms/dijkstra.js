'use strict';

var PriorityQueue = require('algorithms/data_structures/priority_queue');

/**
 * Calculates the shortest paths in a graph to every node from the node s
 * with Dijkstra's algorithm
 *
 * @param {Object} graph An adjacency list representing the graph
 * @param {string} start the starting node
 *
 */
function dijkstra(graph, s) {
    var distance = {};
    var previous = {};
    var q = new PriorityQueue();
    // Initialize
    distance[s] = 0;
    graph.vertices.forEach(function(v) {
        if (v !== s) {
            distance[v] = Infinity;
        }
        q.insert(v, distance[v]);
    });

    var currNode;
    var g = new dagreD3.graphlib.Graph().setGraph({});
    var resultArr = [];
    var relax = function(v) {
        if (!g.hasNode(v)) {
            g.setNode(v, { label: v });
        }
        var newDistance = distance[currNode] + graph.edge(currNode, v);
        console.log(`  针对邻居节点 ${v},  新距离为: ${newDistance}`);
        if (newDistance < distance[v]) {
            g.setEdge(currNode, v, { label: graph.edge(currNode, v) });
            if (previous[v]) {
                // 方向可能导致 bug
                g.removeEdge(v, previous[v]);
            }
            distance[v] = newDistance;
            previous[v] = currNode;
            q.changePriority(v, distance[v]);
            console.log(
                `  因为新距离 < 旧距离, 所以更新 d[${v}] 为${newDistance}`
            );
        } else {
            console.log(`  因为新距离 >= 旧距离, 所以不更新 d[${v}]`);
        }
    };
    while (!q.isEmpty()) {
        currNode = q.extract();
        console.log('=====================');
        console.log(
            '  当前节点是: ',
            currNode,
            ' 他的邻居节点为: ',
            graph.neighbors(currNode)
        );
        if (!g.hasNode(currNode)) {
            g.setNode(currNode, { label: currNode });
        }
        graph.neighbors(currNode).forEach(relax);
        console.log(`    更新后: d数组为`, distance, `p数组为 `, previous);
        const _g = JSON.parse(JSON.stringify(g));
        _g.__proto__ = g.__proto__;
        delete _g['nodes'];
        console.log('fuck   you', _g)
        resultArr.push(_g);
    }
    return {
        distance: distance,
        previous: previous,
        resultArr
    };
}

module.exports = dijkstra;
