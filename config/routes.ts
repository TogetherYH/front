export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'login',
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    component: '@/pages/Home',
  },
];
