import h from "../../utils/url"
var app = getApp();
var no = "";
Page({
  data: {
    obj: null,
    p: null
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    no = options.no;
    var p = options.path
    p = "https://www.lzyyy.com/baoxiaodan/img/" + p
    this.setData({
      p: p
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  tap: function (e) {
    var that = this;
    that.setData({

      loadingHidden: false
    });
    // 生命周期函数--监听页面加载
    console.log(app.globalData)
    //var url = encodeURI(h.main + '/users/orderpolling.html?petname=' + app.globalData.userInfo2.nickName)
    var url = encodeURI(h.main + '/baoxiaodan/users/print.html?fbillno=' + no)
    console.log(url)
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success

        that.setData({
          obj: res.data,
          loadingHidden: true
        });
        wx.showToast({
          title: '提交成功',
          duration: 1000
        });


      },
      fail: function () {


      },
      complete: function () {

      }
    })
  }
})