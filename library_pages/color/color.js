const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { edition, version, platform, smallRoutione, selectHairColorByHairGender, selectHairColorByHairGenderTitle, selectHairColorByHairType, selectHairColorByHairTypeTitle, orderUpdate, orderUpdateTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    unSelectionIcon: `${app.globalData.pictureUrl}/icon/unSelection.png`,
    selectionIcon: `${app.globalData.pictureUrl}/icon/selection.png`,
    gender:"",
    type:0,
    pictureArr:[],
    limitNumber:0,
    selectArr:[]
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 导航---全部
  wholeClick:function(e){
    let _this = this;
    _this.setData({
      type:0
    })
    _this.initialData();//根据性别请求
  },
  // 导航---生活色
  lifeClick: function (e) {
    let _this = this;
    _this.setData({
      type: 1
    })
    _this.dataType();//根据类型请求
  },
  // 导航---潮色
  dampClick: function (e) {
    let _this = this;
    _this.setData({
      type: 2
    })
    _this.dataType();//根据类型请求
  },
  // 发色选择
  selectClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    let currentObject = e.currentTarget.dataset.info;
    let bearingArr = _this.data.pictureArr;
    let chioceArr = _this.data.selectArr;
    if (_this.data.limitNumber == 0){
      wx.showToast({
        icon: 'none',
        duration: 2000,
        title: '只能上传三张图片哦！请删除后再选择',
      })
    } else {
      if (chioceArr.length == _this.data.limitNumber && currentObject.choice == _this.data.unSelectionIcon) {
        wx.showToast({
          icon: 'none',
          duration:2000,
          title: '只能上传三张图片哦！请删除后再选择',
        })
        return
      }
      if (_this.data.limitNumber != chioceArr.length || currentObject.choice != _this.data.unSelectionIcon){
        let emptyArr = [];
        for (let i in bearingArr){
          if (bearingArr[i].id == currentObject.id){
            if (bearingArr[i].choice == _this.data.unSelectionIcon){
              bearingArr[i].choice = _this.data.selectionIcon;
            }else{
              bearingArr[i].choice = _this.data.unSelectionIcon;
            }
          }
          emptyArr = emptyArr.concat(bearingArr[i]);
        }
        let saveArr = [];
        for (let i in emptyArr){
          if (emptyArr[i].choice == _this.data.selectionIcon){
            saveArr = saveArr.concat(emptyArr[i]);
          }
        }
        _this.setData({
          pictureArr: emptyArr,
          selectArr: saveArr
        })
      }else{
        wx.showToast({
          icon: 'none',
          title: '只能上传三张图片哦！请删除后在选择',
        })
      }
    }
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    if (_this.data.limitNumber == 0 || _this.data.selectArr.length == 0){
      wx.navigateBack({
        delta: 1
      })
    }else{
      let uploadStr = "";
      for (let i in _this.data.selectArr){
        uploadStr = uploadStr + "," + _this.data.selectArr[i].hairColor
      }
      uploadStr = uploadStr.substr(1);
      if (existence(app.globalData.compileObject.hairColor)){
        uploadStr = app.globalData.compileObject.hairColor + "," + uploadStr;
      }
      let para = {
        id: app.globalData.compileObject.id,
        hairColor: uploadStr
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
          askError("", orderUpdateTitle, '数据请求出错');
        }
      }).catch(error => {
        wx.hideLoading();
        askError("", orderUpdateTitle, '数据处理出错');
      })
    }
  },
  // 根据类型请求
  dataType:function(){
    let _this = this;
    let para = {
      hairType: _this.data.type
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectHairColorByHairType}`, para).then(res => {
      // console.log(res);
      let bearingArr = res;
      let emptyArr = [];
      for (let i in bearingArr) {
        bearingArr[i]['choice'] = _this.data.unSelectionIcon;
        emptyArr = emptyArr.concat(bearingArr[i]);
      }
      _this.setData({
        pictureArr: emptyArr
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError("", selectHairColorByHairTypeTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectHairColorByHairTypeTitle, '数据处理出错');
    })
  },
  // 根据性别请求
  initialData: function (e) {
    let _this = this;
    let para = {
      hairGender: _this.data.gender
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${selectHairColorByHairGender}`, para).then(res => {
      // console.log(res);
      let bearingArr = res;
      let emptyArr = [];
      for(let i in bearingArr){
        bearingArr[i]['choice'] = _this.data.unSelectionIcon;
        emptyArr = emptyArr.concat(bearingArr[i]);
      }
      _this.setData({
        pictureArr: emptyArr
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError("", selectHairColorByHairGenderTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError("", selectHairColorByHairGenderTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    let numberOne = 0;
    if (existence(app.globalData.compileObject.hairColor)){
      let bearingArr = [];
      if (app.globalData.compileObject.hairColor.indexOf(",") == -1){
        bearingArr = [app.globalData.compileObject.hairColor];
      }else{
        bearingArr = app.globalData.compileObject.hairColor.split(",");
      }
      if (bearingArr.length == 0) {
        numberOne = 3;
      } else if (bearingArr.length == 1) {
        numberOne = 2;
      } else if (bearingArr.length == 2) {
        numberOne = 1;
      } else {
        numberOne = 0;
      }
    } else {
      numberOne = 0;
    }
    _this.setData({
      gender: options.transsex,
      limitNumber: numberOne
    })
    _this.initialData();//根据性别请求
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