import { defineConfig } from 'umi';
import { resolve } from 'path';
import routes from './routes';
import defaultSettings from './defaultSettings';

const CompressWebpackPlugin = require('compression-webpack-plugin');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  antd: {
    compact: true, // 开启紧凑主题
  },
  layout: {
    name: 'xx管理系统',
    siderWidth: 208,
    ...defaultSettings,
    locale: false,
  },
  routes,
  fastRefresh: {},
  alias: {
    '@': resolve(__dirname, './src'),
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
    '/graph': {
      target: 'http://localhost:9090',
      changeOrigin: true,
      // pathRewrite: { '^/api': '/' },
    },
  },
  externals: {
    // "@ant-design/charts": "charts",
  },
  chainWebpack: function (config, { webpack }) {
    //过滤掉momnet的那些不使用的国际化文件
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
    config.optimization.sideEffects(true);
  },
});
