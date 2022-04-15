module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            //接口代理地址
            "/api": {
                target: "http://localhost:8091",
                pathRewrite: {
                    "^/api": ''
                },
                ws: true,
                changeOrigin: true
            }
        }
    }
}