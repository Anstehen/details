import { ask, askError } from '../utils/demand.js';
import { existence } from '../utils/tools.js';
import { version, platform, smallRoutione, WeiXinPay, WeiXinPayTitle,insertOrder,insertOrderTitle } from "../config.js";
const placeAnOrder = (val) =>{
  // wx.navigateTo({
  //   url: '../../other_pages/material/material',
  // })
  // return
  let desigenrObject = val;
  let para = {
    openid: wx.getStorageSync('userInformation').openid,
    designeOpenid: desigenrObject.openid,
    designeName: desigenrObject.userName,
    designePhone: desigenrObject.userPhone,
    designeImg: desigenrObject.userImage,
  }
  ask("post", `${insertOrder}`, para).then(res1 => {
    // console.log(res1);
    if (res1.status == 200) {
      let para = {
        outTradeNo:res1.data.order.orderNumber,
        openid:wx.getStorageSync('userInformation').openid,
        body:"硕魅",
        total_fee:parseFloat(res1.data.order.payMoney)*100
      }
      ask("get", `${WeiXinPay}`, para).then(res2 => {
        // console.log(res2);
        // if (res2.code == 200) {
          
        // } else {
        //   wx.hideLoading();
        //   askError(wx.getStorageSync('userInformation').userId, WeiXinPayTitle, '数据请求出错');
        // }
        wx.requestPayment({
          timeStamp: res2.timeStamp,
          nonceStr: res2.nonceStr,
          package: res2.package,
          signType: 'MD5',
          paySign: res2.paySign,
          success(payres) {
            //支付成功
            wx.navigateTo({
              url: `../../other_pages/material/material?transorderid=${res1.data.order.orderId}`,
            })
          },
          fail(se) {
            wx.showToast({
              title: '支付失败',
              icon: 'none'
            })
          }
        })
      }).catch(error => {
        wx.hideLoading();
        askError(wx.getStorageSync('userInformation').userId, WeiXinPayTitle, '数据处理出错');
      })
    } else {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, insertOrderTitle, '数据请求出错');
    }
  }).catch(error => {
    wx.hideLoading();
    askError(wx.getStorageSync('userInformation').userId, insertOrderTitle, '数据处理出错');
  })
}
module.exports = {
  placeAnOrder: placeAnOrder
}