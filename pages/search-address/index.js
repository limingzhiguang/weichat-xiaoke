// pages/newclient.js
const API = require('../../utils/API.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    province: [],
    year: '江苏省',
    city: [],
    month: '徐州市',
    area: [],
    day: 2,
    value: [0, 0, 0],
    selectVal:[0,0,0]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  bindChange: function (e) {
    const provinceVal = e.detail.value[0]-1;
    const cityVal = e.detail.value[1]-1;
    let provinceCode = '';
    let cityCode = '';
    if (e.detail.value[0]>0){
      provinceCode=this.data.province[provinceVal].code
    }
    if (e.detail.value[0]===0){
      this.setData({
        city: [],
        area: []
      });
    }
    if (e.detail.value[1]===0){
      this.setData({
        area: []
      })
    }
    //触发市选择
    //console.log(this.data.province[provinceVal], '选择地址', provinceVal);
    if (!provinceCode){
       return;
    }
    API.getCityLists(provinceCode).then((res) => {
      this.setData({
        city: res.data.data
      });
      if (e.detail.value[1] > 0) {
        cityCode = this.data.city[cityVal].code;

        API.getAreaLists(cityCode).then((res) => {
          this.setData({
            area: res.data.data
          })
        });
      }
    });
   // console.log(e.detail.value, this.data.value);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    API.getProvinceLists().then((res) => {
      //console.log(res.data, '地址')
      this.setData({
        province:res.data.data
      });
    });
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

  }

})