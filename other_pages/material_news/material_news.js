const app = getApp();
import { geo } from "../../utils/location.js";
import { gender, stature, heavy } from "../../utils/materal.js";
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform,information,informationTitle } from '../../config.js';
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: 'YIJBZ-M2VWF-X54J5-NITUC-YM6BQ-6EBYA' // 必填
});
let upstream = {
  fullFacePhoto:"",//正面照
  profilePhoto:"",//侧面照
  hairPhoto:"",//发长照
  fullBodyPicture:"",//全身照
  sex:"",//性别
  height:"",//身高
  age:"",//年龄
  weight:"",//体重
  job:"",//职业
  city:"",//省市区
  address:"",//具体街道位置
  degreeOfChange:"",//发行改变程度
  lengthRequirement:"",//长度要求
  hotDye:"",//是否烫染
  clothing:"",//着装风格
  takeCare:"",//打理习惯
}
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
    locationWords:"请选择您的位置",
    occupationArr:[],
    selectoccupation:0,
    changeArr:[],
    selectchange:0,
    lengthArr:[],
    lengthchange:0,
    permArr:[],
    permchange:0,
    styleArr:[],
    stylechange:0,
    takeArr:[],
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
                wx.showLoading({
                  mask:true,
                  title: '数据加载中...',
                })
                geo();//获取位置信息
                let numberFour = 0;
                let placeHandel = setInterval(function () {
                  numberFour += numberFour;
                  if (existence(app.globalData.locationObject) && numberFour <= 10000) {
                    clearInterval(placeHandel);
                    logNumber = app.globalData.locationObject.location.lng;
                    latNumber = app.globalData.locationObject.location.lat;
                    if (app.globalData.locationObject.address && existence(app.globalData.locationObject.address)) {
                      locationStr = app.globalData.locationObject.address;
                    }
                  }
                  wx.hideLoading({});
                  wx.navigateTo({
                    url: '../map/map',
                  })
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
  // 确认提交资料
  immediatelyClick:function(e){
    let _this = this;
    if(_this.data.pictureOne == ""){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '为了给您推荐到店，请选择您的位置',
      })
      return
    }
    var para = {
      
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${informationInsert}`, para).then(res => {
      // console.log(res);
      if (res.code == 0) {
        
      } else {
        wx.hideLoading();
        askError(wx.getStorageSync('userInfo').userId, informationInsertTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, informationInsertTitle, '数据处理出错');
    })
  },
  // 页面加载数据展示
  informationData:function(e){
    let _this = this;
    var para = {}
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${information}`, para).then(res => {
      // console.log(res);
      let arrOne = [];
      let arrTwo = [];
      let arrThree = [];
      let arrFour = [];
      let arrFive = [];
      let arrSix = [];
      if(res && existence(res)){
        for(let i in res){
          // 改变
          if(res[i].category == 1 || res[i].category == '1'){
            arrOne = arrOne.concat(res[i].context);
          }
          // 长度
          if(res[i].category == 2 || res[i].category == '2'){
            arrTwo = arrTwo.concat(res[i].context);
          }
          // 染发
          if(res[i].category == 3 || res[i].category == '3'){
            arrThree = arrThree.concat(res[i].context);
          }
          // 着装
          if(wx.getStorageSync('userInfo').sex == 1 || wx.getStorageSync('userInfo').sex == '1'){//男
            if(res[i].category == 4 || res[i].category == '4'){
              arrFour = arrFour.concat(res[i].context);
            }
          }else{
            if(res[i].category == 5 || res[i].category == '5'){
              arrFour = arrFour.concat(res[i].context);
            }
          }
          // 打理
          if(res[i].category == 6 || res[i].category == '6'){
            arrFive = arrFive.concat(res[i].context);
          }
        }
      }
      _this.setData({
        occupationArr:['学生','教师','程序员'],
        changeArr:arrOne,
        lengthArr:arrTwo,
        permArr:arrThree,
        styleArr:arrFour,
        takeArr:arrFive,
      })
      // if (res.code == 0) {
        
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInfo').userId, informationTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, informationTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.informationData();
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
              if (app.globalData.locationObject.address && existence(app.globalData.locationObject.address)) {
                locationStr = app.globalData.locationObject.address;
              }
            }
            _this.setData({
              longitudeNumber: logNumber,
              dimensionNumber: latNumber,
              locationWether: whetherStr,
              locationWords: locationStr
            })
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
      weightArr: heavy()
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