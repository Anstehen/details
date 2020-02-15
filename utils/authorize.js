import { ask, askError } from '../utils/demand.js';
import { version, openid, openidTitle,selectByOpenid,selectByOpenidTitle } from "../config.js";
// 手机号授权
const getPhone = function(val,calback){
  let defaultE = val;
  wx.showLoading({
    mask:true,
    title: '手机号验证中...',
  })
  let para = {
    ivForTel: defaultE.detail.iv,
    encryptedDataForTel: defaultE.detail.encryptedData,
    version: version,
    userId: wx.getStorageSync('userInfo').userId,
    unionId: wx.getStorageSync('userInfo').unionId,
  }
  ask("post", `${updateUserTelephone}`, para).then(res => {
    // console.log(res);
    if (res.code == 0) {
      calback(res);
      // wx.removeStorageSync('userInfo');
      // let _userinfo = res.info;
      // wx.setStorageSync('userInfo', _userinfo);
    } else {
      wx.hideLoading();
      askError("", updateUserTelephoneTitle, '数据处理出错');
    }
  }).catch(error => {
    wx.hideLoading();
    askError("", updateUserTelephoneTitle, '数据处理出错');
  })
}
// 已授权用户获取用户信息
const dataGet = (callback) =>{
  wx.login({
    success: res => {
      var code = res.code;
      // console.log(res);
      // 获取用户openid
      let para = {
        code: code,
      }
      //发送code，encryptedData，iv到后台解码，获取用户信息
      ask("post", `${openid}`, para).then(res1 => {
        // console.log(res1);
        if (res1.code == 200) {
          // 根据openid查询用户信息
          let paraOne = {
            openid: res1.info.openid,
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("get", `${selectByOpenid}`, paraOne).then(res2 => {
            // console.log(res2);
            wx.setStorageSync('userInformation', res2);
            callback(res2);
            // if (res2.code == 200) {
            //   wx.setStorageSync('userInformation', res2);
            // } else {
            //   wx.hideLoading();
            //   askError("", selectByOpenidTitle, '数据请求出错');
            // }
          }).catch(error => {
            wx.hideLoading();
            askError("", selectByOpenidTitle, '数据处理出错');
          })
        } else {
          wx.hideLoading();
          askError("", openidTitle, '数据请求出错');
        }
      }).catch(error => {
        wx.hideLoading();
        askError("", openidTitle, '数据处理出错');
      })
    },
    fail: function () {
      wx.hideLoading();
      askError("", "", '获取 code 出错');
    }
  })
}
module.exports = {
  getPhone: getPhone,
  dataGet:dataGet
}