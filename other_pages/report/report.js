const app = getApp();
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione, userSelectByOpenid, userSelectByOpenidTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    triangleRightIcon: `${app.globalData.pictureUrl}/icon/20191118triangleRight.png`,
    defaultIcon: `${app.globalData.pictureUrl}/icon/202002221950default.png`,
    orderArr:[]
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta:1
    })
  },
  //页面跳转
  lookReportClick: function (e) {
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: "../presentation/presentation",
    })
  },
  // 联系设计师
  phoneClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.info.designePhone //仅为示例，并非真实的电话号码
    })
  },
  // 去上传
  uploadClick: function (e) {
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: `../../other_pages/material/material?transorderid=${e.currentTarget.dataset.info.orderId}`,
    })
  },
  // 页面加载数据展示
  informationData: function (e) {
    let _this = this;
    var para = {
      openid: wx.getStorageSync('userInformation').openid
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${userSelectByOpenid}`, para).then(res => {
      // console.log(res);
      _this.setData({
        orderArr:res
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, userSelectByOpenidTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, userSelectByOpenidTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.informationData();//页面加载数据展示
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