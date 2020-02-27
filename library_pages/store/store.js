const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione, editShop, editShopTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    storeArr:[]
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 查看详情
  detailClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.navigateTo({
      url: `../../library_pages/store_detail/store_detail?transshopid=${e.currentTarget.dataset.info.shopId}`,
    })
  },
  // 确定
  defineClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    app.globalData.storeObject = e.currentTarget.dataset.info;
    wx.navigateBack({
      delta: 1
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    let para = {}
    ask("get", `${editShop}`, para).then(res => {
      // console.log(res);
      _this.setData({
        storeArr:res
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError("", editShopTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", editShopTitle, '数据处理出错');
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