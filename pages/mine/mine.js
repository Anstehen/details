const app = getApp();
import { existence } from '../../utils/tools.js';
import { currentTime, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    defaultIcon: `${app.globalData.pictureUrl}/icon/default.png`,
    settingIcon: `${app.globalData.pictureUrl}/icon/setting.png`,
    enterIcon: `${app.globalData.pictureUrl}/icon/enter.png`,
    serviceIcon: `${app.globalData.pictureUrl}/icon/service.png`,
    defaultNeme: '昵称~',
    defaultLevel: '登录',
    identity: '官方认证设计师',
    personInfo: {},
    loginWhether: false,
  },
  // 首页点击
  indexClick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../desigener/desigener',
    })
  },
  // 获取用户信息
  onGotUserInfo: function (e) {
    let _this = this;
    wx.navigateTo({
      url: `../../other_pages/authorize/authorize?afferentPath=${'pages/mine/mine'}`,
    })
  },
  // 设置点击
  settingClick: function (e) {
    let _this = this;
    wx.openSetting();
  },
  // 我的服务过的用户点击
  serviceClick: function (e) {
    let _this = this;
    wx.navigateTo({
      url: '../../other_pages/service/service',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(wx.getStorageSync('userInformation'));
    let whetherLogin = false;
    let userInfoObj = {};
    let getUserInfo = wx.getStorageSync('userInformation');
    if (getUserInfo && existence(getUserInfo)) {
      whetherLogin = true;
      userInfoObj = getUserInfo;
    }
    _this.setData({
      personInfo: userInfoObj,
      loginWhether: whetherLogin
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
    return {
      title: "您的专属发型师为您提供方案",
      path: "/pages/transition/transition",
      imageUrl: "https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/homePage/202002191115picture.jpg",
      success: (res) => {
      }
    }
  }
})