import h from "../../utils/url"
var app = getApp();
var st = 0;
Page({
  data: {
    chehao: "",
    jiashiyuan: "",
    zuoweishu: "",
    baoxiu: "",
    loadingHidden: true,
    zuoweishu: "",
    fltbh:"",
    st:false

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    this.setData({
      jiashiyuan: app.globalData.userInfo,
      chehao: app.globalData.car,
      zuoweishu: app.globalData.seatnumber
    })
    console.log('驾驶员----')
    console.log(app.globalData.userInfo)

  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏

  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载

  },
  put1: function (e) {

    this.setData({
      jiashiyuan: e.detail.value
    });
  },
  put2: function (e) {
    st = 0
    this.setData({


      chehao: e.detail.value
    });
  },
  put3: function (e) {
    this.setData({
      zuoweishu: e.detail.value
    });
  },
  put4: function (e) {
    this.setData({
      baoxiu: e.detail.value
    });
  },
  put5: function (e) {
    this.setData({
      fltbh: e.detail.value
    });
  },
  tj: function (e) {
    var shuju = {};
    var that = this;
    shuju.chehao = this.data.chehao;
    shuju.jiashiyuan = this.data.jiashiyuan;
    shuju.zuoweishu = this.data.zuoweishu;
    shuju.baoxiu = this.data.baoxiu;
    shuju.fltbh = this.data.fltbh;
    console.log(JSON.stringify(shuju));

    if (this.data.chehao == "") {
      wx.showToast({
        title: '车号不能为空',
        duration: 500
      });
      return;
    }

    if (this.data.jiashiyuan == "") {
      wx.showToast({
        title: '驾驶员不能为空',
        duration: 500
      });
      return;
    }
    if (this.data.zuoweishu == "") {
      wx.showToast({
        title: '座位数不能为空',
        duration: 500
      });
      return;
    }
    if (this.data.baoxiu == "") {
      wx.showToast({
        title: '报修项目不能为空',
        duration: 500
      });
      return;
    }
    if ("请先联系管理员绑定司机账号" == app.globalData.userInfo) {
      wx.showToast({
        title: '请先联系管理员绑定司机账号',
        duration: 1000
      });
      return;
    }
    this.setData({
      loadingHidden: false,
      st: true
    })
    //
    var url = encodeURI(h.main + '/baoxiaodan/page/getSeatnumberByCarNumber.html?carNumber=' + that.data.chehao)
    console.log("------------")
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {

      }, // 设置请求的 header
      success: (res)=> {
        // success
        console.log(res)
        var d = res.data;
        if (d.code == 1) {
          st = 0
          that.setData({
            loadingHidden: true
          })
          wx.showToast({
            title: '车号不存在',
            icon: 'success',
            duration: 2000,
          })
        } else {
          st = 1;
          that.setData({
            zuoweishu: d.seatnumber
          })
          wx.request({
            url: h.main + '/baoxiaodan/page/baoXiu.html',
            data: { json: JSON.stringify(shuju) },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              'content-type': 'application/x-www-form-urlencoded'

            }, // 设置请求的 header
            success: function (res) {
              // success
              console.log(res)
              that.setData({
                // chehao: "",
                // jiashiyuan: "",
                // zuoweishu: "",
                 baoxiu: "",
                 fltbh:"",
                // loadingHidden: true
              })
              wx.showToast({
                title: '提交成功',
                duration: 500
              });
            },
            fail: function (e) {
              console.log(e)
            },
            complete: ()=> {
              // complete
              this.setData({
                loadingHidden: true,
                st: false
              })

            }
          })
        }

      },
      fail: function (e) {
        console.log(e)

      },
      complete: function () {
        // complete

      }
    })



    //
    // if (st == 1) {
    //   wx.request({
    //     url: h.main + '/baoxiaodan/page/baoXiu.html',
    //     data: { json: JSON.stringify(shuju) },
    //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'

    //     }, // 设置请求的 header
    //     success: function (res) {
    //       // success

    //       that.setData({
    //         chehao: "",
    //         jiashiyuan: "",
    //         zuoweishu: "",
    //         baoxiu: "",
    //         loadingHidden: true
    //       })
    //       wx.showToast({
    //         title: '提交成功',
    //         duration: 500
    //       });
    //     },
    //     fail: function (e) {
    //       console.log(e)
    //     },
    //     complete: function () {
    //       // complete
    //       console.log("------------")
    //     }
    //   })
    // }

  }



})