const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
let refreshJudge = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    addressIcon: `${app.globalData.pictureUrl}/icon/address.png`,
    deleteIcon: `${app.globalData.pictureUrl}/icon/delete.png`,
    editIcon: `${app.globalData.pictureUrl}/icon/edit.png`,
    addIcon: `${app.globalData.pictureUrl}/icon/202002241817add.png`,
    phoneValues:"12345678900",
    readyValues:"1、我是学生，发量适中，发质属于比较细软，对长度的要求是好看就行，对刘海的要求是都可以，对烫染的要求是只要好看都能接受，头发打理的时间是没时间打理，穿着风格是潮男,型男,文艺,轻奢，日常喜欢户外运动，对于造型只要适合我，非常接受改变，关于美，我的态度是适可而止，理性对待。\n2、根据您的整体脸型,可以选择两侧较长,头顶偏平的发型;切记,不要让两侧剪的太短,不要做头顶太高的造型,这样的话会显得脸更宽、更长。",
    carefulValues:"1、我是学生，发量适中，发质属于比较细软，对长度的要求是好看就行，对刘海的要求是都可以，对烫染的要求是只要好看都能接受，头发打理的时间是没时间打理，穿着风格是潮男,型男,文艺,轻奢，日常喜欢户外运动，对于造型只要适合我，非常接受改变，关于美，我的态度是适可而止，理性对待。\n2、根据您的整体脸型,可以选择两侧较长,头顶偏平的发型;切记,不要让两侧剪的太短,不要做头顶太高的造型,这样的话会显得脸更宽、更长。",
    pageDifferent:0,//0是添加，1是修改
    dataObject:null,
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 清空
  cleanClick:function(e){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您确定要清空发型图片么？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          publicFunction();
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 本地库选择
  localClick:function(e){
    let _this = this;
    
  },
  // 设计师联系方式
  phoneInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      phoneValues:e.detail.value
    })
  },
  // 店铺---删除
  storeDeleteClick:function(e){
    let _this = this;
    if (!existence(_this.data.dataObject.storeObject.shopName)){
      wx.showToast({
        icon:'none',
        title: '您还没有选择店铺，请先选择!',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '您确定要删除该推荐的商店么?',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 店铺---选择
  storeChoiceClick:function(e){
    let _this = this;
    refreshJudge = true;
    wx.navigateTo({
      url: '../../library_pages/store/store',
    })
  },
  // 去店铺前的准备
  readyInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      readyValues:e.detail.value
    })
  },
  // 到店后需要注意
  carefulInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      carefulValues:e.detail.value
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(app.globalData.hairstyleObject);
    let numberOne = 0;
    if (options.disitinguish == 0 || options.disitinguish == '0'){
      numberOne = 0;
    }else{
      numberOne = 1;
    }
    let strOne = "";
    if (existence(app.globalData.hairstyleObject.storeObject.mobilePhone)){
      strOne = app.globalData.hairstyleObject.storeObject.mobilePhone;
    }
    let strTwo = "";
    if (existence(app.globalData.hairstyleObject.storeObject.shopBefore)) {
      strTwo = app.globalData.hairstyleObject.storeObject.shopBefore;
    }
    let strThree = "";
    if (existence(app.globalData.hairstyleObject.storeObject.shopAfter)) {
      strThree = app.globalData.hairstyleObject.storeObject.shopAfter;
    }
    _this.setData({
      pageDifferent: numberOne,
      dataObject: app.globalData.hairstyleObject,
      phoneValues: strOne,
      readyValues: strTwo,
      carefulValues: strThree
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
    let _this = this;
    if (refreshJudge){
      refreshJudge = false;
      let bearingObject = _this.data.dataObject;
      bearingObject.storeObject = app.globalData.storeObject;
      let strOne = "";
      if (existence(app.globalData.storeObject.mobilePhone)) {
        strOne = app.globalData.storeObject.mobilePhone;
      }
      let strTwo = "";
      if (existence(app.globalData.storeObject.shopBefore)) {
        strTwo = app.globalData.storeObject.shopBefore;
      }
      let strThree = "";
      if (existence(app.globalData.storeObject.shopAfter)) {
        strThree = app.globalData.storeObject.shopAfter;
      }
      _this.setData({
        dataObject: bearingObject,
        phoneValues: strOne,
        readyValues: strTwo,
        carefulValues: strThree
      })
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