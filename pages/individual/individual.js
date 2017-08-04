// individual.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    katong:'',
    pics:'/assets/images/remark1.png',
    runnum:0,
    smognum:0,
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
    var num = Math.floor(Math.random() * (80 - 30 + 1) + 30);
    var that = this;
    that.setData({ runnum: num });
    num = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    that.setData({ smognum: num });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    var sex = app.globalData.userInfo.gender;
    var katong = "http://www.foxweather.cn/ZXCimages/" + sex+".png";
    that.setData({ katong: katong });
    
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
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },
  remark:function(){
    var num=Math.ceil(Math.random()*4);
    var that=this;
    var str ="/assets/images/remark"+num+".png";
    that.setData({ pics: str });
  }
})