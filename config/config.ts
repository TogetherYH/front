import { defineConfig } from 'umi';
import { resolve } from 'path';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    compact: true, // 开启紧凑主题
  },
  layout: {},
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
  },
});
