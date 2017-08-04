// tipoff.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tiplocation: '请选择',
    items: [
      { name: '烟尘，粉尘', value: '烟尘，粉尘', 'checked': false},
      { name: '工地扬尘', value: '工地扬尘', 'checked': false},
      { name: '恶臭异味', value: '恶臭异味', 'checked': false},
      { name: '油烟', value: '油烟', 'checked': false},
      { name: '机动车尾气', value: '机动车尾气', 'checked': false},
      { name: '浓烟', value: '浓烟', 'checked': false},
    ],
    pics: [],
    description:'',
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
    var that = this;

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
  getmap: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({ tiplocation: res.name });
      },
    })
  },
  //用来显示一个选择图片和拍照的弹窗，用到了微信的一个页面交互的api showActionSheet　
  chooseImageTap: function () {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        that.setData({
          pics: imgsrc
        });
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  submit: function () {
    var that = this;
    that.setData({ tiplocation: "请选择" });
    that.setData({ pics: {} });
    that.setData({ description: "" });
    var items =[
      { name: '烟尘，粉尘', value: '烟尘，粉尘', 'checked': false},
      { name: '工地扬尘', value: '工地扬尘', 'checked': false},
      { name: '恶臭异味', value: '恶臭异味', 'checked': false},
      { name: '油烟', value: '油烟', 'checked': false},
      { name: '机动车尾气', value: '机动车尾气', 'checked': false},
      { name: '浓烟', value: '浓烟', 'checked': false},
    ];
    that.setData({ items: items });
    wx.showToast({
      title: '提交成功，谢谢您的合作！',
      icon: 'success',
      duration: 2000
    })
  }
})