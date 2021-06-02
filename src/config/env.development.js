// 本地环境配置
module.exports = {
  title: '(测试)vue-h5-template',
  baseUrl: 'http://localhost:8058', // 项目地址  注意结尾无/ 由于测试地址二级目录无法找到所以测试原项目内容没有二级目录
  baseApi: 'http://49.233.81.215', // 本地api请求地址,注意：如果你使用了代理，请设置成'/'  注意结尾无/
  APPID: 'xxx',
  APPSECRET: 'xxx',
  $cdn: 'https://cn.vuejs.org' // cdn 模式使用地址 注意结尾无/
}
