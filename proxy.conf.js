function onProxyRes(proxyRes, req, res) {
  if (req.method.toUpperCase() === 'OPTIONS') {
    res.setHeader('Allow', 'GET, POST, HEAD, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    return res.send('')
  }
}

// TODO: Replace target with correct value for local dev
const PROXY_CONFIG = {
  '/bff': {
    target: 'http://localhost:9094/',
    secure: false,
    pathRewrite: {
      '^.*/bff': '',
    },
    changeOrigin: true,
    logLevel: 'debug',
    onProxyRes: onProxyRes,
  },
};

module.exports = PROXY_CONFIG;
