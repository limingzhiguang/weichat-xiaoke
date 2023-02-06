// custom-tab-bar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:0,
    list: [
      {
        "pagePath": "/pages/home/home",
        "text": "统计排名",
        index:0
      },
      {
        "pagePath": "/pages/newclient/newclient",
        "text": "添加新客户",
        index:1
      },
      {
        "pagePath": "/pages/user/user",
        "text": "我的",
        index:2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
  tab(e){    
    const data = e.currentTarget.dataset;
    const tab = data.index;
    const url = data.path;
    
    wx.switchTab({url})
    // this.setData({tab});
  }
})