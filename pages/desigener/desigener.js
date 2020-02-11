const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione,selectByDesigneOpenid,selectByDesigneOpenidTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    stateChioce:1,
    orderArr: [{}, {}, {}, {}, {}, {}]
  },
  // 我的点击
  minelick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../mine/mine',
    })
  },
  // 未设计
  designNoneClick:function(e){
    let _this = this;
    _this.setData({
      stateChioce: 1,
    })
  },
  // 已设计
  designDoingClick: function (e) {
    let _this = this;
    _this.setData({
      stateChioce: 2,
    })
  },
  // 已完成
  designFinishClick: function (e) {
    let _this = this;
    _this.setData({
      stateChioce: 3,
    })
  },
  // 订单详情
  orderClick:function(e){
    let _this = this;
    wx.navigateTo({
      url: '../../other_pages/order/order',
    })
  },
  // 页面初始数据
  initialData:function(e){
    let _this = this;
    var para = {
      pageNum: 1,
      pagesize: 100,
      designeOpenid: wx.getStorageSync("userInformation").openid,
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${selectByDesigneOpenid}`, para).then(res => {
      // console.log(res);
      if (res.code == 0) {
        
      } else {
        wx.hideLoading();
        askError("", selectByDesigneOpenidTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectByDesigneOpenidTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.initialData();//页面初始数据
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