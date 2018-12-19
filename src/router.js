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
    }
];
export default routers;