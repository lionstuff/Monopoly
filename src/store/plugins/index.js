const requirePlugin = require.context('.', true, /\.js$/);
const plugins = {};

requirePlugin.keys().forEach((fileName) => {
  if (fileName === './index.js') return;

  // Replace ./ and .js
  const path = fileName.replace(/(\.\/|\.js)/g, '');
  const [pluginName] = path.split('/');

  if (!plugins[pluginName]) {
    plugins[pluginName] = {
      namespaced: true,
    };
  }

  Object.assign(plugins[pluginName], requirePlugin(fileName));
});

console.log('store/plugins/index.js: [plugins]', plugins);

export default plugins;
