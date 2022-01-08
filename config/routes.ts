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
  {
    path: '/base',
    icon: 'table',
    routes: [
      {
        path: '/base/scale',
        component: '@/pages/Base/Scale',
      },
      {
        path: '/base/factor',
        component: '@/pages/Base/Factor',
      },
      {
        path: '/base/question',
        component: '@/pages/Base/Question',
      },
      {
        path: '/base/answer',
        component: '@/pages/Base/Answer',
      },
    ],
  },
  {
    path: '/publish',
    icon: 'table',
    routes: [
      {
        path: '/publish/common',
        component: '@/pages/Publish/Common',
      },
    ],
  },
  {
    path: '/assess',
    icon: 'table',
    routes: [
      {
        path: '/assess/result',
        component: '@/pages/Assess/Result',
      },
    ],
  },
];
