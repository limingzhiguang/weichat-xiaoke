// pages/dashboard/index.js
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
const permission = require('../../utils/permission.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
      boardDateList:['今日','昨日','本周','本月'],
      boardDateIndex:0,
      flowDateList:['今日','昨日','本周','本月'],
      flowDateIndex:0,
      followModeList:[
        {name:'电话',value:0},
        {name:'微信',value:0},
        {name:'上门',value:0},
        {name:'公司采访',value:0},
        {name:'学君校参访',value:0},
        {name:'邮件',value:0},
        {name:'会议',value:0},
        {name:'其他',value:0}
      ],
      //1-客户关怀;2-课件发送;3-课程邀约;4-客诉处理;5-常规咨询;6-业务开发;7-业务跟进;8-团队培训;9-常规服务;10-落地辅导;11-其他;
      followFormList:[
        {name:'客户关怀',value:0},
        {name:'课件发送',value:0},
        {name:'课程邀约',value:0},
        {name:'客诉处理',value:0},
        {name:'常规咨询',value:0},
        {name:'业务开发',value:0},
        {name:'业务跟进',value:0},
        {name:'团队培训',value:0},
        {name:'常规服务',value:0},
        {name:'落地辅导',value:0},
        {name:'其他',value:0}
       ],
      flowIndex:0 ,
      index2:0,
      reportBulletin:{
        addCustomerNum:0,
        addSaleChangeMoney:0,
        addSaleChangeNum:0,
        currentCustomerNum:0,
        followUpCustomerNum:0,
        followUpNum:0,
      },
      //跟进记录
      orgFrequency:0,
      orgQuantity:0,
      //遗忘提醒
      moreOneMonthNum:0,
      moreOneWeekNum:0,
      moreTwoMonthNum:0,
      moreTwoWeekNum:0,
      neverFollowNum:0,
      //遗忘提醒索引
      forgetRemindIndex:null,
      userId:''
  },

  // 头部跳转
  allCluser:function(){
    if(!permission.menuControl('allCustomerPage')) return;
    wx.redirectTo({
      url: '../allCustomer/index',
    })
  },
  followRecord(){
    if(!permission.menuControl('followupPage')) return;
    wx.navigateTo({
      url: '../followUpRecord/index',
    })
  },
  earningsEstimate(){
    if(!permission.menuControl('performanceForecastPage')) return;
    wx.navigateTo({
      url: '../earningsEstimate/index',
    })
  },
  contacts(){
    if(!permission.menuControl('orgUserPage')) return;
     wx.navigateTo({
      url: '../contactsList/index',
    })
  },
  // 简报看板
  boardDateSelect:function(e){
    this.setData({
      boardDateIndex:Number(e.target.dataset.boardDateIndex),
    });
    this.findUserInfoByPermission();
  },

  // 当前客户数
  toCurrentCustomer(){
    if(!permission.menuControl('allCustomerPage')) return;
    wx.redirectTo({
      url: `../allCustomer/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}&all=1`,
    })
  },

  // 新增客户数
  toAddCustomer(){
    if(!permission.menuControl('allCustomerPage')) return;
    wx.redirectTo({
      url: `../allCustomer/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}`,
    })
  },

  // 跟进客户数
  toFollowCustomer(){
    if(!permission.menuControl('followupPage')) return;
    wx.navigateTo({
      url: `../followUpRecord/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}`,
    })
  },

  // 跟进次数
  toFollowNum(){
    if(!permission.menuControl('followupPage')) return;
    wx.navigateTo({
      url: `../followUpRecord/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}`,
    })
  },
  // 新增业绩预测
  toAddEarningsEstimate(){
    if(!permission.menuControl('performanceForecastPage')) return;
    wx.navigateTo({
      url: `../earningsEstimate/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}`,
    })
  },
  // 新增业绩预测金额
  toAddEarningsEstimateMoney(){
    if(!permission.menuControl('performanceForecastPage')) return;
    wx.navigateTo({
      url: `../earningsEstimate/index?type=${this.data.boardDateIndex+1}&userId=${this.data.userId}`,
    })
  },
  // 跟进记录
  flowDateSelect:function(e){
    this.setData({
      flowDateIndex:e.currentTarget.dataset.flowDateIndex
    });
    this.followUpNumStatistics();
  },
  // 跟进记录数量
  followOrgNumber(){
    if(!permission.menuControl('followupPage')) return;
    wx.navigateTo({
      url: `../followUpRecord/index?type=${this.data.flowDateIndex+1}&flow=1`,
    })
  }, 
  // 跟进记录次数
  followOrgCount(){
    if(!permission.menuControl('followupPage')) return;
    wx.navigateTo({
      url: `../followUpRecord/index?type=${this.data.flowDateIndex+1}&flow=1`,
    })
  },
  async findUserInfoByPermission(){
    wx.showLoading({
      title:'努力加载中...'
    })
    
    let userInfor = wx.getStorageSync('useInfo')
    
    this.setData({
      userId:userInfor.userId
    })
    var startEndTime = [];
    startEndTime = util.startDateEndDate(this.data.boardDateIndex+1)
    // console.log(startEndTime) formatMoney
    API.reportBulletin({
      userId: userInfor.userId,
      startDate:startEndTime[0],
      endDate:startEndTime[1]
    }).then((currentRes)=>{
      var resData = currentRes.data.data;
      this.setData({
        reportBulletin:currentRes.data.data
      });
      wx.hideLoading()
    },()=>{
      wx.showToast({
        title: '数据获取失败',
        icon:'none'
      })
    })
  },
  //跟进记录
  followUpNumStatistics(){
    var startEndTime = [];
      startEndTime = util.startDateEndDate(this.data.flowDateIndex+1);
      wx.showLoading({ title: '拼命加载中...' });
    API.followUpNumStatistics({
      startDateTime:startEndTime[0],
      endDateTime:startEndTime[1]
    }).then((res)=>{
      var resData = res.data.data||[];
      var followType = this.data.followModeList;
      var followForm = this.data.followFormList;
      //跟进方式
      followType.forEach((item)=>{
        var cur = 0;
        resData.orgFollowUpLogStatisticsTypeList.forEach((current)=>{          
           switch(current.typeForm){
              case 1:
                followType[0].value = current.quantity
              break;
              case 2:
                followType[1].value = current.quantity
              break;
              case 3:
                followType[2].value = current.quantity
              break;
              case 4:
                followType[3].value = current.quantity
              break;
              case 5:
                followType[4].value = current.quantity
              break;
              case 6:
                followType[5].value = current.quantity
                break;
              case 7:
                followType[6].value = current.quantity
                break;
              case 99:
                followType[7].value = current.quantity  
              break;
             // default:

           }
        });
      });
      
      //跟进形式
      followForm.forEach((item,index)=>{
        resData.orgFollowUpLogStatisticsFormList.forEach((current)=>{
          if(current.typeForm === (index+1)){
            followForm[index].value = current.quantity
          }
        });
      });
      if(resData.orgFollowUpLogStatisticsFormList.length===0){
        followType.forEach((cur)=>{
          cur.value = 0; 
        })
      }
      if(resData.orgFollowUpLogStatisticsFormList.length===0){
        followForm.forEach((cur)=>{
          cur.value = 0; 
        })
      }
      this.setData({
        followModeList:followType,
        followFormList:followForm,
        orgFrequency:resData.orgFrequency||0,
        orgQuantity:resData.orgQuantity||0
      });
       wx.hideLoading();
    })
  },
  findForgetRemindData(){
    API.findForgetRemindData().then((res)=>{
      var resData = res.data.data||{};
      this.setData({
        moreOneMonthNum:resData.moreOneMonthNum||0,
        moreOneWeekNum:resData.moreOneWeekNum||0,
        moreTwoMonthNum:resData.moreTwoMonthNum||0,
        moreTwoWeekNum:resData.moreTwoWeekNum||0,
        neverFollowNum:resData.neverFollowNum||0
      })
    })
  },
  // 遗忘提醒跳转 去全部客户页面
  forgetRemind(e){
    if(!permission.menuControl('allCustomerPage')) return;
    let index = e.currentTarget.dataset.forgetRemindIndex;
    wx.navigateTo({
      url: `../allCustomer/index?forgetRemindIndex=${index}&userId=${this.data.userId}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.findUserInfoByPermission();
     this.followUpNumStatistics();
     this.findForgetRemindData();
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
    wx.hideHomeButton();
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