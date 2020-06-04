module.exports = {
  devServer: {
    disableHostCheck: true,
    // host: '0.0.0.0',
    // public: '0.0.0.0',
    hotOnly: true,
    https: true,
    http2: true,
    compress: true,
    // open: process.platform === 'darwin',
    overlay: {
      errors: false,
      warnings: false,
    },
    port: 8080,
    progress: false,
    // historyApiFallback: {
    //   index: '/',
    // },
  },
  css: {
    // extract: true,
    // modules: true, // won't work
    // localIdentName: '[name]_[local]_[hash:base64:5]',
    sourceMap: false,
    // loaderOptions: {}
  },
  productionSourceMap: false,
  runtimeCompiler: false,
  // performance: true,
  lintOnSave: false,
  parallel: true,
  transpileDependencies: ['vuetify']
};
