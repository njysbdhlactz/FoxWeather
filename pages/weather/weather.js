// weather.js
var bmap = require('../../utils/bmap-wx.min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherdata:[],
    hidden: true,
    inputCity:'',//地区
    citysize:'92',
    aqi:'',//空气质量指数
    quality: '',//空气质量指数类别，有“优、良、轻度污染、中度污染、重度污染、严重污染”6类
    leafpic:'/assets/images/leaf.png',
    sd:'',//空气湿度
    temperature:'',//温度
    wind_power:'',//风力
    temperature_time:'',//更新时间
    cityInfo:'',//区域
    bar:'',//空气污染粒子浓度，使用aqi/500得来的
    color:'#32F43E',
    pm2_5: '',//pm2.51小时平均
    pm10: '',//pm101小时平均
    so2: '',//二氧化硫1小时平均
    no2:'',//二氧化氮1小时平均
    o3:'',//臭氧1小时平均
    co:'',//一氧化碳1小时平均
    day2:'',//今天+1
    day3: '', //今天+2
    day4: '',//今天+3
    day5: '',//今天+4
    day6: '',//今天+5
    day1_quality: '',//今天空气质量
    day2_quality: '',//今天+1空气质量
    day3_quality: '',//今天+2空气质量
    day4_quality: '',//今天+3空气质量
    day5_quality: '',//今天+4空气质量
    day6_quality: '',//今天+5空气质量
    day2_night_air_temperature:'',//明天温度最低
    day2_day_air_temperature:'',//明天温度最高
    day2_day_weather:'',//明天天气
    day2_night_weather:'',
    day2_night_weather_pic:'http://app1.showapi.com/weather/icon/night/07.png',//明天晚上图标
    day2_day_weather_pic:'http://app1.showapi.com/weather/icon/day/07.png',//明天白天图标
    day3_night_air_temperature: '',
    day3_day_air_temperature: '',
    day3_day_weather: '',//后天天气
    day3_night_weather: '',
    day3_night_weather_pic: 'http://app1.showapi.com/weather/icon/night/07.png',
    day3_day_weather_pic: 'http://app1.showapi.com/weather/icon/day/07.png',
    yh:'',//约会
    wash_car:'',//洗车
    clothes:'',//穿衣
    cold:'',//感冒
    sports:'',//运动
    travel:'',//旅行
    uv:'',//紫外线
    beauty:'',//化妆
    dy:'',//钓鱼

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*调用本地api获取一下location*/
    this.loadWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    that.setData({ hidden: false });
    var BMap = new bmap.BMapWX({
      ak: 'wpnLmuXuDZOOoFnGmoAxAtlCs8zgqWLE'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    var success2 = function (data) {
      var weatherData = data.currentWeather[0];
      var inputCity = weatherData.currentCity;
      app.globalData.cityName = inputCity;
      if (inputCity.length > 3) {
        that.setData({ citysize: '75' });
      }
      that.setData({ inputCity: inputCity });
      that.loadWeather();
      that.setData({ hidden: true });
    }
    BMap.weather({
      fail: fail,
      success: success2
    }); 
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.setData({ hidden: false });
    app.getUserInfo();
    var cityName = app.globalData.cityName;
    
    
    if (cityName.length>3)
    {
      that.setData({ citysize: '75' });
    }
    that.setData({ inputCity: cityName });
    that.loadWeather();
    that.setData({ hidden: true });
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
  city:function(e)
  {
    wx.navigateTo({
      url: '../switchcity/switchcity?city=' + this.data.inputCity,
    })
  },
  map: function (e) {
    wx.navigateTo({
      url: '../regeocoding/regeocoding',
    })
  },
  /***
   * 数据格式化
   */
  processSubject: function (subject)
  {
    var weatherdata = subject.showapi_res_body;
    var that = this;
    that.setData({ aqi: weatherdata.now.aqi});
    that.setData({ quality: weatherdata.now.aqiDetail.quality  });
    that.setData({ sd: weatherdata.now.sd });
    that.setData({ temperature: weatherdata.now.temperature });
    that.setData({ wind_power: weatherdata.now.wind_power});
    that.setData({ temperature_time: weatherdata.now.temperature_time });
    that.setData({ cityInfo: weatherdata.cityInfo.c7});
    var aqi = weatherdata.now.aqi;
    if (aqi <=50) {
      that.setData({ color: '#32F43E' });
    }
    else if (aqi <= 100) {
      that.setData({ color: '#E4F33E' });
    }
    else if ( aqi <= 150) {
      that.setData({ color: '#E4993C' });
    }
    else if (aqi <= 200) {
      that.setData({ color: '#F60003' });
    }
    else if (aqi <= 300) {
      that.setData({ color: '#9F034C' });
    }
    else
    {
      that.setData({ color: '#800025' });
    }

    var num1 = (aqi/500)*100;
    var bar = Math.round(num1);
    that.setData({ bar: bar });
    that.setData({ pm2_5: weatherdata.now.aqiDetail.pm2_5 });
    that.setData({ pm10: weatherdata.now.aqiDetail.pm10 });
    that.setData({ so2: weatherdata.now.aqiDetail.so2 });
    that.setData({ no2: weatherdata.now.aqiDetail.no2 });
    that.setData({ o3: weatherdata.now.aqiDetail.o3 }); 
    that.setData({ co: weatherdata.now.aqiDetail.co });
    that.setData({ day2: that.weekday(weatherdata.f2.weekday)});
    that.setData({ day3: that.weekday(weatherdata.f3.weekday)});
    that.setData({ day4: that.weekday(weatherdata.f4.weekday)});
    that.setData({ day5: that.weekday(weatherdata.f5.weekday)});
    that.setData({ day6: that.weekday(weatherdata.f6.weekday)});
    that.setData({ day1_quality: weatherdata.f1.index.aqi.title });
    that.setData({ day2_quality: weatherdata.f2.index.aqi.title});
    that.setData({ day3_quality: weatherdata.f3.index.aqi.title });
    that.setData({ day4_quality: weatherdata.f4.index.aqi.title });
    that.setData({ day5_quality: weatherdata.f5.index.aqi.title });
    that.setData({ day6_quality: weatherdata.f6.index.aqi.title });
 
    that.setData({ day2_night_air_temperature: weatherdata.f2.night_air_temperature });
    that.setData({ day2_day_air_temperature: weatherdata.f2.day_air_temperature});
    that.setData({ day2_day_weather: weatherdata.f2.day_weather });
    that.setData({ day2_night_weather: weatherdata.f2.night_weather });
    that.setData({ day2_night_weather_pic: weatherdata.f2.night_weather_pic });
    that.setData({ day2_day_weather_pic: weatherdata.f2.day_weather_pic  });

    that.setData({ day3_night_air_temperature: weatherdata.f3.night_air_temperature });
    that.setData({ day3_day_air_temperature: weatherdata.f3.day_air_temperature });
    that.setData({ day3_day_weather: weatherdata.f3.day_weather });
    that.setData({ day3_night_weather: weatherdata.f3.night_weather });
    that.setData({ day3_night_weather_pic: weatherdata.f3.night_weather_pic });
    that.setData({ day3_day_weather_pic: weatherdata.f3.day_weather_pic });

    that.setData({ yh: weatherdata.f1.index.yh.title});
    that.setData({ wash_car: weatherdata.f1.index.wash_car.title });
    that.setData({ clothes: weatherdata.f1.index.clothes.title });
    that.setData({ cold: weatherdata.f1.index.cold.title });
    that.setData({ sports: weatherdata.f1.index.sports.title});
    that.setData({ travel: weatherdata.f1.index.travel.title });
    that.setData({ uv: weatherdata.f1.index.uv.title});
    that.setData({ beauty: weatherdata.f1.index.beauty.title });
    that.setData({ dy: weatherdata.f1.index.dy.title});
    //console.log(subject);
  },
  /***
   * 星期几格式转化
   * 
   */
  weekday:function(num)
  {
    var str="";
    switch(num)
    {
      case 1: str = "周一"; break;
      case 2: str = "周二"; break;
      case 3: str = "周三"; break;
      case 4: str = "周四"; break;
      case 5: str = "周五"; break;
      case 6: str = "周六"; break;
      case 7: str = "周日"; break;
    }
    return str;

  },
  /**
   * 请求数据
   */
  loadWeather:function()
  {
    this.setData({ hidden: false });
    if (this.data.inputCity == "")
    {
      this.setData({ hidden: true });
      return;
    }

    var that = this;
    //*****测试部分 开始 */
    // var fileData = require('../../utils/weatherTest.js');
    // that.processSubject(fileData.mtData().list[0]);
    // that.setData({ hidden: true });
    //*****测试部分 结束*/
    //真数据开始
    var appCode = "ef9cc282f2e64d4fa519a705cf196e88";
    wx.request({
      url: 'https://ali-weather.showapi.com/area-to-weather?'
      + 'area=' + that.data.inputCity
      +'&need3HourForcast=0&needAlarm=0&needHourData=0&needIndex=1&needMoreDay=1',
      header:{
        "Content-Type": "application/json; charset=utf-8", "Authorization": "APPCODE "+appCode
      },
      success: function (res) {
        console.log(res.data);
        that.processSubject(res.data);
        that.setData({ hidden: true });
      }
    })


  }
})