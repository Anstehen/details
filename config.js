const edition = 0;
let master = '';//环境配置
if (edition == 1){
  master = '';
}
const version = '1.0.0';
const platform = 1;//平台区分
let smallRoutione = 1;//区分小程序
var config = {
  edition,
  master,
  version,
  platform,
  smallRoutione,
  // 接口处理
  login: `${master}/wechat/getUserInfoForAssistant`,
  loginTitle: `getUserInfo接口出错`,
  // 请求出错
  uploadErrorInfo: `${master}/wechat/getUserInfoForAssistant`,
}
module.exports = config;