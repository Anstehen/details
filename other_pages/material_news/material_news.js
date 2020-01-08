const app = getApp();
import { geo } from "../../utils/location.js";
import { gender, stature, heavy } from "../../utils/materal.js";
import { existence } from "../../utils/tools.js";
import { currentTime, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
// 实例化API核心类
// const qqmapsdk = new QQMapWX({
//   key: 'ZC5BZ-V4DWU-XRMVI-2EMGE-A7B3V-BDFVA' // 必填
// });
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    selecSex:0,
    sexArr:[],
    selectAge:"1996-08",
    selecheight:10,
    heightArr: [],
    selecweight: 10,
    weightArr: [],
    longitudeNumber:0,
    dimensionNumber:0,
    locationWether:false,
    locationWords:"",
    occupationArr:['学生','教师','程序员'],
    selectoccupation:0,
    changeArr:['尽可能少的改变','接受适当的改变','是要适合，非常愿意改变'],
    selectchange:0,
    lengthArr:['好看就行','保留长度','希望剪短'],
    lengthchange:0,
    permArr:['不想烫发','不要改变太大','好看就行'],
    permchange:0,
    styleArr:['潮男','绅士','居家'],
    stylechange:0,
    takeArr:['从不','偶尔','经常'],
    takechange:0,
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 性别选择
  sexChange:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      indexSex: e.detail.value
    })
  },
  // 年龄选择
  ageChange:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selectAge: e.detail.value
    })
  },
  // 身高选择
  heightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecheight: e.detail.value
    })
  },
  // 体重选择
  weightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecweight: e.detail.value
    })
  },
  // 获取地理位置
  getLocation:function(e){
    let _this = this;
    if (_this.data.locationWether){//已授权
      wx.navigateTo({
        url: '../map/map',
      })
    }else{
      wx.authorize({
        scope: 'scope.userLocation',
        success(resLocation) {
          // console.log(resLocation);
          // 用户已经同意
          //其他操作...
          // console.log("用户已经同意位置授权");
          wx.openSetting({
            success: function (res) {
              // console.log(res);
              if (res.authSetting["scope.userLocation"] == true) {
                let logNumber = 0;
                let latNumber = 0;
                let locationStr = "";
                geo();//获取位置信息
                let numberFour = 0;
                let placeHandel = setInterval(function () {
                  numberFour += numberFour;
                  if (existence(app.globalData.locationObject) && numberFour <= 10000) {
                    clearInterval(placeHandel);
                    logNumber = app.globalData.locationObject.location.lng;
                    latNumber = app.globalData.locationObject.location.lat;
                    if (app.globalData.locationObjec.address && existence(app.globalData.locationObjec.address)) {
                      locationStr = app.globalData.locationObjec.address;
                    }
                  }
                }, 100)
                _this.setData({
                  locationWether: true,
                  longitudeNumber: logNumber,
                  dimensionNumber: latNumber,
                  locationWords: locationStr
                })
              }
            }
          })
        },
        fail() {
          // console.log("用户已经拒绝位置授权");
        }
      })
    }
  },
  // 职业
  occupationChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selectoccupation: e.detail.value
    })
  },
  // 改变发型的程度
  changeChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selectchange: e.detail.value
    })
  },
  // 改长度的要求
  lengthChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      lengthchange: e.detail.value
    })
  },
  // 改烫发的要求
  permChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      permchange: e.detail.value
    })
  },
  // 体重选择
  weightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecweight: e.detail.value
    })
  },
  // 着装风格
  styleChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      stylechange: e.detail.value
    })
  },
  // 打理习惯
  takeChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      takechange: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    wx.showLoading({
      mask:true,
      title: '数据加载中...',
    })
    // 查看用户是否授权
    let whetherStr = false;
    let logNumber = 0;
    let latNumber = 0;
    let locationStr = "";
    wx.getSetting({
      success: (res) => {
        // console.log(res)
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation']) {
          //已授权
          whetherStr = true;
          geo();//获取位置信息
          let numberFour = 0;
          let placeHandel = setInterval(function () {
            numberFour += numberFour;
            if (existence(app.globalData.locationObject) && numberFour <= 10000) {
              clearInterval(placeHandel);
              logNumber = app.globalData.locationObject.location.lng;
              latNumber = app.globalData.locationObject.location.lat;
              if (app.globalData.locationObjec.address && existence(app.globalData.locationObjec.address)) {
                locationStr = app.globalData.locationObjec.address;
              }
            }
            wx.hideLoading();
          }, 100)
        }else{
          wx.hideLoading();
        }
      }
    })
    _this.setData({
      sexArr: gender(),
      heightArr: stature(),
      weightArr: heavy(),
      longitudeNumber: logNumber,
      dimensionNumber: latNumber,
      locationWether: whetherStr,
      locationWords: locationStr
    })
    wx.navigateTo({
      url: '../map/map',
    })
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