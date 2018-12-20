const home = require('./views/index.vue');

const routers = [
    // {
    //     path: '/',
    //     meta: {
    //         title: ''
    //     },
    //     component: (resolve) => require(['./views/index.vue'], resolve)
    // }
    {
        path: '/',
        component: home
    },
    {
        path: '/graph/dijkstra',
        component: (resolve) => require(['./views/graph/dijkstra.vue'], resolve)
    }
];
export default routers;