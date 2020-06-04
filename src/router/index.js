import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

// /**
//  * @name [TODO]
//  * @description Подготовка роутов на основе имён файлов из дериктории @/views
//  *              для автоматического построения и подключения путей для навигации
//  */

// const dir = '@/views';
// const requireRoute = require.context('@/views', true, /\.vue$/);
// const routes = [];

// const routeProps = (rout) => {
//   try {
//     return {
//       map: { lat: 'lat'/* rout.query.lat */, lng: 'lng'/* rout.query.lng */ },
//     };
//   } catch (error) {

//   }
// };

// requireRoute.keys().forEach(fileName => {
//   const routeName = fileName
//     .replace(/^\.\//, '')
//     .replace(/\.\w+$/, '')
//     .toLowerCase();

//   const targetPath = fileName.replace(/^\.\//, `${dir}/`);

//   if (!routes[routeName]) {
//     // routes[routeName] = requireRoute(fileName).default;
//     const route = {
//       path: routeName.toLowerCase() === 'default' ? '' : `/${routeName}`,
//       name: routeName,
//       // props: rout => ({ ...routeProps(rout)[routeName] }),
//       component: () => (import(/* webpackChunkName: `${routeName}` */ targetPath)),
//       // component: () => (Promise.resolve(`./src/views/${fileName}`)),
//     };

//     routes[routeName] = route;
//   }
// });

// if (process.env.NODE_ENV !== 'production') {
//   console.log('[routes] ./router/index.js:', routes);
// }



Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  // fallback: true,
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

const included = ['login', 'registration'];

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  if (!user && included.includes(to.name)) {
    next(); // [OK]
  } else if (user) {
    next(); // [OK]
  } else {
    // next('/login'); // [OK]
    // next('/'); // [OK]
    next(); // [OK]
  }
});

// console.log(router);

export default router;
