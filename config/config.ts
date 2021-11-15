import { defineConfig } from 'umi';
import { resolve } from 'path';
import routes from './routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {},
  routes,
  fastRefresh: {},
  alias: {
    '@': resolve(__dirname, './src'),
  },
});
