import { ask, askError } from '../utils/demand.js';
import { version, openid, openidTitle,insertUser,insertUserTitle,selectByOpenid,selectByOpenidTitle } from "../config.js";
// 用户信息授权
// type:1 authorize 页面
const lookempower = (val1,val2,calback) =>{
  const type = val2;
  const info = val1;
  // console.log(info);
  wx.login({
    success: res1 => {
      var code = res1.code;
      // console.log(res1);
      // 获取用户openid
      let para = {
        code: code,
      }
      //发送code，encryptedData，iv到后台解码，获取用户信息
      ask("post", `${openid}`, para).then(res2 => {
        // console.log(res2);
        if (res2.code == 200) {
          // 根据openid查询用户信息
          let paraOne = {
            openid: code.openid,
            userName:info.detail.userInfo.nickName,
            userImage:info.detail.userInfo.avatarUrl,
            position:info.detail.userInfo.country+info.detail.userInfo.province+info.detail.userInfo.city,
            sex:info.detail.userInfo.gender,
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("get", `${insertUser}`, paraOne).then(res2 => {
            // console.log(res2);
            if (res2.status == 200) {
              wx.setStorageSync('userInformation', res2);
              calback(res2);
            } else {
              wx.hideLoading();
              askError("", insertUserTitle, '数据请求出错');
            }
          }).catch(error => {
            wx.hideLoading();
            askError("", insertUserTitle, '数据处理出错');
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
              ask("post", `${updateUserTelephone}`, para).then(res1 => {
                // console.log(res);
                if (res1.code == 0) {
                  wx.removeStorageSync('userInfo');
                  let _userinfo = res1.data.user;
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
  lookempower: lookempower,
  dataGet:dataGet
}