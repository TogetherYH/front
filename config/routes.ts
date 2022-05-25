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
      {
        path: '/system/ds',
        component: '@/pages/System/DataSource',
      },
      {
        path: '/system/job',
        component: '@/pages/System/Job',
      },
      {
        path: '/system/log',
        component: '@/pages/System/Log',
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
  // 测评
  {
    path: '/assess',
    icon: 'table',
    routes: [
      // 常用量表测评
      {
        path: '/assess/common',
        component: '@/pages/Assess/Common',
      },
      // 测评结果查询
      {
        path: '/assess/result',
        component: '@/pages/Assess/Result',
      },
      // 发布管理
      {
        path: '/assess/publish',
        component: '@/pages/Assess/Publish',
      },
      // 测评记录查询
      {
        path: '/assess/record',
        component: '@/pages/Assess/Record',
      },
    ],
  },
  // 统计分析
  {
    path: '/statistics',
    icon: 'barChart',
    routes: [
      // 原始数据导出
      {
        path: '/statistics/originalExp',
        component: '@/pages/Statistics/OriginalExp',
      },
      // 团体报告
      {
        path: '/statistics/groupReport',
        component: '@/pages/Statistics/GroupReport',
      },
    ],
  },
  // 档案
  {
    path: '/archive',
    icon: 'barChart',
    routes: [
      // 编辑档案
      {
        path: '/archive/edit',
        component: '@/pages/Archive/Edit',
      },
      // 档案管理
      {
        path: '/archive/manage',
        component: '@/pages/Archive/Manage',
      },
    ],
  },
  // 知识科普
  {
    path: '/knowledge',
    icon: 'barChart',
    routes: [
      // 知识谱图
      {
        path: '/knowledge/graph',
        component: '@/pages/knowledge/G',
      },
      {
        path: '/knowledge/d3',
        component: '@/pages/knowledge/D3',
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
