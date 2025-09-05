import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  antd: {}, // 启用Ant Design
  dva: {
    hmr: true,
  },
  layout: {
    name: '在线账本', // 系统名称
    locale: true,
    layout: 'side', // 左侧菜单布局
  },
  locale: {
    default: 'zh-CN',
    antd: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // 后端接口代理（确保前端能访问后端API）
  proxy: {
    '/api': {
      target: 'http://localhost:8080', // 后端服务地址
      changeOrigin: true,
      pathRewrite: { '^/api': '' }, // 去掉URL中的/api前缀
    },
  },
  // 关键：路由配置，必须正确指向你的页面文件
  routes: [
    {
      path: '/',
      component: '@/layouts/BasicLayout', // 使用Pro的基础布局（带左侧菜单）
      routes: [
        {
          path: '/',
          redirect: '/customer', // 默认打开客户管理页
        },
        {
          path: '/customer',
          name: '客户管理', // 左侧菜单显示的名称
          icon: 'UserOutlined', // 菜单图标
          component: './customer', // 对应pages/customer/index.tsx
        },
        {
          path: '/product',
          name: '产品管理',
          icon: 'ShoppingOutlined',
          component: './product', // 对应pages/product/index.tsx
        },
      ],
    },
  ],
  access: {},
  theme: {},
  title: '在线账本',
  ignoreMomentLocale: true,
  manifest: {
    basePath: '/',
  },
});
