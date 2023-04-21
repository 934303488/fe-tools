import React from 'react';
import { defineConfig } from 'umi';
import { layout } from './src/config/config';
import { LogoutOutlined } from '@ant-design/icons';
export default defineConfig({
  title: '测试工具平台',
  favicon:
    'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  nodeModulesTransform: {
    type: 'none',
  },
  layout: layout,
  routes: [
    // { path: '/', component: '@/pages/index' },
    { path: '/', component: '@/pages/Dashboard/Tokenboard' },
    {
      path: '/dashboard',
      name: '工具',
      icon: 'tool',
      component: '@/pages/Dashboard/Tokenboard',
    },
  ],
  fastRefresh: {},
});
