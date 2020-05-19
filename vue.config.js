module.exports = {
    //需要配置别名的依赖名
    configureWebpack: {
        //别名
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views'
            }
        }
    }
}