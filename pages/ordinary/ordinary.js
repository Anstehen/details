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
    limitshow:true,
    orderIcon:`${app.globalData.pictureUrl}/201911212218placeAnOrder.png`
  },
  // 我的点击
  minelick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../own/own',
    })
  },
  // 立即去下单点击
  placeAnOrderClick:function(e){
    let _this = this;
    if(_this.data.limitshow){
      wx.navigateTo({
        url: '../../pages/purchase/purchase',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '下单需要获取您的信息，请先登录',
        success (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            wx.reLaunch({
              url: '../own/own',
            })
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
    }
  },
  // 进入页面信息处理
  pagesInfo:function(e){
    let _this = this;
    //查看是否授权
    wx.getSetting({
      success: function (ress) {
        // console.log(ress);
        if (ress.authSetting['scope.userInfo']) {//已授权
          _this.setData({
            limitshow:true,
          })
        } else {//没有授权
          _this.setData({
            limitshow:false,
          })
        }
      },
      fail(error) {
        _this.setData({
          limitshow:false,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.pagesInfo();//进入页面信息处理
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