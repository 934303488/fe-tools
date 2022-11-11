/*
 * @Description:
 * @version:
 * @Author: guyifeng
 * @Date: 2020-06-05 10:25:58
 * @LastEditors: guyifeng
 * @LastEditTime: 2020-10-16 12:43:57
 */
module.exports = {
  ...require('./.pradorc.base.js'),
  publicPath: process.env.PUBLIC_PATH_PROD + '/' + process.env.APP_ID + '/',
};
