const bypassFn = function (req, res) {
  try {
    if (req.method === 'OPTIONS') {
      res.setHeader('Allow', 'GET, POST, HEAD, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      return res.send('');
    } else {
      return null;
    }
  } catch (error) {
    console.log('error', error);
  }
};

// TODO: Replace target with correct value for local dev
const PROXY_CONFIG = {
  '/bff': {
    target: 'http://onecx-remote-component-example-bff',
    secure: false,
    pathRewrite: {
      '^.*/bff': '',
    },
    changeOrigin: true,
    logLevel: 'debug',
    bypass: bypassFn,
  },
};

module.exports = PROXY_CONFIG;
