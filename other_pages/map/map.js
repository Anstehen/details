const app = getApp();
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'YIJBZ-M2VWF-X54J5-NITUC-YM6BQ-6EBYA' // 必填
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    allHeight: app.globalData.systemInfo.screenHeight,
    allWidth:app.globalData.systemInfo.screenWidth,
    acceptLatutide:0,
    acceptLongitude:0,
    acceptWords:"",
    changeObject:null,
    enIcon:"../../image/202001092046end.png"
  },
  // 地图变化时触发
  regionchange:function(e){
    let _this = this;
    // console.log(e);
    if (e.type == "end") {
      this.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res);
          let currentDesign = res;
          qqmapsdk.reverseGeocoder({  //逆地址解析
            location: {
              latitude: currentDesign.latitude,
              longitude: currentDesign.longitude
            },
            coord_type: 1,
            get_poi: 1,
            success: (res1) => {
              console.log(res1);
              let transfer = res1.result;
              _this.setData({
                changeObject: transfer,
                acceptWords: transfer.address
              })
            },
            fail: function (error) {
              // console.error(error);
            },
            complete: function (res) {
              // console.log(res);
            }
          })
        }
      })
    }
  },
  // 确定按钮
  determine:function(e){
    let _this = this;
    wx.navigateBack({
      complete: (res) => {
        delta:1
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    let _this = this;
    _this.setData({
      acceptLatutide: app.globalData.locationObject.location.lat,
      acceptLongitude: app.globalData.locationObject.location.lng,
      acceptWords:app.globalData.locationObject.address,
      changeObject: app.globalData.locationObject
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')
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