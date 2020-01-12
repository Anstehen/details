const app = getApp();
import { existence } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { pictureUpload } from '../../utils/picture.js';
import { edition, version, platform } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    pictureOne:"",
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 正面照图片
  choicePicture:function(){
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success(res) {
        // console.log(res.tapIndex)
        if (!res.cancel) {
          if (res.tapIndex == 0) {//从相册中选择
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album'],
              success: function (res) {
                // console.log(res.tempFilePaths[0]);
                wx.showLoading({
                  mask:true,
                  title: '图片上传中...',
                })
                console.log(pictureUpload(res.tempFilePaths[0]));
                
                _this.setData({
                  pictureOne:pictureUpload(res.tempFilePaths[0])
                })
              }
            })
          } else {
            // console.log('拍照');
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['camera'],
              success: function (res) {
                // console.log(res);

              }
            })
          }
        }
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 下一步点击
  nextStep:function(){
    let _this = this;
    wx.navigateTo({
      url: '../material_news/material_news',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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