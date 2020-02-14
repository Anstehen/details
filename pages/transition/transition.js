const app = getApp();
import { existence } from '../../utils/tools.js';
import { dataGet } from '../../utils/authorize.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    statusHeight: app.globalData.systemInfo.statusBarHeight,//状态高度
  },
  // 进入页面信息处理
  pagesInfo:function(e){
    let _this = this;
    //查看是否授权
    wx.getSetting({
      success: function (ress) {
        // console.log(ress);
        if (ress.authSetting['scope.userInfo']) {//已授权
          dataGet(function(res){
            // console.log(res);
              if (res.identity == 1){
                wx.reLaunch({
                  url: '../ordinary/ordinary',
                })
              } else if (res.identity == 2){
                wx.reLaunch({
                  url: '../desigener/desigener',
                })
              }
          });
        } else {//没有授权
          wx.reLaunch({
            url: '../ordinary/ordinary',
          })
        }
      },
      fail(error) {
        wx.reLaunch({
          url: '../ordinary/ordinary',
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
    // console.log(app.globalData.systemInfo);
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