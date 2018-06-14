import h from "../../utils/url"
var util = require('../../utils/util.js')
var requestPromisified = util.wxPromisify(wx.request)
var app = getApp();
Page({
  data: {
    DateInfo:'',
    ifSignIn:false

  },
  onLoad(){
    // wx.getUserInfo({
    //   success: (res)=> {
    //     this.setData({
    //       userInfo: res.userInfo
    //     })
    //   }
    // })
   
  },
  onShow(){
    this.setData({
      ifSignIn: app.globalData.ifSignIn,
      head_img: app.globalData.head_img,
      realname: app.globalData.realname
    })
    console.log('签到---')
    console.log(app.globalData.userInfo)
    this.StartClock()
  },
  //签到
  ToSignIn(){
    wx.showLoading({
      title: '加载中',
    })
    requestPromisified({
      url: h.main + '/baoxiaodan/SignIn.html',
      data: {
        openid: app.globalData.openid
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    }).then((res) => {
      switch (res.data.code) {
        case 1:
          wx.hideLoading()
          wx.showToast({
            title: res.data.message + '！',
            icon: 'success',
            duration: 1500
          })
          break
        case 0:
          wx.hideLoading()
          wx.showToast({
            image: '../../images/icons/attention.png',
            title: '已签到过！',
          });
          break
        default:
          wx.showToast({
            image: '../../images/icons/attention.png',
            title: '服务器繁忙！'
          });
      }
    }).catch((res) => {
      wx.hideLoading()
      wx.showToast({
        image: '../../images/icons/attention.png',
        title: '服务器繁忙！'
      });
      console.log(res)
    })
  },

 
  //时钟
  StartClock() {
    let _this = this
    let CurDate = new Date()
    let Week
    switch (CurDate.getDay()) {
      case 0:
        Week = '日'
        break
      case 1:
        Week = '一'
        break
      case 2:
        Week = '二'
        break
      case 3:
        Week = '三'
        break
      case 4:
        Week = '四'
        break
      case 5:
        Week = '五'
        break
      case 6:
        Week = '六'
        break
    }
    let DateInfo = {
      Month: (CurDate.getMonth() + 1) < 10 ? '0' + (CurDate.getMonth() + 1) : CurDate.getMonth() + 1,
      Day: (CurDate.getDate()) < 10 ? '0' + CurDate.getDate() : CurDate.getDate(),
      Week: Week,
      Hour: CurDate.getHours() < 10 ? '0' + CurDate.getHours() : CurDate.getHours(),
      Minute: CurDate.getMinutes() < 10 ? '0' + CurDate.getMinutes() : CurDate.getMinutes(),
      Second: CurDate.getSeconds() < 10 ? '0' + CurDate.getSeconds() : CurDate.getSeconds(),
    }
    this.setData({
      DateInfo: DateInfo
    })
    setTimeout(() => {
      this.StartClock()
    }, 1000)
  },
})



