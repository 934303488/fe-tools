module.exports = {
  ...require('./.pradorc.base.js'),
  publicPath: process.env.PUBLIC_PATH_DEV + '/' + process.env.APP_ID + '/',
  devServer: {
    port: 3000,
  },
};
