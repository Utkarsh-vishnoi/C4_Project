const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://129.154.36.139:8081',
            changeOrigin: true,
        })
    );
};