const app = getApp();
import { geo } from "../../utils/location.js";
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform, smallRoutione, selectOrderDetailByOrderId, selectOrderDetailByOrderIdTitle, selectOrder, selectOrderTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    serviceIcon: `${app.globalData.pictureUrl}/icon/201911212308service.png`,
    flowerIcon: `${app.globalData.pictureUrl}/icon/201911212337flower.png`,
    problemIcon: `${app.globalData.pictureUrl}/icon/201911230100problem.png`,
    addressIcon: `${app.globalData.pictureUrl}/icon/address.png`,
    shapeArr:['1.椭圆形脸的人给人温和，亲近的感觉，在气质上更具有清瘦感。','2.发际线顶端倒下巴底部的长度适中。','3.腮部的棱角不明显呈圆弧形。','4.下巴线条较为柔和，弧度适中。','5.椭圆形脸的女性给人浪漫，优雅，优柔寡断的感觉，不足之处在于由于脸型而略有增龄感。'],
    dots:true,
    autoplay:true,
    interval:5000,
    hairColourArr:[],
    materialShow:false,
    acceptOrderId:"",
    userDataObject:null,
    dataObject:null
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
  // 发色推荐---预览
  hairColourClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.previewImage({
      current: e.currentTarget.dataset.info, // 当前显示图片的http链接
      urls: _this.data.hairColourArr // 需要预览的图片http链接列表
    })
  },
  // 地址导航
  // addressClick:function(e){
  //   let _this = this;
  //   wx.getSetting({
  //     success: (res) => {
  //       // console.log(res);
  //       // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
  //       // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
  //       // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
  //       if (res.authSetting['scope.userLocation']) {
  //         //获取位置信息
  //         wx.getLocation({
  //           type: 'gcj02', //返回可以用于wx.openLocation的经纬度
  //           success(res) {
  //             const latitude = res.latitude
  //             const longitude = res.longitude
  //             wx.openLocation({
  //               latitude: Number(latitude),
  //               longitude: Number(longitude),
  //               scale: 18
  //             })
  //           }
  //         })
  //       } else {
  //         wx.authorize({
  //           scope: 'scope.userLocation',
  //           success(resLocation) {
  //             // console.log(resLocation);
  //             // 用户已经同意
  //             //获取位置信息
  //             wx.getLocation({
  //               type: 'gcj02', //返回可以用于wx.openLocation的经纬度
  //               success(res) {
  //                 const latitude = res.latitude
  //                 const longitude = res.longitude
  //                 wx.openLocation({
  //                   latitude: Number(latitude),
  //                   longitude: Number(longitude),
  //                   scale: 18
  //                 })
  //               }
  //             })
  //           },
  //           fail() {
  //             // console.log("用户已经拒绝位置授权");
  //           }
  //         })
  //       }
  //     }
  //   })
  // },
  // 页面加载数据展示
  informationData: function (e) {
    let _this = this;
    let paraOne = {
      orderId: _this.data.acceptOrderId
    }
    ask("get", `${selectOrder}`, paraOne).then(res => {
      // console.log(res);
      _this.setData({
        userDataObject: res,
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, selectOrderTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, selectOrderTitle, '数据处理出错');
    })
    var para = {
      orderId: _this.data.acceptOrderId
    }
    ask("get", `${selectOrderDetailByOrderId}`, para).then(res => {
      // console.log(res);
      let bearingObject = res[0];
      let emptyArr = [];
      for (let i in bearingObject.orderRecommends){
        bearingObject.orderRecommends[i].recommend = JSON.parse(bearingObject.orderRecommends[i].recommend);
        bearingObject.orderRecommends[i].shop = JSON.parse(bearingObject.orderRecommends[i].shop);
        emptyArr = emptyArr.concat(bearingObject.orderRecommends[i]);
      }
      bearingObject.orderRecommends = emptyArr;
      let colourArr = [];
      if (existence(bearingObject.hairColor)){
        if (bearingObject.hairColor.indexOf(",") == -1){
          colourArr = [bearingObject.hairColor];
        }else{
          colourArr = bearingObject.hairColor.split(",");
        }
      }
      _this.setData({
        dataObject: bearingObject,
        hairColourArr: colourArr
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, selectOrderDetailByOrderIdTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, selectOrderDetailByOrderIdTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(options);
    _this.setData({
      acceptOrderId: options.transorderid
    })
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
    return {
      title: "您的专属发型师为您提供方案",
      path: "/pages/transition/transition",
      imageUrl: "https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/homePage/202002191115picture.jpg",
      success: (res) => {
      }
    }
  }
})