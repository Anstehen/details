import { edition, version, platform, smallRoutione, uploadErrorInfo } from '../config.js';
const app = getApp();
// 获取当前页面路径
const pagesPath = function(){
  let pages = getCurrentPages(); //获取加载的页面
  let currentPage = pages[pages.length - 1]; //获取当前页面的对象
  let url = currentPage.route; //当前页面url
  return url;
}
// 请求封装
const request = function (paraPath, para, paraRequest){
  para['pagePath'] = pagesPath();
  return new Promise((resolve, reject) => {
    tt.request({
      url: paraPath,
      data: para,
      method: paraRequest,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        // console.log(res)
        resolve(res.data);
      },
      fail(error) {
        reject(error);
        var title = "出错啦";
        var notice = "呀，网络出了问题";
        var btntitle = '重新连接网络';
        wx.navigateTo({
          url: `../other_pages/error/error?title=${title}&notice=${notice}&btntitle=${btntitle}`,
        })
      },
    })
  })
}
// 请求出错封装
const requestError = function(paraUserid,paraTitle,paraContent){
  tt.request({
    url: uploadErrorInfo,
    data: {
      userId: paraUserid,
      smallRoutione: smallRoutione,
      version: version,
      pagePath: pagesPath(),
      title: paraTitle,
      content: paraContent
    },
    method: 'post',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {

    },
    fail(error) {

    },
  })
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
// 判断值是否存在
const existence = function(val){
  let existOne = val;
  let existTwo = true;
  if (existOne == undefined || existOne == null || existOne == ''){
    existTwo = false;
  }else{
    existTwo = true;
  }
  return existTwo
}
module.exports = {
  pagesPath: pagesPath,
  request: request,
  requestError: requestError,
  currentTime: currentTime,
  existence: existence
}
