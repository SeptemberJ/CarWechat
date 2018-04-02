import h from "../../utils/url"
var app = getApp()
Page({
  data: {
    loadingHidden: false,
    ChooseList:[]
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
  checkboxChange: function (e) {
    let temp = []
    e.detail.value.map((item,idx)=>{
      this.data.che.map((cheItme,cheIdx)=>{
        if (item == cheItme.fid_z){
          temp.push(cheItme)
        }
      })
    })
    this.setData({
      ChooseList: temp
    })
    console.log(e.detail.value)
    console.log(temp)
  },
  // tap: function (e) {
  //   console.log(e.currentTarget.id);
  //   var pages = getCurrentPages();
  //   var prevPage = pages[pages.length - 2];
  //   var that = this;
  //   prevPage.setData({
  //     fid: that.data.che[e.currentTarget.id].fid_z,
  //     oilCardId: that.data.che[e.currentTarget.id].fid_z,
  //     cheduijiayou: that.data.che[e.currentTarget.id].fmoney,
  //     FsjjyQty: that.data.che[e.currentTarget.id].fqty
  //   })
  //   console.log(that.data.che[e.currentTarget.id].fid_z)
  // },
  SureBack: function () {
    var sum_oilCardId = ''
    var sum_cheduijiayou = 0
    var sum_FsjjyQty = 0

    this.data.ChooseList.map((item ,idx)=>{
      sum_oilCardId += item.fid_z + ',' 
      sum_cheduijiayou += item.fmoney
      sum_FsjjyQty += item.fqty
    })

    console.log(sum_oilCardId)
    console.log(sum_cheduijiayou)
    console.log(sum_FsjjyQty)

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var that = this;
    prevPage.setData({
      fid: sum_oilCardId,
      oilCardId: sum_oilCardId,
      cheduijiayou: sum_cheduijiayou.toFixed(2),
      FsjjyQty: sum_FsjjyQty.toFixed(2),
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