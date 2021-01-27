module.exports = {
    // baseUrl: './',
    devServer: {
        proxy: {
            '/wechat': {
                target: 'http://47.116.128.207:8081',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/wechat': '/wechat'
                }
            }
        }
    }
}
