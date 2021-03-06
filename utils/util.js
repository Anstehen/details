import { edition, version, platform, smallRoutione, uploadErrorInfo } from '../config.js';
const app = getApp();
// 获取当前页面路径
const pagesPath = function(){
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let url = currentPage.route; //当前页面url
  return url;
}
// 获取当前的时间
const currentTime = function(val){
  let current = val;
  let returnStr = '';
  let timer = new Date();
  const year = timer.getFullYear();
  const month = timer.getMonth() + 1;
  const day = timer.getDate();
  const hour = timer.getHours();
  const minute = timer.getMinutes();
  const second = timer.getSeconds();
  switch (current) {
    default:
      // 空
      returnStr = '';
      break;
    case 1:
      //日期 
      returnStr = year + '-' + month + '-' + day;
      break;
    case 2:
      //时间 
      returnStr = hour + ':' + minute + ':' + second;
      break;
    case 3:
      //日期 + 时间 
      returnStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }
  return returnStr
}
//页面跳转
const G = (_url, _reviewPage) => {
  var _uArr = _url.split("://");
  if (_uArr.length > 1) {
    switch (_uArr[0]) {
      case "navigateTo":
        wx.navigateTo({
          url: _uArr[1]
        });
        break;
      case "redirectTo":
        wx.redirectTo({
          url: _uArr[1]
        });
        break;
      case "switchTab":
        wx.switchTab({
          url: _uArr[1]
        });
        break;
      case "reLaunch":
        wx.reLaunch({
          url: _uArr[1]
        });
        break;
      case "navigateBack":
        // 获取打开中的所有页面
        let pages = getCurrentPages();
        if (pages.length > 1) {
          if (_reviewPage) {
            pages[pages.length - 2].setData({
              ReviewPage: true
            });
          }
        }
        wx.navigateBack({
          delta: _uArr[1]
        });
        break;
      default:
        wx.redirectTo({
          url: _uArr[1]
        });
    }
  } else {
    wx.navigateTo({
      url: _uArr[0]
    })
  }
}
module.exports = {
  currentTime: currentTime,
  G,
}
