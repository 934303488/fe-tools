import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const http = axios.create({});

http.interceptors.response.use(
  (response: any) => {
    // 处理正常响应...
    if (response.status === 200) {
      return response;
    }
    message.error(`[${response.status}] 服务器异常,${response.msg}`);
    const error = new Error(response.statusText);
    error.message = response;
    throw error;
  },
  (error: any) => {
    if (error) {
      if (new AxiosError(error)) {
        if (error.response) {
          message.error(
            `[${error.response.status}] 服务器异常:${error.response.statusText}`,
          );
        } else message.error('网络异常:' + error.code);
      } else message.error('网络异常:' + error.code);
    } else message.error('未知错误:' + error.code);

    return Promise.reject(error);
  },
);
export default http;
