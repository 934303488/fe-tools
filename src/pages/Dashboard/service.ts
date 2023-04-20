import { TOOLS_API } from '../../utils/api';
import http from '@/utils/axios';

const domainMap: any = {
  // api: `${process.env.API_URL}/api`,
  // api: "http://localhost:8081",
  api: 'http://stable.test-tools.nt.dev.xiguacity.cn',
};
const gen = (domain: any) => (params: any) => {
  let url = params;
  let method = 'POST';
  const paramsArray = params.split(' ');

  if (paramsArray.length === 2) {
    [method, url] = paramsArray;
  }

  const apiFunction = (data = {}, options: any) =>
    http({
      url: domainMap[domain] + url,
      data,
      method,
      // onUnauthorized: logout,
      filterEmptyParam: false,
      headers: {
        // Authorization: `Bearer ${keycloak.token}`,
        // _EMPLOYEE_USERNAME: Cookie.get('username'),
        // 'X-NT-App-Meta': JSON.stringify(window.APP_METADATA || {}),
      },
      ...options,
    });
  // 方便权限组件获接口的地址；
  apiFunction.url = url;

  return apiFunction;
};

const api: any = {};
Object.keys(TOOLS_API).forEach((key) => {
  api[key] = gen('api')(TOOLS_API[key]);
});

export { api };
