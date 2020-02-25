const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione, selectOrder, selectOrderTitle, selectOrderDetailByOrderId, selectOrderDetailByOrderIdTitle } from '../../config.js';
let refreshJudge = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    serviceIcon: `${app.globalData.pictureUrl}/icon/201911212308service.png`,
    editIcon: `${app.globalData.pictureUrl}/icon/edit.png`,
    flowerIcon: `${app.globalData.pictureUrl}/icon/201911212337flower.png`,
    addressIcon: `${app.globalData.pictureUrl}/icon/address.png`,
    deleteIcon: `${app.globalData.pictureUrl}/icon/delete.png`,
    sendIcon: `${app.globalData.pictureUrl}/icon/201911202250send.png`,
    problemIcon: `${app.globalData.pictureUrl}/icon/201911230100problem.png`,
    addIcon: `${app.globalData.pictureUrl}/icon/202002241817add.png`,
    shapeArr:['1.椭圆形脸的人给人温和，亲近的感觉，在气质上更具有清瘦感。','2.发际线顶端倒下巴底部的长度适中。','3.腮部的棱角不明显呈圆弧形。','4.下巴线条较为柔和，弧度适中。','5.椭圆形脸的女性给人浪漫，优雅，优柔寡断的感觉，不足之处在于由于脸型而略有增龄感。'],
    dots:true,
    autoplay:true,
    interval:5000,
    materialShow:false,
    acceptOrderId:"",
    userDataObject:null,
    editObject:null
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 提交的资料---点击
  materialClick:function(e){
    let _this = this;
    _this.setData({
      materialShow:true
    })
  },
  // 提交的资料---关闭
  shoutDownClick:function(e){
    let _this = this;
    if(e.detail == "弹框关闭"){
      _this.setData({
        materialShow:false
      })
    }
  },
  // 脸型分析---脸型、性格、脸型总结
  faceShapgeClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    wx.navigateTo({
      url: `../../library_pages/shape/shape?transsex=${_this.data.userDataObject.sex}`,
    })
  },
  // 脸型分析---上中下庭
  courtClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    wx.navigateTo({
      url: '../../library_pages/court/courts',
    })
  },
  // 发行推荐---删除
  hairstyleClick:function(e){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除该款发型么?',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定');
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 发行推荐---修改编辑
  hairstyleEidtClick:function(e){
    let _this = this;
    wx.navigateTo({
      url: '../../library_pages/hairstyle/hairstyle',
    })
  },
  // 发色推荐---修改编辑
  colorClick:function(e){
    let _this = this;
    wx.navigateTo({
      url: '../../library_pages/color/color',
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    // 获取订单信息、用户信息
    let para = {
      orderId: _this.data.acceptOrderId
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectOrder}`, para).then(res => {
      // console.log(res);
      _this.setData({
        userDataObject: res,
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError("", selectOrderTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectOrderTitle, '数据处理出错');
    })
    // 查询订单
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectOrderDetailByOrderId}`, para).then(res1 => {
      // console.log(res1);
      _this.setData({
        editObject: res1[0]
      })
      // if (res1.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError("", selectOrderDetailByOrderIdTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectOrderDetailByOrderIdTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(options);
    _this.setData({
      acceptOrderId: options.orderid
    })
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
    let _this = this;
    if (refreshJudge){
      refreshJudge = false;
      _this.initialData();//页面初始数据
    }
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