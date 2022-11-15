import axios from 'axios';
import { any } from 'prop-types';
const baseUrl = process.env.HOST;
function fetch(api: string, params: {}, callback: (arg0: any) => any) {
  axios({
    url: baseUrl + api,
    method: 'post',
    params: params,
    headers: {
      // token:'809321849084738'
    },
  })
    .then((res) => {
      console.log('成功');
      let data = null;
      if (res.data.code === 0) {
        data = res.data.data;
      }
      callback && callback(data);
    })
    .catch((err) => {
      console.log('失败', err);
    })
    .then(() => {
      // 总会执行
    });
}
export default fetch;
