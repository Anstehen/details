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
    wx.showLoading({
      mask:true,
      title: '数据加载中...',
    })
    lookempower(e,function(res){
      // console.log(res);
      wx.hideLoading();
      if(res.status == 200){
        if (res.data.user.identity == 1 || res.data.user.identity == '1'){
          // console.log(res.data.user);
          wx.reLaunch({
            url: '../../pages/own/own',
          })
        } else if (res.data.user.identity == 2 || res.data.user.identity == '2'){
          wx.reLaunch({
            url: '../../pages/mine/mine',
          })
        }else{
          wx.showToast({
            icon:'none',
            title: '身份识别出错！请稍后再试',
          })
        }
      }else{
        wx.showToast({
          icon:'none',
          title: '网络出错了！请稍后再试',
        })
      }
    });
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
    return {
      title: "您的专属发型师为您提供方案",
      path: "/pages/transition/transition",
      imageUrl: "https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/homePage/202002191115picture.jpg",
      success: (res) => {
      }
    }
  }
})