import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const http = axios.create({});

http.interceptors.response.use(
  (response: any) => {
    // 处理正常响应...
    console.log('response:' + response.status);
    if (response.status === 200) {
      return response;
    }
    message.error(`[${response.status}] 服务器异常,${response.msg}`);
    const error = new Error(response.statusText);
    error.message = response;
    throw error;
  },
  (error: any) => {
    if (error && error.response && error.response.status != 200) {
      message.error('服务器异常，' + error.response.msg);
    }
    if (new AxiosError(error)) {
      message.error('网络异常:' + error.code);
    }

    return Promise.reject(error);
  },
);
export default http;
