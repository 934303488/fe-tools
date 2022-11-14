import { defineConfig } from 'umi';

export default defineConfig({
  title: '测试工具平台',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: { name: '测试工具平台', locale: false },
  scripts: ['window.FE_TESTTOOLS_METADATA=STEIN_METADATA'],
  routes: [
    { path: '/', component: '@/pages/index' },
    {
      path: '/dashboard',
      name: '工具',
      icon: 'tool',
      component: '@/pages/Dashboard/Tokenboard',
      // routes: [
      //   { path: '/dashboard/monitor', icon: 'DesktopOutlined', name: '控制页', component: '@/pages/Dashboard/Monitor' },],
    },
  ],
  fastRefresh: {},
});
