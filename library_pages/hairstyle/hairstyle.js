const app = getApp();
import { currentTime, existence, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    distinguish:2,
    phoneValues:"12345678900",
    readyValues:"1、我是学生，发量适中，发质属于比较细软，对长度的要求是好看就行，对刘海的要求是都可以，对烫染的要求是只要好看都能接受，头发打理的时间是没时间打理，穿着风格是潮男,型男,文艺,轻奢，日常喜欢户外运动，对于造型只要适合我，非常接受改变，关于美，我的态度是适可而止，理性对待。\n2、根据您的整体脸型,可以选择两侧较长,头顶偏平的发型;切记,不要让两侧剪的太短,不要做头顶太高的造型,这样的话会显得脸更宽、更长。",
    carefulValues:"1、我是学生，发量适中，发质属于比较细软，对长度的要求是好看就行，对刘海的要求是都可以，对烫染的要求是只要好看都能接受，头发打理的时间是没时间打理，穿着风格是潮男,型男,文艺,轻奢，日常喜欢户外运动，对于造型只要适合我，非常接受改变，关于美，我的态度是适可而止，理性对待。\n2、根据您的整体脸型,可以选择两侧较长,头顶偏平的发型;切记,不要让两侧剪的太短,不要做头顶太高的造型,这样的话会显得脸更宽、更长。",
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 本地库
  localLibraryClick:function(e){
    let _this = this;
    if(_this.data.distinguish == 2){
      wx.showModal({
        title: '提示',
        content: '您确定要清空发型库图片，从本地上传么？',
        success (res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            publicFunction();
          } else if (res.cancel) {
            // console.log('用户点击取消');
          }
        }
      })
    }else{
      publicFunction();
    }
    let publicFunction = function(){
      wx.chooseImage({
        count: 8,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: function (res) {
          // console.log(res);

        }
      })
    }
  },
  // 发型库
  hairstyleLibraryClick:function(e){
    let _this = this;
    if(_this.data.distinguish == 1){
      wx.showModal({
        title: '提示',
        content: '您确定要清空本地发型图片，从发型库选择么？',
        success (res) {
          if (res.confirm) {
            // console.log('用户点击确定');
            storeFunction();
          } else if (res.cancel) {
            // console.log('用户点击取消');
          }
        }
      })
    }else{
      storeFunction(); 
    }
    function storeFunction(){
      wx.navigateTo({
        url: '../../library_pages/store/store',
      })
    }
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
    hairstyleClick:function(e){
      let _this = this;
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
    // 店铺---修改编辑
    hairstyleEidtClick:function(e){
      let _this = this;
      wx.navigateTo({
        url: '../../library_pages/hairstyle/hairstyle',
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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