var m1 = 0;
var m2 = 0;
var m3 = 0;
var yf = 0;
var yj = 0;
var haoyou = "";
var youliang = 0;
var before = 0;
var after = 0;
var xianshouchefei = "";
var fjsdj = "";
var fws = 0;
import h from "../../utils/url"
Page({
  data: {
    loadingHidden: true,
    m3: m3,
    ifCanWork:false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    yf = m1 + m2 + m3;
    var data = JSON.parse(options.data);
    var dan = JSON.parse(options.dan);
    console.log('----data')
    console.log(data)
    fws = data.fweishou;
    //
    m1 = 0;
    m2 = 0;
    m3 = 0;
    yf = 0;
    yj = 0;
    haoyou = "";
    youliang = 0;
    before = 0;
    after = 0;
    xianshouchefei = "";
    fjsdj = "";

    //
    yj = options.yj;
    fjsdj = options.fjsdj;
    youliang = yf / yj;
    //console.log(yj);
    for (var i = 0; i < dan.length; i++) {
      dan[i].jine = "0";

    }
    //console.log(dan);

    var t1 = this.gettime(data.fqsrq);
    var t2 = this.gettime(data.fzzrq);

    this.setData({
      data: data,
      dan: dan,
      oilCardId:'',
      t1: t1,
      t2: t2,
      xianjin: 0,
      ka: 0,
      chedui: 0,
      cheduijiayou: 0,
      total: 0,
      FsjjyQty:0
    });

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成

  },
  onShow: function () {
    // 生命周期函数--监听页面显示

  },
  gettime: function (time) {
    var date = new Date(time);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
    var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();;
    return (Y + M + D + h + m + s);
  },
  put1: function (e) {
    //console.log(e);
    var that = this;
    this.data.dan[e.currentTarget.id].jine = e.detail.value;
    switch (this.data.dan[e.currentTarget.id].daima) {
      case "A03":
        // that.setData({
        //   xianjin:parseInt(e.detail.value);
        // });
        m1 = parseInt(e.detail.value);
        yf = 0;
        youliang = 0;
        yf = m1 + m2 + m3;
        youliang = yf / yj;
        break;
      case "A04":
        // that.setData({
        //   ka:parseInt(e.detail.value)
        // });
        m2 = parseInt(e.detail.value);
        yf = 0;
        youliang = 0;
        yf = m1 + m2 + m3;
        youliang = yf / yj;
        break;
      case "A05":
        // that.setData({
        //   chedui:parseInt(e.detail.value)
        // });
        m3 = parseInt(e.detail.value);
        yf = 0;
        youliang = 0;
        yf = m1 + m2 + m3;
        youliang = yf / yj;
        break;
    }
    console.log(yf);
  },
  put2: function (e) {
    this.data.dan[e.currentTarget.id].beizhu = e.detail.value;
    console.log(this.data.dan);
  },
  oilAmountChange: function (e) { 
    this.data.dan[e.currentTarget.id].FsjjyQty = e.detail.value;
    console.log(this.data.dan);
  },
  put3: function (e) {
    before = parseInt(e.detail.value);
  },
  put4: function (e) {
    after = parseInt(e.detail.value);
  },
  tijiao: function (e) {
    
    this.setData({
      ifCanWork: true
    })
    if (m1 == 0 && m2 == 0 && m3 == 0) {
      console.log('1------')

    } else {
      console.log('2------')
      if (before <= 0) {
        wx.showToast({
          title: '出车前公里不能为0',
          duration: 1000,
          ifCanWork: false
        });
        return;
      }
      if (after <= 0) {
        wx.showToast({
          title: '出车后公里不能为0',
          duration: 1000,
          ifCanWork: false
        });
        return;
      }
      if (after <= before) {
        wx.showToast({
          title: '出车后公里小于出车前公里',
          duration: 1000,
          ifCanWork: false
        });
        return;
      }
    }
    if (fws < xianshouchefei) {
      wx.showToast({
        title: '现收车费不能大于未收车费',
        duration: 1000,
        ifCanWork: true
      });
      return;
    }

    var shuju = this.data.data;
    console.log('this.data.data======')
    console.log(this.data.data)
    shuju.dan = this.data.dan;
    shuju.fjyfid_z = this.data.oilCardId;
    var that = this;
    var l = shuju.dan;
    for (var a in l) {
      // l[a].FsjjyQty = 0+""
      if (l[a].daima == "A05") {
        l[a].jine = that.data.cheduijiayou + ""
        l[a].FsjjyQty = that.data.FsjjyQty.toString() || ''
      }else{
        l[a].FsjjyQty = that.data.dan[a].FsjjyQty || ''
      }
    }
    m3 = this.data.cheduijiayou;
    yf = 0;
    yf = (Number(m1) + Number(m1) + Number(m3)).toFixed(2)
    //yf = m1 + m2 + m3;
    youliang = yf / yj;
    shuju.youliang = youliang;
    haoyou = youliang / (after - before) * 100;
    console.log(yf + "***************")
    console.log(yj + "***************")
     haoyou.toFixed(2);
    this.setData({
      loadingHidden: false
    })
    console.log("qqqqqqqqqqqqqqqqqqqqq");
    console.log(haoyou);

    if (isNaN(haoyou)) {
      console.log("++++++++++++");
      haoyou = ""
    }
    console.log('this.data---')
    console.log(this.data)
    shuju.haoyou = haoyou + "";
    shuju.youfei = yf + "";
    shuju.youjia = yj + "";
    shuju.fjsdj = "";
    shuju.xianshouchefei = xianshouchefei + "";
    shuju.fqsrq = this.data.t1 + "";
    shuju.fzzrq = this.data.t2 + "";
    shuju.fccqgl = before + "";
    shuju.fcchgl = after + "";
    //yingshou
    if (this.data.data.fsklx=='免费'){
      shuju.fyingshou =0
      this.data.data.fweishou = 0
    }else{
      shuju.fyingshou = this.data.data.fweishou
      if (xianshouchefei == '' || xianshouchefei == 0) {
        this.data.data.fweishou = shuju.fyingshou
      } else {
        this.data.data.fweishou = shuju.fyingshou - xianshouchefei
      }

      // if (xianshouchefei == '' || xianshouchefei==0){
      //   shuju.fyingshou = this.data.data.fweishou
      // }else{
      //   shuju.fyingshou = Number(this.data.data.fweishou) - Number(xianshouchefei)
      //   }

    }

    


    console.log('提交的shuju------')
    console.log(shuju)
    //var oilCardId = this.data.fid
    var that = this;
    wx.request({
      url: h.main + '/baoxiaodan/page/baoXiaoDan.html',
      data: {
        json: JSON.stringify(shuju)
        //json:"ddd"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log('baoXiaoDan-----')
        console.log(res)
        if (res.data==3){
          wx.showModal({
            title: '提示',
            content: '派工单重复，请联系管理员，删除多余的派工单',
            showCancel: false,
            success: (res)=> {
              if (res.confirm) {
                that.setData({
                  loadingHidden: true
                })
              }
            }
          })
          return false

        }else{
          console.log('更新加油卡---')
          console.log(that.data)
          wx.request({
            url: h.main + '/baoxiaodan/page/upIsuse.html?',
            data: {
              fid_z: that.data.oilCardId ? that.data.oilCardId:'' //fid
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              // success
              console.log('upIsuse-----')
              console.log(res)
              that.setData({
                loadingHidden: true
              })
              wx.showToast({
                title: '保存成功',
                duration: 500
              });
              // 等待半秒，toast消失后返回上一页
              setTimeout(function () {
                wx.navigateBack();
              }, 500);
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })

        }

      },
      fail: function () {
        // fail
        console.log(11)
      },
      complete:  ()=> {
        // complete
        this.setData({
          ifCanWork: false
        })
        console.log(33)
      }
    })
    console.log(shuju);
  },
  put5: function (e) {
    xianshouchefei = parseInt(e.detail.value);
  },
  chedui: function (e) {
    console.log(this.data.data)
    wx.navigateTo({
      url: '/pages/chedui/chedui?data=' + this.data.data.fch,
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