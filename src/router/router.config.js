/**
 * 基础路由 children主要用于layout区分,children中 path均带上/
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页类型layout',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        // demo 页面 用于开发快速复制和组件使用查看
        path: '/dev-demo',
        name: 'DevDemo',
        component: () => import('@/views/demo/index'),
        meta: { title: 'Demo', keepAlive: false }
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/my/index'),
        meta: { title: '我的', keepAlive: true }
      }
    ]
  },
  {
    path: '/header-layout',
    component: () => import('@/views/layouts/header'),
    redirect: '/home',
    meta: {
      title: 'header-layout',
      keepAlive: false
    },
    children: [
      {
        // my setting
        path: '/my/set',
        name: 'MySet',
        component: () => import('@/views/my/set'),
        meta: { title: '设置', keepAlive: true }
      }
    ]
  },
  {
    // 无layout 路由
    path: '/home/about',
    name: 'About',
    component: () => import('@/views/home/about'),
    meta: { title: '关于我们', keepAlive: true }
  }
]
