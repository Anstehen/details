// other_pages/editDetail/editDetail.js
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
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
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
    const that = this
    //脸型查询
    wx.request({
      url: 'https://www.hzweirui.com/hairstyle/facesummary/selectAll',
      success(res){
        this.setData({
          facesummary:res
        })
      }
    })
    //上庭查询
    wx.request({
      url: 'https://www.hzweirui.com/hairstyle/uppercourt/selectAll',
      success(res) {
        this.setData({
          uppercourt: res
        })
      }
    })
    //中庭查询
    wx.request({
      url: 'https://www.hzweirui.com/hairstyle/stalls/selectAll',
      success(res) {
        this.setData({
          stalls: res
        })
      }
    })
    //下庭查询
    wx.request({
      url: 'https://www.hzweirui.com/hairstyle/lowerCourt/selectAll',
      success(res) {
        this.setData({
          lowerCourt: res
        })
      }
    })
    
    
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