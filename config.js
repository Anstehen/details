const edition = 0;
let master = 'https://www.hzweirui.com/hairstyle';//环境配置
if (edition == 1){
  master = 'https://www.hzweirui.com/hairstyle';
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
  // 获取用户openid
  openid: `${master}/get/openid`,
  openidTitle: `获取用户 openid 出错`,
  // 请求出错
  insertErrorInfo: `${master}/error/insert`,
  // 添加用户
  insertUser: `${master}/user/insert`,
  insertUserTitle: `根据 openid 查询用户信息出错`,
  // 根据openid查询用户信息
  selectByOpenid: `${master}/user/selectByOpenid`,
  selectByOpenidTitle: `根据 openid 查询用户信息出错`,
  // 微信支付
  WeiXinPay: `${master}/WeiXinPay`,
  WeiXinPayTitle: `根据 openid 查询用户信息出错`,
  // 查询服务介绍
  selectAll: `${master}/service/selectAll`,
  selectAllTitle: `根据 openid 查询用户信息出错`,
  // 添加订单
  insertOrder: `${master}/order/insert`,
  insertOrderTitle: `添加订单出错`,
  // 图片上传接口
  uploadFile: `${master}/uploadFile`,
  uploadFileTitle: `图片上传接口出错`,
  // 用户上传资料标签
  information: `${master}/information/selectAll`,
  informationTitle: `图片上传接口出错`,
  // 用户上传资料
  informationInsert: `${master}/information/insert`,
  informationInsertTitle: `图片上传接口出错`,
}
module.exports = config;