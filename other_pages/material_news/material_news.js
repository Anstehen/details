const app = getApp();
import { geo } from "../../utils/location.js";
import { gender, stature, heavy } from "../../utils/materal.js";
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform,information,informationTitle,updateOrder,updateOrderTitle } from '../../config.js';
var QQMapWX = require('../../lib/qqmap-wx-jssdk.js');
// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: 'YIJBZ-M2VWF-X54J5-NITUC-YM6BQ-6EBYA' // 必填
});
let upstream = {
  orderId:"",
  orderStatus: 2,//订单状态。1，默认已付款，待填写信息。2，信息填写完成。
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
    acceptOrderId:"",
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
    if(e.detail.value == "男"){
      upstream.sex = 1;
    }else{
      upstream.sex = 0;
    }
  },
  // 年龄选择
  ageChange:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selectAge: e.detail.value
    })
    upstream.age = e.detail.value;
  },
  // 身高选择
  heightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecheight: e.detail.value
    })
    upstream.height = e.detail.value;
  },
  // 体重选择
  weightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecweight: e.detail.value
    })
    upstream.weight = e.detail.value;
  },
  // 获取地理位置
  getLocation:function(e){
    let _this = this;
    let whetherStr = false;
    let logNumber = 0;
    let latNumber = 0;
    let locationStr = "";
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
          wx.showLoading({
            mask: true,
            title: '数据加载中...',
          })
          whetherStr = true;
          //获取位置信息
          geo(function (res) {
            // console.log(res);
            logNumber = res.location.lng;
            latNumber = res.location.lat;
            if (res.address && existence(res.address)) {
              locationStr = res.address;
            }
            _this.setData({
              longitudeNumber: logNumber,
              dimensionNumber: latNumber,
              locationWether: whetherStr,
              locationWords: locationStr
            })
            upstream.city = locationStr;
            wx.hideLoading();
          });
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
    upstream.city = _this.data.occupationArr[e.detail.value];
  },
  // 改变发型的程度
  changeChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selectchange: e.detail.value
    })
    upstream.degreeOfChange = _this.data.changeArr[e.detail.value];
  },
  // 改长度的要求
  lengthChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      lengthchange: e.detail.value
    })
    upstream.lengthRequirement = _this.data.lengthArr[e.detail.value];
  },
  // 改烫发的要求
  permChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      permchange: e.detail.value
    })
    upstream.hotDye = _this.data.permArr[e.detail.value];
  },
  // 体重选择
  weightChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      selecweight: e.detail.value
    })
    upstream.weight = _this.data.weightArr[e.detail.value];
  },
  // 着装风格
  styleChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      stylechange: e.detail.value
    })
    upstream.clothing = _this.data.styleArr[e.detail.value];
  },
  // 打理习惯
  takeChange: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      takechange: e.detail.value
    })
    upstream.takeCare = _this.data.takeArr[e.detail.value];
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
    wx.showLoading({
      mask:true,
      title: '资料上传中...',
    })
    var para = upstream;
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${updateOrder}`, para).then(res => {
      // console.log(res);
      if (res1.status == 200) {
        wx.hideLoading();
        wx.navigateTo({
          url: '../material_success/material_success',
        })
      } else {
        wx.hideLoading();
        askError(wx.getStorageSync('userInformation').userId, updateOrderTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, updateOrderTitle, '数据处理出错');
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
          if(wx.getStorageSync('userInformation').sex == 1 || wx.getStorageSync('userInformation').sex == '1'){//男
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
          // 职业
          if(res[i].category == 7 || res[i].category == '7'){
            arrSix = arrSix.concat(res[i].context);
          }
        }
      }
      upstream.degreeOfChange = arrOne[0];
      upstream.lengthRequirement = arrTwo[0];
      upstream.hotDye = arrThree[0];
      upstream.clothing = arrFour[0];
      upstream.takeCare = arrFive[0];
      upstream.job = arrSix[0];
      _this.setData({
        occupationArr:arrSix,
        changeArr:arrOne,
        lengthArr:arrTwo,
        permArr:arrThree,
        styleArr:arrFour,
        takeArr:arrFive,
      })
      // if (res.code == 0) {
        
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, informationTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, informationTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(options);
    _this.informationData();
    upstream.orderId = options.transorderid;
    upstream.fullFacePhoto = app.globalData.pictureObj.imageOne;
    upstream.profilePhoto = app.globalData.pictureObj.imageTwo;
    upstream.hairPhoto = app.globalData.pictureObj.imageThree;
    upstream.fullBodyPicture = app.globalData.pictureObj.imageFour;
    upstream.sex = 0;
    upstream.height = 110;
    upstream.age = "1996-08";
    upstream.weight = 50;
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
        // console.log(res);
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation']) {
          //已授权
          whetherStr = true;
          //获取位置信息
          geo(function(res){
            // console.log(res);
            logNumber = res.location.lng;
            latNumber = res.location.lat;
            if (res.address && existence(res.address)) {
              locationStr = res.address;
            }
            _this.setData({
              longitudeNumber: logNumber,
              dimensionNumber: latNumber,
              locationWether: whetherStr,
              locationWords: locationStr
            })
            upstream.city = locationStr;
            wx.hideLoading();
          });
        }else{
          wx.hideLoading();
        }
      }
    })
    _this.setData({
      sexArr: gender(),
      heightArr: stature(),
      weightArr: heavy(),
      acceptOrderId: options.transorderid
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