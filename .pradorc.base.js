const path = require('path');

module.exports = {
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },

  define: {
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    'process.env': {
      NODE_ENV: process.env.NODE_ENV,
      DEPLOY_ENV: process.env.DEPLOY_ENV || 'prod',
    },
  },
};
