import { ask, askError } from '../utils/demand.js';
import { existence } from '../utils/tools.js';
import { version, platform, smallRoutione, WeiXinPay, WeiXinPayTitle } from "../config.js";
const placeAnOrder = () =>{
  let para = {
    openid: wx.getStorageSync('userInformation').openid,
    designeOpenid: "oeR1e5SwZ_ftWta4sc4ktviihUps",
    designeName: "可乐中的漂流瓶",
    designePhone: "15237535892",
  }
  ask("post", `${WeiXinPay}`, para).then(res1 => {
    // console.log(res1);
    // if (res1.code == 200) {
     
    // } else {
    //   wx.hideLoading();
    //   askError(wx.getStorageSync('userInformation').userId, WeiXinPayTitle, '数据请求出错');
    // }
  }).catch(error => {
    wx.hideLoading();
    askError(wx.getStorageSync('userInformation').userId, WeiXinPayTitle, '数据处理出错');
  })
}
module.exports = {
  placeAnOrder: placeAnOrder
}