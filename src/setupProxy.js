const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://43.200.164.14:8080',
            changeOrigin: true,
        })
    );
};