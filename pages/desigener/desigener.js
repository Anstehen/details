const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione, selectByDesigneOpenid, selectByDesigneOpenidTitle, deleteOrder, deleteOrderTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    defaultIcon: `${app.globalData.pictureUrl}/icon/202002221950default.png`,
    enterIcon: `${app.globalData.pictureUrl}/icon/enter.png`,
    stateChioce:1,
    orderArr: [],
    dataObject:null,
    stateNumber:1
  },
  // 我的点击
  minelick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../mine/mine',
    })
  },
  // 资料未上传
  designNoneClick:function(e){
    let _this = this;
    _this.setData({
      stateChioce: 1,
      stateNumber:1
    })
    _this.initialData();//页面初始数据
  },
  // 已设计
  designDoingClick: function (e) {
    let _this = this;
    _this.setData({
      stateChioce: 2,
      stateNumber: 2
    })
    _this.initialData();//页面初始数据
  },
  // 已完成
  designFinishClick: function (e) {
    let _this = this;
    _this.setData({
      stateChioce: 3,
      stateNumber: 3
    })
    _this.initialData();//页面初始数据
  },
  // 订单详情
  orderClick:function(e){
    let _this = this;
    wx.navigateTo({
      url: `../../other_pages/order/order?orderid=${e.currentTarget.dataset.info.orderId}`,
    })
  },
  // 联系用户
  phoneClick: function (e) {
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.info.users[0].userPhone //仅为示例，并非真实的电话号码
    })
  },
  // 删除
  deleteClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.showModal({
      title: '提示',
      content: '您确定要删除改订单么？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          var para = {
            orderId: e.currentTarget.dataset.info.orderId,
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("get", `${selectByDesigneOpenid}`, para).then(res => {
            // console.log(res);
            let bearingArr = _this.data.orderArr;
            let emptyArr = [];
            for (let i in bearingArr){
              if (bearingArr[i].orderId != e.currentTarget.dataset.info.orderId){
                emptyArr = emptyArr.concat(bearingArr[i]);
              }
            }
            _this.setData({
              orderArr: emptyArr
            })
            wx.showToast({
              icon:'none',
              title: '删除成功',
            })
            // if (res.code == 0) {

            // } else {
            //   wx.hideLoading();
            //   askError("", selectByDesigneOpenidTitle, '数据请求出错');
            // }
          }).catch(error => {
            wx.hideLoading();
            askError("", selectByDesigneOpenidTitle, '数据处理出错');
          })
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 页面初始数据
  initialData:function(e){
    let _this = this;
    var para = {
      pageNum: 1,
      pagesize: 100,
      orderStatus: _this.data.stateNumber,
      designeOpenid: wx.getStorageSync("userInformation").openid,
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectByDesigneOpenid}`, para).then(res => {
      // console.log(res);
      _this.setData({
        orderArr:res.list,
        dataObject: res
      })
      // if (res.code == 0) {
        
      // } else {
      //   wx.hideLoading();
      //   askError("", selectByDesigneOpenidTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectByDesigneOpenidTitle, '数据处理出错');
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