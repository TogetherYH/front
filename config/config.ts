import { defineConfig } from 'umi';
import { resolve } from 'path';
import routes from './routes';
import defaultSettings from './defaultSettings';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    compact: true, // 开启紧凑主题
  },
  layout: {
    name: 'xx管理系统',
    siderWidth: 208,
    ...defaultSettings,
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
  },
});
