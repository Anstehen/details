const app = getApp();
import { currentTime, existence, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 提交的资料---点击
  materialClick:function(e){
    let _this = this;
    _this.setData({
      materialShow:true
    })
  },
  // 提交的资料---关闭
  shoutDownClick:function(e){
    let _this = this;
    if(e.detail == "弹框关闭"){
      _this.setData({
        materialShow:false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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