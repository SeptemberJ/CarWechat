import h from "../../utils/url"
var app = getApp();

Page({
    data: {

    },
    onLoad: function (options) {
       

    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成

    },
    onShow: function () {
       var that=this;
        // 生命周期函数--监听页面加载
        console.log(app.globalData)
        var url = encodeURI(h.main + '/baoxiaodan/users/orderpolling.html?petname=' + app.globalData.openid)
        // var url = encodeURI(h.main + '/baoxiaodan/users/orderpolling.html?petname=庄俞AAL548')
        console.log(url)
        wx.request({
            url: url,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
                // success
                console.log(res.data);
              that.setData({
                obj:res.data,
                loadingHidden:true
              });

                
                
            },
            fail: function () {


            },
            complete: function () {

            }
        })

    }

})