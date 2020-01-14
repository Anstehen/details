const app = getApp();
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { placeAnOrder } from '../../utils/order.js';
import { edition, version, platform, smallRoutione,selectByIdentity,selectByIdentityTitle,selectAllService,selectAllServiceTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    swiperArr: [{}, {}, {}],
    limitOrderTimes:true
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 立即下单
  immediatelyClick:function(e){
    let _this = this;
    if(_this.data.limitOrderTimes){
      placeAnOrder();
    }
  },
  // 页面加载数据展示
  getDataInformation:function(e){
    let _this = this;
    let para = {};
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${selectByIdentity}`, para).then(res => {
      // console.log(res);
      // if (res.code == 0) {
      //   _this.setData({
          
      //   })
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInfo').userId, selectByIdentityTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, selectByIdentityTitle, '数据处理出错');
    })
    let paraOne = {};
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${selectAllService}`, paraOne).then(res => {
      // console.log(res);
      // if (res.code == 0) {
      //   _this.setData({
          
      //   })
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInfo').userId, selectAllServiceTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, selectAllServiceTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.getDataInformation();
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