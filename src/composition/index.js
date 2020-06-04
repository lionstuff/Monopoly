/**
 * @TODO
 */

'use strict';
const requireModule = require.context('.', true, /\.js$/);
const modules = [];

requireModule.keys().forEach((fileName) => {
  if (fileName === './index.js') return;

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '');
  const moduleName = path.split('/')[0];

  if (!modules[moduleName]) {
    modules[moduleName] = requireModule(fileName)[moduleName];
  }
});

if (process.env.NODE_ENV !== 'production') {
  console.log('[composition] ./composition/index.js:', modules);
}

export default modules;
