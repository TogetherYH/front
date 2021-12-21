export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/login',
    component: '@/pages/Login',
    layout: false,
  },
  {
    name: '首页',
    path: '/home',
    icon: 'smile',
    component: '@/pages/Home',
  },
  {
    name: '系统管理',
    path: '/system',
    icon: 'crown',
    routes: [
      {
        path: '/system/user',
        name: '用户管理',
        component: '@/pages/System/User',
      },
      {
        path: '/system/dept',
        name: '部门管理',
        component: '@/pages/System/Dept',
      },
    ],
  },
];
