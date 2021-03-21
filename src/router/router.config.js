/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/demo',
        name: 'Demo',
        component: () => import('@/views/home/demo'),
        meta: { title: 'Demo', keepAlive: true }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  }
]
