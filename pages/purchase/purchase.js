const app = getApp();
import { existence,symbolArr } from '../../utils/tools.js';
import { ask, askError } from '../../utils/demand.js';
import { placeAnOrder } from '../../utils/order.js';
import { getPhone } from '../../utils/authorize.js';
import { edition, version, platform, smallRoutione,selectByIdentity,selectByIdentityTitle,selectAllService,selectAllServiceTitle } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    designerIcon:`${app.globalData.pictureUrl}/201911212245designer.jpg`,
    serviceIcon:`${app.globalData.pictureUrl}/201911212308service.png`,
    flowerIcon:`${app.globalData.pictureUrl}/201911212337flower.png`,
    problemIcon:`${app.globalData.pictureUrl}/201911230100problem.png`,
    orderIcon:`${app.globalData.pictureUrl}/201911212218placeAnOrder.png`,
    limitOrderTimes:true,
    phonePopupShow:false,
    designerObject:null,
    serverObject:null,
    carouselArr: [],
    introduceArr:[],
    serviceArr: [],
    doneStr: "",
    experienceStr: "",
    tengledStr: "",
    wantStr: "",
    detailArr: [],
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 轮播图预览
  carouselPreview:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.previewImage({
      current: e.currentTarget.dataset.info, // 当前显示图片的http链接
      urls: _this.data.carouselArr // 需要预览的图片http链接列表
    })
  },
  // 微信二维码预览
  codeClick:function(e){
    let _this = this;
    // console.log(_this.data.designerObject.wechat)
    wx.previewImage({
      current: _this.data.designerObject.wechat, // 当前显示图片的http链接
      urls: [_this.data.designerObject.wechat] // 需要预览的图片http链接列表
    })
  },
  // 手机授权---确定
  phoneWarrantClick:function(e){
    let _this = this;
    // console.log(e);
    if(e.detail == "refuse"){//手机号授权---拒绝
      _this.setData({
        phonePopupShow:false
      })
    }else{//手机号授权---允许
      _this.setData({
        phonePopupShow:false
      })
      // getPhone(e.detail,function(res){
      //   console.log(res);
      // });
    }
  },
  // 手机号授权---取消
  phoneCloseClick:function(e){
    let _this = this;
    _this.setData({
      phonePopupShow:false
    })
  },
  // 立即下单
  immediatelyClick:function(e){
    let _this = this;
    // console.log(wx.getStorageSync("userInformation"));
    if(!existence(wx.getStorageSync("userInformation").userPhone)){
      // _this.setData({
      //   phonePopupShow:true
      // })
      placeAnOrder();
    }else{
      if(_this.data.limitOrderTimes){
        placeAnOrder();
      }
    }
  },
  // 页面加载数据展示
  getDataInformation:function(e){
    let _this = this;
    // 1.0 设计师信息
    let para = {};
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${selectByIdentity}`, para).then(res => {
      // console.log(res);
      let objectOne = null;
      if(res && existence(res) && res.length != 0){
        objectOne = res[0];
      }
      _this.setData({
        designerObject:objectOne
      })
      // if (res.code == 0) {
      //   _this.setData({
          
      //   })
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInfo').userId, selectByIdentityTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, selectByIdentityTitle, '数据处理出错');
    })
    // 2.0 设计师服务信息
    let paraOne = {};
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("post", `${selectAllService}`, paraOne).then(res => {
      // console.log(res);
      let server = null;
      let arrOne = [];
      let arrTwo = [];
      let strOne = "";
      let strTwo = "";
      let strThree = "";
      let strFour = "";
      let arrThree = [];
      let arrFour = [];
      if(res && existence(res) && res.length != 0){
        server = res[0];
        // console.log(server);
        arrOne = symbolArr(server.carousel,"|");
        arrTwo = symbolArr(server.designeService,"|");
        strOne = server.designeDo;
        strTwo = server.experience;
        strThree = server.ourProblem;
        strFour = server.noExperience;
        arrThree = symbolArr(server.serviceDetail,"|");
        arrFour = symbolArr(server.designeDuty,"|");
      }
      let emptyArr = [];
      if(arrThree.length != 0){
        for(let i in arrThree){
          if(arrThree[i].indexOf("&") != -1){
            emptyArr = emptyArr.concat({"title":symbolArr(arrThree[i],"&")[0],"content":symbolArr(arrThree[i],"&")[1]});
          }else{
            emptyArr = emptyArr.concat({"content":arrThree[i]});
          }     
        }
        arrThree = emptyArr;
      }
      _this.setData({
        serverObject:server,
        carouselArr: arrOne,
        introduceArr:arrFour,
        serviceArr: arrTwo,
        doneStr: strOne,
        experienceStr: strTwo,
        tengledStr: strThree,
        wantStr: strFour,
        detailArr: arrThree,
      })
      // if (res.code == 0) {
      //   _this.setData({
          
      //   })
      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInfo').userId, selectAllServiceTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInfo').userId, selectAllServiceTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    _this.getDataInformation();
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