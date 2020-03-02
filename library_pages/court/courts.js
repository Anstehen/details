const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione, editUpper, editUpperTitle, editStalls, editStallsTitle, editLower, editLowerTitle, orderUpdate, orderUpdateTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    cancleIcon: `${app.globalData.pictureUrl}/icon/cancle.png`,
    downIcon: `${app.globalData.pictureUrl}/icon/down.png`,
    upperIndex:0,
    upperArray:['上庭偏短','上庭正常','上庭偏长'],
    upperValue:"",
    upperPopupArr:[],
    stallsIndex:0,
    stallsArray:['中庭柔美','中庭硬朗'],
    stallsValue:"",
    stallsPopupArr:[],
    lowerIndex:0,
    lowerArray:['下庭偏短','下庭正常','下庭偏长'],
    lowerValue:"",
    lowerPopupArr:['下庭长度适中,无需修饰,需注重两侧不要太短就行;','下庭长度适中,无需修饰,需注重两侧不要太短就行;'],
    popupNumber:1,
    popupShow:false,
    shangtingArr:[],
    zhongtingArr:[],
    xiatingArr:[]
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 上庭选择
  upperPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingArr = _this.data.shangtingArr;
    let emptyArr = [];
    for (let i in bearingArr){
      if (parseInt(bearingArr[i].uppercourtStatus) == (parseInt(e.detail.value) + 1)){
        bearingArr[i]['content'] = bearingArr[i].uppercourtDesc;
        emptyArr = emptyArr.concat(bearingArr[i]);
      }
    }
    if (emptyArr.length == 1){
      _this.setData({
        upperIndex: e.detail.value,
        popupShow: false,
        popupNumber: 1,
        upperValue: emptyArr[0].uppercourtDesc
      })
    }else{
      _this.setData({
        upperIndex: e.detail.value,
        popupShow: true,
        popupNumber: 1,
        upperPopupArr: emptyArr
      })
    }
  },
  // 上庭内容输入
  upperInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      upperValue:e.detail.value
    })
  },
  // 中庭选择
  stallsPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingArr = _this.data.zhongtingArr;
    let emptyArr = [];
    for (let i in bearingArr) {
      if (parseInt(bearingArr[i].stallsStatus) == (parseInt(e.detail.value) + 1)) {
        bearingArr[i]['content'] = bearingArr[i].stallsDesc;
        emptyArr = emptyArr.concat(bearingArr[i]);
      }
    }
    if (emptyArr.length == 1) {
      _this.setData({
        stallsIndex: e.detail.value,
        popupShow: false,
        popupNumber: 2,
        stallsValue: emptyArr[0].uppercourtDesc
      })
    } else {
      _this.setData({
        stallsIndex: e.detail.value,
        popupShow: true,
        popupNumber: 2,
        upperPopupArr: emptyArr
      })
    }
  },
  // 中庭内容输入
  stallsInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      stallsValue:e.detail.value
    })
  },
  // 下庭选择
  lowerPicker:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingArr = _this.data.xiatingArr;
    let emptyArr = [];
    for (let i in bearingArr) {
      if (parseInt(bearingArr[i].lowerCourtStatus) == (parseInt(e.detail.value) + 1)) {
        bearingArr[i]['content'] = bearingArr[i].lowerCourtDesc;
        emptyArr = emptyArr.concat(bearingArr[i]);
      }
    }
    if (emptyArr.length == 1) {
      _this.setData({
        lowerIndex: e.detail.value,
        popupShow: false,
        popupNumber: 3,
        lowerValue: emptyArr[0].lowerCourtDesc
      })
    } else {
      _this.setData({
        lowerIndex: e.detail.value,
        popupShow: true,
        popupNumber: 3,
        upperPopupArr: emptyArr
      })
    }
  },
  // 下庭内容输入
  lowerInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      lowerValue:e.detail.value
    })
  },
  // 上中下庭---关闭
  upperCloseClick:function(e){
    let _this = this;
    _this.setData({
      popupShow:false
    })
  },
  // 上中下庭---选中
  upperContentClick:function(e){
    let _this = this;
    // console.log(e);
    if (_this.data.popupNumber == 1){//上庭
      _this.setData({
        upperValue: e.currentTarget.dataset.info.content
      })
    } else if (_this.data.popupNumber == 2) {//中庭
      _this.setData({
        stallsValue: e.currentTarget.dataset.info.content
      })
    } else if (_this.data.popupNumber == 3) {//下庭
      _this.setData({
        lowerValue: e.currentTarget.dataset.info.content
      })
    }
    _this.setData({
      popupShow:false
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    if (_this.data.upperValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入上庭描述',
      })
      return
    }
    if (_this.data.stallsValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入中庭描述',
      })
      return
    }
    if (_this.data.lowerValue == "") {
      wx.showToast({
        icon: 'none',
        title: '请输入下庭描述',
      })
      return
    }
    let para = {
      id: app.globalData.compileObject.id,
      uppercourt: _this.data.upperArray[_this.data.upperIndex],
      uppercourtDetail: _this.data.upperValue,
      stalls: _this.data.stallsArray[_this.data.stallsIndex],
      stallsDetail: _this.data.stallsValue,
      lowerCourt: _this.data.lowerArray[_this.data.lowerIndex],
      lowerCourtDetail: _this.data.lowerValue,
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
    // 上庭
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${editUpper}`, para).then(res => {
      // console.log(res);
      let strOne = "";
      let numberOne = 0;
      if (existence(app.globalData.compileObject.uppercourtDetail)){
        strOne = app.globalData.compileObject.uppercourtDetail;
      }else{
        strOne = res[0].uppercourtDesc;
      }
      if (existence(app.globalData.compileObject.uppercourt)) {
        for (let i in _this.data.upperArray){
          if (_this.data.upperArray[i] == app.globalData.compileObject.uppercourt){
            numberOne = i;
          }
        }
      } else {
        numberOne = 0;
      }
      _this.setData({
        shangtingArr:res,
        upperValue: strOne,
        upperIndex: numberOne
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, editUpperTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, editUpperTitle, '数据处理出错');
      })
    // 中庭
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${editStalls}`, para).then(res => {
      // console.log(res);
      let strOne = "";
      let numberOne = 0;
      if (existence(app.globalData.compileObject.stallsDetail)) {
        strOne = app.globalData.compileObject.stallsDetail;
      } else {
        strOne = res[0].stallsDesc;
      }
      if (existence(app.globalData.compileObject.stalls)) {
        for (let i in _this.data.stallsArray){
          if (_this.data.stallsArray[i] == app.globalData.compileObject.stalls){
            numberOne = i;
          }
        }
      } else {
        numberOne = 0;
      }
      _this.setData({
        zhongtingArr: res,
        stallsValue: strOne,
        stallsIndex: numberOne
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, editStallsTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, editStallsTitle, '数据处理出错');
      })
    // 下庭
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${editLower}`, para).then(res => {
      // console.log(res);
      let strOne = "";
      let numberOne = 0;
      if (existence(app.globalData.compileObject.lowerCourtDetail)) {
        strOne = app.globalData.compileObject.lowerCourtDetail;
      } else {
        strOne = res[0].lowerCourtDesc;
      }
      if (existence(app.globalData.compileObject.lowerCourt)) {
        for (let i in _this.data.lowerArray){
          if (_this.data.lowerArray[i] == app.globalData.compileObject.lowerCourt){
            numberOne = i;
          }
        }
      } else {
        numberOne = 0;
      }
      _this.setData({
        xiatingArr: res,
        lowerValue: strOne,
        lowerIndex: numberOne
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, editLowerTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, editLowerTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
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