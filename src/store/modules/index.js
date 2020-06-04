'use strict';
const requireModule = require.context('.', true, /\.js$/);
const modules = {};

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return;

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '');
  const [moduleName, imported] = path.split('/');

  if (!modules[moduleName]) {
    modules[moduleName] = {
      namespaced: true,
    };
    modules[moduleName][imported] = requireModule(fileName).default;
  }
});

if (process.env.NODE_ENV !== 'production') {
  console.log('[modules] ./store/modules/index.js:', modules);
}

export default modules;
