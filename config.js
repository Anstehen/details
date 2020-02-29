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
  // 根据openid修改用户信息
  updateUserByOpenid: `${master}/user/updateUserByOpenid`,
  updateUserByOpenidTitle: `根据openid修改用户信息出错`,
  // 获取用户手机号
  getPhone: `${master}/phone/getPhone`,
  getPhoneTitle: `获取用户手机号出错`,
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
  // 用户上传资料---根据 orderid 修改
  updateOrder: `${master}/order/update`,
  updateOrderTitle: `用户上传资料出错`,
  // 查询设计师的信息
  selectByIdentity: `${master}/user/selectByIdentity`,
  selectByIdentityTitle: `查询设计师的信息出错`,
  // 查询服务介绍
  selectAllService: `${master}/service/selectAll`,
  selectAllServiceTitle: `查询服务介绍出错`,
  // 设计师端根据设计师的openid查询出订单
  selectByDesigneOpenid: `${master}/order/selectByDesigneOpenid`,
  selectByDesigneOpenidTitle: `设计师端根据设计师的openid查询出订单出错`,
  // 设计师端根据设计师的openid查询出订单---根据id删除订单
  deleteOrder: `${master}/order/delete`,
  deleteOrderTitle: `根据id删除订单出错`,
  // 根据openid查询订单 (用户端展示)
  userSelectByOpenid: `${master}/order/selectByOpenid`,
  userSelectByOpenidTitle: `根据openid查询订单 (用户端展示)出错`,
  // 查询设计师服务价格
  selectPrice: `${master}/price/selectPrice`,
  selectPriceTitle: `查询设计师服务价格出错`,
  // 根据orderId查询订单
  selectOrder: `${master}/order/select`,
  selectOrderTitle: `根据orderId查询订单出错`,
  // 订单详情（设计师报告编辑）---根据orderId查询
  selectOrderDetailByOrderId: `${master}/orderDetail/selectOrderDetailByOrderId`,
  selectOrderDetailByOrderIdTitle: `根据orderId查询订单出错`,
  // 订单详情（设计师报告编辑）---根据id修改
  orderUpdate: `${master}/orderDetail/update`,
  orderUpdateTitle: `根据id修改出错`,
  // 订单详情（设计师报告编辑）---查询所有脸型分析
  editSelectAll: `${master}/faceAnalysis/selectAll`,
  editSelectAllTitle: `查询所有脸型分析出错`,
  // 订单详情（设计师报告编辑）---上庭查询所有
  editUpper: `${master}/uppercourt/selectAll`,
  editUpperTitle: `上庭查询所有出错`,
  // 订单详情（设计师报告编辑）---中庭查询所有
  editStalls: `${master}/stalls/selectAll`,
  editStallsTitle: `中庭查询所有出错`,
  // 订单详情（设计师报告编辑）---下庭查询所有
  editLower: `${master}/lowerCourt/selectAll`,
  editLowerTitle: `下庭查询所有出错`,
  // 订单详情（设计师报告编辑）---根据性别获取发色
  selectHairColorByHairGender: `${master}/haircolor/selectHairColorByHairGender`,
  selectHairColorByHairGenderTitle: `根据性别获取发色出错`,
  // 订单详情（设计师报告编辑）---根据类型获取发色
  selectHairColorByHairType: `${master}/haircolor/selectHairColorByHairType`,
  selectHairColorByHairTypeTitle: `根据类型获取发色出错`,
  // 订单详情（设计师报告编辑）---查询所有店铺信息
  editShop: `${master}/shop/selectAll`,
  editShopTitle: `查询所有店铺信息出错`,
  // 订单详情（设计师报告编辑）---根据shopId查询店铺信息
  editShopDetail: `${master}/shop/select`,
  editShopDetailTitle: `根据shopId查询店铺信息出错`,
  // 订单详情（设计师报告编辑）---添加发型
  editInsertHairstyle: `${master}/orderRecommend/insert`,
  editInsertHairstyleTitle: `添加发型出错`,
}
module.exports = config;