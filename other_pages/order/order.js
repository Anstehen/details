const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione, selectOrder, selectOrderTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    attestationIcon: `${app.globalData.pictureUrl}/icon/20191119attestation.png`,
    sendIcon: `${app.globalData.pictureUrl}/icon/201911202250send.png`,
    editIcon: `${app.globalData.pictureUrl}/icon/201911202250edit.png`,
    lookIcon: `${app.globalData.pictureUrl}/icon/201911202303look.png`,
    swiperArr:[],
    orderid:"",
    dataObject:null
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 图片预览
  picturePriveiw:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.previewImage({
      current: e.currentTarget.dataset.info, // 当前显示图片的http链接
      urls: _this.data.swiperArr// 需要预览的图片http链接列表
    })
  },
  // 电话联系
  phoneClick:function(e){
    // console.log(e.currentTarget.dataset.info);
    let _this = this;
    wx.makePhoneCall({
      phoneNumber: _this.data.dataObject.users[0].userPhone //仅为示例，并非真实的电话号码
    })
  },
  // 查看报告
  lookReport:function(e){
    let _this = this;
    wx.navigateTo({
      url: '../presentation/presentation',
    })
  },
  // 编辑点击
  editClick:function(e){
    let _this = this;
    wx.navigateTo({
      url: `../../other_pages/edit/edit?orderid=${_this.data.acceptOrderId}`,
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    var para = {
      orderId: _this.data.acceptOrderId
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectOrder}`, para).then(res => {
      // console.log(res);
      _this.setData({
        dataObject:res,
        swiperArr: [res.fullFacePhoto, res.fullBodyPicture, res.hairPhoto, res.profilePhoto]
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