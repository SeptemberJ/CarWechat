//index.js
//获取应用实例
//import h from "../../utils/url"
var h = require("../../utils/url")
var app = getApp()
var phone;
var recommender;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    loadingHidden: true
  },
  //事件处理函数

  onLoad: function () {


  },
  onShow: function () {

    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
      //get
      app.globalData.userInfo = userInfo;
      console.log(app.globalData.userInfo)
      var that2 = that

      
      //  var url= encodeURI( h.main + '/baoxiaodan/page/paiGongDan.html?fjsy=庄俞AAL548')
      //var url = encodeURI(h.main + '/baoxiaodan/page/paiGongDan.html?fjsy=' + that.data.userInfo.nickName)

      // wx.request({
      //   url: url,
      //   data: {},
      //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      //   // header: {}, // 设置请求的 header
      //   success: function (res) {
      //     // success
      //     console.log(res.data);
      //     var data = res.data;
      //     if (!isNaN(data.mingchen)) {
      //       data.mingchen = "请先联系管理员绑定司机账号"
      //     }
      //     app.globalData.userInfo = data.mingchen;
      //     app.globalData.car = data.carNumber;
      //     app.globalData.seatnumber = data.seatnumber;
      //     that2.setData({
      //       data: data,
      //       loadingHidden: true
      //     })

      //   },
      //   fail: function () {


      //   },
      //   complete: function () {

      //   }
      // })

      wx.login({
        success: function (a) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              app.globalData.userInfo = res.userInfo
              //
              app.globalData.head_img = res.userInfo.avatarUrl
              app.globalData.realname = res.userInfo.nickName
              app.globalData.code = a.code
              console.log(app.globalData)
              var url = encodeURI(h.main + '/baoxiaodan/page/getOpen_id.html?code=' + a.code)
              console.log(url)
              wx.request({
                url: url,
                data: {},
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                // header: {}, // 设置请求的 header
                success: function (res) {
                  // succss
                  console.log(res.data.openid);
                  if(res.data.openid){
                    that.setData({
                      openid: res.data.openid

                    });

                    app.globalData.openid = res.data.openid

                    // var data = res.data;
                    // if (!isNaN(data.mingchen)) {
                    //   data.mingchen = "请先联系管理员绑定司机账号"
                    // }
                    // app.globalData.userInfo = data.mingchen;
                    // app.globalData.car = data.carNumber;
                    // app.globalData.seatnumber = data.seatnumber;
                    // that2.setData({
                    //   data: data,
                    //   loadingHidden: true
                    // })

                    var url2 = encodeURI(h.main + '/baoxiaodan/page/searchOpen_idCount.html?open_id=' + res.data.openid)
                    wx.request({
                      url: url2,
                      method: 'GET',
                      success: function (res) {
                        console.log("+++++++++++++++++")
                        console.log(res.data)
                        if (res.data == 1) {
                          console.log('返回1---')
                          app.globalData.ifSignIn = true
                          wx.showToast({
                            title: '',
                            icon: '返回1',
                            duration: 5000
                          })

                          var url5 = encodeURI(h.main + '/baoxiaodan/page/paiGongDan.html?fjsy=' + that.data.openid)
                          console.log(url5)
                          wx.request({
                            url: url5,
                            data: {},
                            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                            // header: {}, // 设置请求的 header
                            success: function (res) {
                              // success
                              console.log("}]]]]]]]]]]]]]]]]]]]]]]]")
                              console.log(res.data);
                              var data = res.data;
                              if (!isNaN(data.mingchen)) {
                                data.mingchen = "请先联系管理员绑定司机账号"
                              }
                              app.globalData.userInfo = data.mingchen;
                              app.globalData.car = data.carNumber;
                              app.globalData.seatnumber = data.seatnumber;
                              that2.setData({
                                data: data,
                                loadingHidden: true
                              })

                            },
                            fail: function () {


                            },
                            complete: function () {

                            }
                          })


                        } else {
                          app.globalData.ifSignIn = false
                          // var currentStatu = e.currentTarget.dataset.statu;
                          // if (currentStatu == "open") {
                          //   console.log(e.currentTarget.dataset.name)
                          //   recommender = e.currentTarget.dataset.name
                          // }
                          recommender = "open"
                          that.setData({
                            loadingHidden: true
                          });
                          that.util(recommender)
                          wx.showToast({
                            title: '',
                            icon: 'searchOpen_idCount返回非1',
                            duration: 2000
                          })


                        }

                      }
                    })

                  }else{
                    wx.showToast({
                      title: 'getOpen_id失败',
                      icon: '',
                      duration: 5000
                    })
                    that.setData({
                      loadingHidden: true
                    });
                  }
                  

                },
                fail: function () {
                  wx.showToast({
                    title: 'getOpen_id链接失败',
                    icon: '',
                    duration: 2000
                  })
                  that.setData({
                    loadingHidden: true
                  });
                },
                complete: function () {
                  that.setData({
                    loadingHidden: true
                  });

                }
              })
            }
          })
        }
      })


    })



  },
  tap: function (e) {
    console.log(e);
    var that = this;
    wx.navigateTo({
      url: '/pages/xiangqing/xq?data=' + JSON.stringify(that.data.data.listPaiGongDan[e.currentTarget.id]) + "&dan=" + JSON.stringify(that.data.data.listFzzl) + "&yj=" + that.data.data.listJczl[0].fyoujia + "&fjsdj=" + that.data.data.listJczl[0].fjsdj,
      success: function (res) {


      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  powerDrawer: function (e) {
    console.log(e)




    var currentStatu = e.currentTarget.dataset.statu;
    if (currentStatu == "open") {
      console.log(e.currentTarget.dataset.name)
      recommender = e.currentTarget.dataset.name
    }
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    console.log(currentStatu)
    console.log(recommender)
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200,  //动画时长  
      timingFunction: "linear", //线性  
      delay: 0  //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        console.log("关闭")
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      console.log("显示")
      this.setData(
        {
          showModalStatus: true
        }
      );
    }

    if (currentStatu == "close") {
      this.setData({
        loadingHidden: false
      })
      var that = this
      console.log(recommender)
      var url3 = encodeURI(h.main + '/baoxiaodan/page/searchFtelCount.html?ftel=' + phone)

      wx.request({
        url: url3,

        data: {

        },

        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          console.log("******************************&&&&&&&&&&&&&&");
          console.log(res.data);


          if (res.data == 1) {
            var url4 = encodeURI(h.main + '/baoxiaodan/page/updateOpen_idBytel.html?ftel=' + phone + '&open_id=' + that.data.openid)

            wx.request({
              url: url4,
              method: 'GET',
              success: function (res) {
                console.log("%%%%%%%%%%%%%%%%%%%%")

                console.log(res)
                //获取报销单
                that.setData({
                  loadingHidden: true,


                })

              }
            })
          } else {
            that.setData({
              loadingHidden: true,


            })
            wx.showToast({
              title: '你的手机号存在多个，或者之前已经被授权过',
            })
            setTimeout(function (res) {
              recommender = "open"
              that.setData({
                loadingHidden: true
              });
              that.util(recommender)
            }, 1000)
            recommender = "open"
            that.setData({
              loadingHidden: true
            });
            that.util(recommender)
          }
        },
        fail: function (res) {
          console.log("---------------------------");

        },
        complete: function (res) {


        }
      })
    }
  },
  aaa: function (res) {
    console.log(res.detail.value)
    phone = res.detail.value
  }
})
