// components/selectLabel/index.js
Page({
  properties: {
    isShow: {
        type: Boolean,
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    labelList:[],
    labelIndex:null,
    selectLabelIds:[],
    labelDialog:true,
  },
  selectLabel(e){
    this.setData({
      labelDialog:true
    })
  },
  selectCurrentLabel(e){
    var index = Number(e.currentTarget.dataset.labelIndex);
    console.log(e,'index');
    this.data.labelList[index].status = !this.data.labelList[index].status
    this.setData({
      labelIndex:index,
      labelList:this.data.labelList
    })
  },
  closeLabelDialog(){
    this.data.labelList.forEach((item)=>{
      item.status = false
    });
      this.setData({
        labelDialog:false,
        labelList:this.data.labelList
      })
  },
  confirm(){
       var selectIdList = [];
       this.data.labelList.forEach((item)=>{
         if(item.status){
          selectIdList.push(item.labelId);
         }
       });
       this.setData({
        selectLabelIds:selectIdList,
        labelDialog:false
       });
  },
  findOrgLabelList(){
    API.findOrgLabelList().then((res)=>{
      var resData = res.data.data||[];
      resData.forEach((item)=>{
        item.status = false
      });
      console.log(resData)
       this.setData({
        labelList:resData
       })   
    })
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
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {},
    moved: function () { },
    detached: function () { 

    },
  },
})