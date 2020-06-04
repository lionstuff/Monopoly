'use strict';

const routes = [
  {
    path: '/',
    name: 'default',
    // component: Default,
    component: () => import(/* webpackChunkName: 'default' */ '@/views/Default.vue'),
  },
];

export default routes;
