import h from "../../utils/url"
var app = getApp();
var x=0;
var name=""
var tel=""
Page({
  data: {
    items: [
      { name: '1', value: '满意', checked: 'true' },
      { name: '2', value: '一般' },
      { name: '3', value: '不满意' },

    ],
    items2: [
      { name: '1', value: '满意', checked: 'true' },
      { name: '2', value: '一般' },
      { name: '3', value: '不满意' },

    ],
    items3: [
      { name: '1', value: '满意', checked: 'true' },
      { name: '2', value: '一般' },
      { name: '3', value: '不满意' },

    ],
    ch: "",
    jsy: "",
    loadingHidden: false
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: h.main + '/baoxiaodan/page/PingJiaFzzl.html',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data);
        var arr = res.data.listFzzl;
        console.log(arr)
        var list = new Array();
        for (var i = 0; i < arr.length; i++) {
          var o = {};
          o.name = arr[i].mingchen;
          o.item = [
            { name: '1', value: '满意', checked: 'true' },
            { name: '2', value: '一般' },
            { name: '3', value: '不满意' },

          ]
          o.pj = "1";
          list.push(o);
        }
        console.log(list)
        that.setData({
          list: list,
          loadingHidden: true
        })

      },
      fail: function () {


      },
      complete: function () {

      }
    })

  },

  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  s: function (e) {
    var that = this;
    wx.scanCode({
      success: function (res) {
        // success
        console.log(res)
        var v = res.result.split("-");
        if(v.length!=2){
           wx.showToast({
        title: '二维码错误',
        duration: 2500
      });
      return;
        }
        that.setData({
          ch: v[0],
          jsy: v[1]
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
  radioChange: function (e) {
    console.log(e)
    var id = e.currentTarget.id;
    this.data.list[id].pj = e.detail.value

  },

  tj: function (e) {
    var that = this;
    that.setData({
      loadingHidden: false
    })
    console.log(i)
    if (x ==1) {
       that.setData({
          loadingHidden: true
        })
      wx.showToast({
        title: '请勿重复评价',
        duration: 1000
      });
      return;
    }
    if (this.data.ch == "") {
       that.setData({
          loadingHidden: true
        })
      wx.showToast({
        title: '请先扫描二维码',
        duration: 1000
      });
      return;
    }
    var o = {}
    var tj = new Array();
    var time = getNowFormatDate();
    console.log(app.globalData.userInfo)
    var list = that.data.list;
    for (var i = 0; i < list.length; i++) {
      var a = {};
      a.ftousuren=name
      a.ftel=tel
      a.Fch = that.data.ch;
      a.Fjsy = that.data.jsy;
      a.Fpingjiaxiangmu = list[i].name;
      a.nickname = app.globalData.userInfo2.nickName;
      a.Fmanyidu = list[i].pj;
      a.Findatetime = time;
      a.oppen_id = "";
      a.head_img = "";
      tj.push(a)
    }
    o.listFzzl = tj
    o.name=app.globalData.userInfo2.nickName;
    console.log(JSON.stringify(o))
    wx.request({
      url: h.main + '/baoxiaodan/page/PingJia.html',
      data: {
        json: JSON.stringify(o),
        nickname:app.globalData.userInfo2.nickName
        //json:"ddd"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        // success
        x=1
        console.log(res)
        that.setData({
          loadingHidden: true
        })
         wx.showToast({
        title: '提交成功',
        duration: 1000
      });
        //

      },
      fail: function () {
        // fail
        console.log(11)
      },
      complete: function () {
        // complete
        console.log(33)
      }
    })

  },
   put1: function (e) {
    name= e.detail.value;
    console.log(this.data.dan);
  },
   put2: function (e) {
    tel = e.detail.value;
    console.log(this.data.dan);
  },


})


function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds()+"."+date.getMilliseconds();
  return currentdate;
}