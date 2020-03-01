const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione, editSelectAll, editSelectAllTitle, orderUpdate, orderUpdateTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    downIcon: `${app.globalData.pictureUrl}/icon/down.png`,
    index:0,
    faceShapeArray:[],
    faceTitle:"",
    faceValue:"",
    characterValue:"",
    summaryValue:"",
    askArr:[],
    gender:0,
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 脸型选择
  bindPickerChange:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingArr = _this.data.askArr;
    let strOne = "";
    let strTwo = "";
    if (_this.data.gender == 0 || _this.data.gender == '0') {
      strOne = bearingArr[e.detail.value].shapeCharacter.split("&")[0];
      strTwo = bearingArr[e.detail.value].shapeSummary.split("&")[0];
    } else {
      strOne = bearingArr[e.detail.value].shapeCharacter.split("&")[1];
      strTwo = bearingArr[e.detail.value].shapeSummary.split("&")[1];
    }
    _this.setData({
      index:e.detail.value,
      faceTitle: _this.data.faceShapeArray[e.detail.value],
      faceValue: bearingArr[e.detail.value].shapeContent,
      characterValue: strOne,
      summaryValue: strTwo
    })
  },
  // 脸型内容
  textareaInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      faceValue:e.detail.value
    })
  },
  // 性格内容
  characterInput: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      characterValue: e.detail.value
    })
  },
  // 脸型总结
  summaryInput: function (e) {
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      summaryValue: e.detail.value
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    if (_this.data.faceValue == ""){
      wx.showToast({
        icon:'none',
        title: '请输入脸型描述',
      })
      return
    }
    if (_this.data.characterValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入性格描述',
      })
      return
    }
    if (_this.data.summaryValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入脸型总结',
      })
      return
    }
    let para = {
      id: app.globalData.compileObject.id,
      faceShape: _this.data.faceTitle,
      faceShapeDetail: _this.data.faceValue,
      faceShapeCharacter: _this.data.characterValue,
      faceSummary: _this.data.summaryValue,
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${orderUpdate}`, para).then(res => {
      // console.log(res);
      if (res.status == 200) {
        wx.showToast({
          icon: "none",
          title: '修改成功！',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        wx.hideLoading();
        askError(wx.getStorageSync('userInformation').userId, orderUpdateTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, orderUpdateTitle, '数据处理出错');
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    let para = {}
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${editSelectAll}`, para).then(res => {
      // console.log(res);
      let arrOne = [];
      for(let i in res){
        arrOne = arrOne.concat(res[i].faceShape)
      }
      if (existence(_this.data.faceTitle)) {
        _this.setData({
          askArr: res,
          faceShapeArray: arrOne,
        })
      } else {
        let strOne = "";
        let strTwo = "";
        let strThree = "";
        let strFour = "";
        strOne = res[0].faceShape;
        strTwo = res[0].shapeContent;
        if (_this.data.gender == 0 || _this.data.gender == '0'){
          strThree = res[0].shapeCharacter.split("&")[0];
          strFour = res[0].shapeSummary.split("&")[0];
        }else{
          strThree = res[0].shapeCharacter.split("&")[1];
          strFour = res[0].shapeSummary.split("&")[1];
        }
        _this.setData({
          askArr: res,
          faceShapeArray: arrOne,
          faceTitle: strOne,
          faceValue: strTwo,
          characterValue: strThree,
          summaryValue: strFour
        })
      }
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, editSelectAllTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, editSelectAllTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let strOne = "";
    let strTwo = "";
    let strThree = "";
    let strFour = "";
    if (existence(app.globalData.compileObject.faceShapeCharacter)) {
      strOne = app.globalData.compileObject.faceShapeDetail;
      strTwo = app.globalData.compileObject.faceShapeCharacter;
      strThree = app.globalData.compileObject.faceShape;
      strFour = app.globalData.compileObject.faceSummary;
    }
    _this.setData({
      gender: options.transsex,
      faceValue: strOne,
      characterValue: strTwo,
      faceTitle: strThree,
      summaryValue: strFour
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