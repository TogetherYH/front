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
    path: '/home',
    icon: 'home',
    component: '@/pages/Home',
  },
  {
    path: '/system',
    icon: 'table',
    routes: [
      {
        path: '/system/user',
        component: '@/pages/System/User',
      },
      {
        path: '/system/dept',
        component: '@/pages/System/Dept',
      },
      {
        path: '/system/menu',
        component: '@/pages/System/Menu',
      },
      {
        path: '/system/role',
        component: '@/pages/System/Role',
      },
    ],
  },
];
