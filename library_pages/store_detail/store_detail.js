const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione, editShopDetail, editShopDetailTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    dots:true,
    autoplay:true,
    interval:5000,
    pictureArr:[],
    dataObject:null,
    acceptShopid:""
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 图片预览
  previewClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.previewImage({
      current: e.currentTarget.dataset.info, // 当前显示图片的http链接
      urls: _this.data.pictureArr // 需要预览的图片http链接列表
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    let para = {
      shopId: _this.data.acceptShopid
    }
    ask("get", `${editShopDetail}`, para).then(res => {
      // console.log(res);
      let emptyArr = [];
      if (existence(res.shopPhoto)){
        if (res.shopPhoto.indexOf(",") == -1){
          emptyArr = [res.shopPhoto];
        }else{
          emptyArr = res.shopPhoto.split(",")
        }
      }
      emptyArr = emptyArr.concat(res.shopAddressphoto);
      _this.setData({
        pictureArr: emptyArr,
        dataObject:res,
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, editShopDetailTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, editShopDetailTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(options);
    _this.setData({
      acceptShopid: options.transshopid
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
    return {
      title: "您的专属发型师为您提供方案",
      path: "/pages/transition/transition",
      imageUrl: "https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/homePage/202002191115picture.jpg",
      success: (res) => {
      }
    }
  }
})