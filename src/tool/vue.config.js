const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
}
)
// module.exports={
//   devServer:{
//     proxy:{
//       '/api': {    // 遇到'/api'的请求拦截下来，将跨域改成target的url
//         target: 'http://120.79.228.172:3000',
//         changeOrigin: true,  //是否跨域，肯定true
//         pathRewrite: {   //重写请求中的/api为空
//            '^/api': ''
//         }
//       // '/api':{
//       //   target:'http://120.79.228.172:3000',
//       //   //ws:true, //是否代理websocked
//       //   changeOrigin:true, //是否开启跨域
//       //   // pathRewrite:{
//       //   //   '^/api':'' //把/api变为空字符
//       //   // }
//       // }
//     }
//   }
// }
// }

