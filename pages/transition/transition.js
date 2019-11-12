const app = getApp();
import { currentTime, existence, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    statusHeight: app.globalData.systemInfo.statusBarHeight,//状态高度
    identity:2,//1:普通身份；2:设计师身份
  },
  // 页面加载数据展示
  pageLoading:function(){
    let _this = this;
    let para = {
      userId: wx.getStorageSync('userInfo').userId,
      version: version,
      stylistId: wx.getStorageSync('userInfo').userId,
    }
    request(`${selectStylistActive}`, para,post).then(res => {
      // console.log(res);
      if (res.code == 0) {
        
      } else {
        requestError('userid','项目进入中转页面',`${selectStylistActiveTitle}`);
        let title = "系统通知";
        let notice = '出错啦';
        wx.navigateTo({
          url: '../../other_pages/error/error?title=' + title + "&notice=" + notice,
        })
      }
    }).catch(error => {
      requestError('userid', '项目进入中转页面', `${selectStylistActiveTitle}`);
      var title = "系统通知";
      var notice = "出错啦";
      wx.navigateTo({
        url: '../../other_pages/error/error?title=' + title + "&notice=" + notice,
      })
      return;
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(app.globalData.systemInfo);
    setTimeout(function(){
      if (_this.data.identity == 1){
        wx.reLaunch({
          url: '../ordinary/ordinary',
        })
      } else if (_this.data.identity == 2){
        wx.reLaunch({
          url: '../desigener/desigener',
        })
      }    
    },1666)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})