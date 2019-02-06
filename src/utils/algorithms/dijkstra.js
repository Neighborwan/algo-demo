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
    var currNode;
    let currNodeArr = [];
    var resultArr = [];
    let message = ['初始化'];
    let actions = {};
    var q = new PriorityQueue();
    distance[s] = 0;
    graph.vertices.forEach(function(v) {
        if (v !== s) {
            distance[v] = 'Infinity';
        }
        q.insert(v, distance[v]);
    });

    actions['curDistance'] = Object.assign({}, distance);
    actions['currNodeArr'] = [];
    resultArr.push({
        message,
        actions: JSON.parse(JSON.stringify(actions))
    });

    var relax = function(v) {
        var newDistance = distance[currNode] + graph.edge(currNode, v);
        message.push('----------------------');
        message.push(`  针对邻居节点 ${v},  新距离为: ${newDistance}`);
        if (newDistance < distance[v]) {
            distance[v] = newDistance;
            previous[v] = currNode;
            q.changePriority(v, distance[v]);
            message.push(
                `  因为新距离 < 旧距离, 所以更新 d[${v}] 为${newDistance}`
            );
        } else {
            message.push(`  因为新距离 >= 旧距离, 所以不更新 d[${v}]`);
        }
    };
    while (!q.isEmpty()) {
        message = [];
        actions = {};
        currNode = q.extract();
        currNodeArr.push(currNode);
        actions['currNode'] = currNode;
        message.push(
            `当前节点是: ${currNode}, 他的邻居节点为: ${graph.neighbors(
                currNode
            )}`
        );
        graph.neighbors(currNode).forEach(relax);
        message.push('----------------------');
        message.push(
            `更新后: d数组为: ${JSON.stringify(distance)}`,
            `p数组为: ${JSON.stringify(previous)} `
        );
        actions['curDistance'] = Object.assign({}, distance);
        actions['currNodeArr'] = [].concat(currNodeArr);
        resultArr.push({
            message,
            actions: JSON.parse(JSON.stringify(actions))
        });
    }
    resultArr.push({
        message: ['结束啦'],
        actions
    });
    return {
        resultArr
    };
}

module.exports = dijkstra;
