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
    whetherClickBotBar:true,//页面底部导航栏当前页面的是否可以点击
  },
  // 首页点击
  indexClick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../ordinary/ordinary',
    })
  },
  // 我的点击
  minelick: function (e) {
    let _this = this;
    if (_this.data.whetherClickBotBar){
      wx.reLaunch({
        url: '../desigener/desigener',
      })
    }   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let clickBotBar = true;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    // console.log(currentPage.route);
    if (currentPage.route == "pages/own/own"){
      clickBotBar = false;
    }
    _this.setData({
      whetherClickBotBar: clickBotBar
    })
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