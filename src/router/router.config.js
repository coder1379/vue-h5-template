/**
 * 基础路由 children主要用于layout区分,children中 path均带上/
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    // 首页layout模板及内嵌的页面
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
        meta: { title: '首页', keepAlive: true, excludeScroll: true }
      },
      {
        // demo 页面 用于开发快速复制和组件使用查看
        path: '/dev-demo',
        name: 'DevDemo',
        component: () => import('@/views/demo/index'),
        meta: { title: 'Demo', keepAlive: true }
      },
      {
        // demo-list 页面 用于开发快速复制和组件使用查看
        path: '/dev-demo/copy-base-list',
        name: 'DevDemoList',
        component: () => import('@/views/demo/copy-base-list'),
        meta: { title: 'DemoList', keepAlive: true }
      },
      {
        path: '/my',
        name: 'My',
        component: (resolve) => require(['@/views/my/index'], resolve), // 懒加载页面示例
        // component: () => import('@/views/my/index'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  },
  {
    // footer-layout页面及子页面 页面带有头部
    path: '/footer-layout',
    component: () => import('@/views/layouts/footer'),
    redirect: '/home',
    meta: {
      title: 'footer-layout',
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
    // 无layout 路由 页面
    path: '/home/about',
    name: 'About',
    component: () => import('@/views/home/about'),
    meta: { title: '关于我们', keepAlive: false }
  },
  {
    // 登录
    path: '/login',
    name: 'Login',
    component: () => import('@/views/home/login'),
    meta: { title: '登录', keepAlive: false }
  },
  {
    // 404必须保持此文件在最后
    path: '*',
    name: '404',
    component: () => import('@/views/home/404'),
    meta: { title: '404', keepAlive: false }
  }
]
