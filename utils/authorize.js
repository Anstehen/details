import { ask, askError } from '../utils/demand.js';
import { existence } from '../utils/tools.js';
import { version, platform, smallRoutione, openid, openidTitle,selectByOpenid,selectByOpenidTitle } from "../config.js";
// 用户信息授权
// type:1 authorize 页面
const lookempower = (val1,val2) =>{
  const type = val2;
  const info = val1;
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
        if (res1.code == 0) {
          // 根据openid查询用户信息
          let paraOne = {
            openid: res1.openid,
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("get", `${selectByOpenid}`, paraOne).then(res2 => {
            // console.log(res1);
            if (res2.code == 0) {
              
            } else {
              wx.hideLoading();
              askError("", selectByOpenidTitle, '数据请求出错');
            }
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
// 手机号授权
const getPhone = function(val1,val2,val3){
  let defaultE = val1;
  let pageType = val2;
  let pagePath = val3;
  wx.showLoading({
    mask:true,
    title: '手机号验证中...',
  })
  wx.checkSession({
    success: function (re) {
      var para = {
        smallprogramNo: smallProgramNo,
        organizationNo: organizationNo,
        ivForTel: defaultE.detail.iv,
        encryptedDataForTel: defaultE.detail.encryptedData,
        version: version,
        userId: wx.getStorageSync('userInfo').userId,
        unionId: wx.getStorageSync('userInfo').unionId,
      }
      ask("post", `${updateUserTelephone}`, para).then(res => {
        // console.log(res);
        if (res.code == 0) {
          wx.removeStorageSync('userInfo');
          let _userinfo = res.info;
          wx.setStorageSync('userInfo', _userinfo);
          // 获取用户接口调用
          lookempower(pageType, pagePath);
        } else {
          wx.login({
            success: res => {
              var code = res.code;
              // that.setData({
              //   angle_code: code
              // })
              var para = {
                smallprogramNo: smallProgramNo,
                organizationNo: organizationNo,
                code: code,
                ivForTel: defaultE.detail.iv,
                encryptedDataForTel: defaultE.detail.encryptedData,
                version: version,
                userId: wx.getStorageSync('userInfo').userId,
                unionId: wx.getStorageSync('userInfo').unionId,
              }
              //发送code，encryptedData，iv到后台解码，获取用户信息
              ask("post", `${updateUserTelephone}`, para).then(res => {
                // console.log(res);
                if (res.code == 0) {
                  wx.removeStorageSync('userInfo');
                  let _userinfo = res.info;
                  wx.setStorageSync('userInfo', _userinfo);
                  // 获取用户接口调用
                  lookempower(pageType, pagePath);
                } else {
                  wx.hideLoading();
                  askError("", updateUserTelephoneTitle, '数据请求出错');
                }
              }).catch(error => {
                wx.hideLoading();
                askError("", updateUserTelephoneTitle, '数据处理出错');
              })
            },
            fail: function () {
              wx.hideLoading();
              askError("", "", '获取 code 出错');
            }
          })
        }
      }).catch(error => {
        wx.hideLoading();
        askError("", updateUserTelephoneTitle, '数据处理出错');
      })
    },
    fail: function () {
      // console.log('失败');
      // 登录,获取code
      wx.login({
        success: res => {
          var code = res.code;
          // that.setData({
          //   angle_code: code
          // })
          var para = {
            smallprogramNo: smallProgramNo,
            organizationNo: organizationNo,
            code: code,
            ivForTel: defaultE.detail.iv,
            encryptedDataForTel: defaultE.detail.encryptedData,
            version: version,
            userId: wx.getStorageSync('userInfo').userId,
            unionId: wx.getStorageSync('userInfo').unionId,
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("post", `${updateUserTelephone}`, para).then(res => {
            // console.log(res);
            if (res.code == 0) {
              wx.removeStorageSync('userInfo');
              let _userinfo = res.info;
              wx.setStorageSync('userInfo', _userinfo);
              // 获取用户接口调用
              lookempower(pageType, pagePath);
            } else {
              wx.hideLoading();
              askError("", updateUserTelephoneTitle, '数据请求出错');
            }
          }).catch(error => {
            wx.hideLoading();
            askError("", updateUserTelephoneTitle, '数据处理出错');
          })
        },
        fail: function () {
          wx.hideLoading();
          askError("", "", '获取 code 出错');
        }
      })
    }
  })
}
module.exports = {
  getPhone: getPhone,
  lookempower: lookempower
}