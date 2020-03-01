import { existence } from "./tools.js";
import { smallProgramNo, organizationNo, version, uploadErrorInfo } from "../config.js";
// 获取页面路径
const pagesPath = () => {
  let pages = getCurrentPages();
  let pagesObject = pages[pages.length - 1];
  let url = pagesObject.route;;
  return url;
}
// 请求封装
const ask = (val1, val2, val3) => {
  let getMethods = "";
  (val1 && existence(val1)) ? (getMethods = val1) : (getMethods = "");
  let getUrl = "";
  (val2 && existence(val2)) ? (getUrl = val2) : (getUrl = "");
  let getPara = "";
  (val3 && existence(val3)) ? (getPara = val3) : (getPara = "");
  getPara['pagePath'] = pagesPath();
  return new Promise((resolve, reject) => {
    wx.request({
      url: getUrl,
      data: getPara,
      method: getMethods,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      complete: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 100000) {
          resolve(res.data);
        } else {
          reject(res);
          var title = "出错啦";
          var notice = "呀，网络出了问题";
          var btntitle = '重新连接网络';
          var imgurl = 'https://faceshapetemplate.lianglianglive.com/file/fixed/hair2/img/network.png';
          var btnshow = true;
          wx.navigateTo({
            url: `../../pages/error/error?title=${title}&notice=${notice}&btntitle=${btntitle}&imgurl=${imgurl}&btnshow=${btnshow}`,
          })
        }
      },
      success(ress) {

      },
      fail(error) {

      }
    })
  })
}
// 上传错误请求封装
const askError = (val1, val2, val3) => {
  let userid = "";
  if (val1 && existence(val1)){
    userid = val1;
  }
  // (val1 && existence(val1)) ? (userid = val1) : (userid = '');
  let describe = "";
  if (val2 && existence(val2)){
    describe = val2
  }
  // (val2 && existence(val2)) ? (describe = val2) : (describe = '');
  let errorInfo = "";
  if (val3 && existence(val3)){
    errorInfo = val3;
  }
  // (val3 && existence(val3)) ? (errorInfo = val3) : (errorInfo = '');
  wx.request({
    url: uploadErrorInfo,
    data: {
      'userId': userid,
      'smallprogramNo': smallProgramNo,
      "version": version,
      'organizationNo': organizationNo,
      'pagePath': pagesPath(),
      'title': describe,
      'content': errorInfo
    },
    method: 'post',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      wx.reLaunch({
        url: '../../pages/error/error?title=系统通知&notice=出错啦',
      })
    },
    fail(error) {
      wx.reLaunch({
        url: '../../pages/error/error?title=系统通知&notice=出错啦',
      })
    },
  })
}
module.exports = {
  ask: ask,
  askError: askError
}