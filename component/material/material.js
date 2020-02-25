const app = getApp();
import { existence, dataStr } from "../../utils/tools.js";
Component({
    properties:{
        // 这里定义了 heaText 属性，属性值可以在组件使用时指定
        information:{
            type:Object,
            value:{},
        }
    },
    data:{
      //组件内部数 
      screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
      cancleIcon: `${app.globalData.pictureUrl}/icon/cancle.png`,
      othersArr: [],
      sexStr: "女",
      ageStr:0,
    },
    methods:{
        // 更多信息点击
        shoutDownClick: function(e) {
            let _this = this;
            this.triggerEvent("close", "弹框关闭")
        }
    },
    
    
    created:function(){
        // 组件生命周期函数，在组件实例化进入页面节点树时执行，注意此时不能调用 setData
        // console.log(app.globalData.phoneInfo)
    },
    attached:function(){
      // 组件生命周期函数，在组件实例进入页面节点树时执行
      let _this = this;
      // console.log(_this.data.information);
      let bearingObject = _this.data.information;
      // 性别
      let strOne = "";
      if (existence(bearingObject.sex)){
        if (bearingObject.sex == 0 || bearingObject.sex == '0'){
          strOne = "男";
        }else{
          strOne = "女";
        }
      }else{
        strOne = "女";
      }
      // 年龄
      let strTwo = 0;
      let numberOne = dataStr(1);
      let numberTwo = bearingObject.age.split("-")[0];
      let numberThree = dataStr(2);
      let numberFour = bearingObject.age.split("-")[1];
      if (parseInt(numberFour) >= parseInt(numberThree)){
        strTwo = parseInt(numberOne) - parseInt(numberTwo) - 1;
      }else{
        strTwo = parseInt(numberOne) - parseInt(numberTwo);
      }
      _this.setData({
        mainPicture: bearingObject.fullFacePhoto,
        othersArr: [bearingObject.fullBodyPicture, bearingObject.hairPhoto, bearingObject.profilePhoto],
        sexStr: strOne,
        ageStr: strTwo
      })
    },
    ready:function(){
        // 组件生命周期函数，在组件布局完成后执行
    },
    moved:function(){
        // 组件生命周期函数 ，在组件实例被移动到节点树另一个位置时执行
    },
    detached:function(){
        // 组件生命周期函数，在组件实例被从页面节点树移除时执行
    },

})