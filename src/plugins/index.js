'use strict';
const requirePlugin = require.context('.', true, /\.js$/);
const plugins = [];

requirePlugin.keys().forEach((fileName) => {
  if (fileName === './index.js') return;

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '');
  const pluginName = path.split('/')[0];

  if (!plugins[pluginName]) {
    plugins[pluginName] = requirePlugin(fileName).default;
  }
});

if (process.env.NODE_ENV !== 'production') {
  console.log('[plugins] ./plugins/index.js:', plugins);
}
