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
    upperIndex:0,
    upperArray:['上庭正常','上庭短','上庭长'],
    upperValue:"",
    upperPopupArr:['上庭长度适中,适合有刘海的造型;','上庭长度适中,适合有刘海的造型;'],
    stallsIndex:0,
    stallsArray:['中庭正常','中庭短','中庭长'],
    stallsValue:"",
    stallsPopupArr:['中庭偏硬朗、偏强势,选择曲线刘海的发型来弱化硬朗和强势;','中庭偏硬朗、偏强势,选择曲线刘海的发型来弱化硬朗和强势;'],
    lowerIndex:0,
    lowerArray:['下庭正常','下庭短','下庭长'],
    lowerValue:"",
    lowerPopupArr:['下庭长度适中,无需修饰,需注重两侧不要太短就行;','下庭长度适中,无需修饰,需注重两侧不要太短就行;'],
    popupNumber:1,
    popupShow:false
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 上庭选择
  upperPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      upperIndex:e.detail.value,
      popupShow:true,
      popupNumber:1
    })
  },
  // 上庭内容输入
  upperInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      upperValue:e.detail.value
    })
  },
  // 中庭选择
  stallsPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      stallsIndex:e.detail.value,
      popupShow:true,
      popupNumber:2
    })
  },
  // 中庭内容输入
  stallsInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      upperValue:e.detail.value
    })
  },
  // 下庭选择
  lowerPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      lowerIndex:e.detail.value,
      popupShow:true,
      popupNumber:3
    })
  },
  // 下庭内容输入
  lowerInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      upperValue:e.detail.value
    })
  },
  // 上中下庭---关闭
  upperCloseClick:function(e){
    let _this = this;
    _this.setData({
      popupShow:false
    })
  },
  // 上中下庭---选中
  upperContentClick:function(e){
    let _this = this;
    _this.setData({
      popupShow:false
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    wx.navigateBack({
      delta:1
    })
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