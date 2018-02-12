import h from "../../utils/url"
var app = getApp()
Page({
  data: {
    loadingHidden: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options.data)
    this.setData({
      chehao: options.data
    })
    console.log(app.globalData.car)
    var that = this;
     var url = encodeURI(h.main + '/baoxiaodan/page/listOil.html?carNumber=' + app.globalData.car)
    // var url = encodeURI(h.main + '/baoxiaodan/page/listOil.html?carNumber=桂B29068（55）')
    
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          loadingHidden: true,
          che: res.data.listOil
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  tap: function (e) {
    console.log(e.currentTarget.id);
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var that = this;
    prevPage.setData({
      fid: that.data.che[e.currentTarget.id].fid_z,
      cheduijiayou: that.data.che[e.currentTarget.id].fmoney,
      FsjjyQty: that.data.che[e.currentTarget.id].fqty
    })
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }


})