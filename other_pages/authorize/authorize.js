const app = getApp();
import { existence } from '../../utils/tools.js';
import { lookempower } from '../../utils/authorize.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    statusHeight: app.globalData.systemInfo.statusBarHeight,//状态高度
    acceptPath:'',
  },
  // 点击授权进入
  onGotUserInfo:function(e){
    let _this = this;
    // console.log(e);
    lookempower(e,1);
    wx.showLoading({
      mask:true,
      title: '数据加载中...',
    })
    // wx.reLaunch({
    //   url: `../../${_this.data.acceptPath}`,
    // })
    // wx.setStorageSync('userInformation', e)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(app.globalData.systemInfo);
    if (options && options.afferentPath && existence(options.afferentPath)){
      _this.setData({
        acceptPath: options.afferentPath
      })
    }
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