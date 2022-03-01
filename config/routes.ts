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
  // 系统管理
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
      {
        path: '/system/dict',
        component: '@/pages/System/Dict',
      },
    ],
  },
  // 量表管理
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
  // 测评结果
  {
    path: '/assess',
    icon: 'table',
    routes: [
      {
        path: '/assess/common',
        component: '@/pages/Assess/Common',
      },
      {
        path: '/assess/result',
        component: '@/pages/Assess/Result',
      },
      {
        path: '/assess/publish',
        component: '@/pages/Assess/Publish',
      },
    ],
  },
  // 数据可视化
  {
    path: '/dv',
    component: '@/pages/DV',
    layout: false,
  },
];
