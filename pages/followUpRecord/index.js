// pages/followUpRecord/index.js  
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topIndex:0,
    topStatus:false,
    followMode:['电话','微信','上门拜访','公司参访','学君校参访','邮件','会议','其他'],
    followForm:['客户关怀','课件发送','课程邀约','客诉处理','常规咨询','业务开发','业务跟进','团队培训','常规服务','落地辅导','其他'],
    searchStatus:false,
    userId:'',
    staffList:[{id:112342134,name:'张三'},{id:2222223,name:'张三1111'}],
    currentStaff:'',
    creatDate: '',
    customDate: '',
    staffIndex:null,
    creatTimeIndex:null,
    remindTimeIndex:null,
    flollwIndex:null,
    formIndex:null,
    iconType: [
      'iconluyin', 'iconluyin', 'icon-bianji1', 'icon-bianji1', 'icon-bianji1', 'icon-bianji1', 'icon-bianji1', 'icon-bianji1', 'icon-bianji1'
    ],
    hasMore:true,
    followList:[],
    //全部
    allSelect:1,
    allSelectList:['全部','我创建的','@我的'],
    //排序
    sortSelect:null,
    //排序、录入时间正序、录入时间倒序、最后一次跟新时间正序、最后一次跟新时间倒序、离我最近距离
    sortSelectList:['录入时间正序','录入时间倒序','最后一次跟新时间正序','最后一次跟新时间倒序'],
    orgName:'',
    timeTypeIndex:0,
    timeType:['提醒时间','创建时间'],
    labelList:[],
    labelIndex:null,
    selectLabelIds:[],
    labelDialog:false,
    pageIndex:1,
    pageSize:30,
    fileUrl:'',
    isEdit:false,
    rowContent:'',
    orgId:'',
    isEditing:false
  },
  showMask(){
    this.setData({
      isEditing:true
    })
  },
  hideMask(){
    this.setData({
      isEditing:false
    })
  },
  topSwitch(e){
    var topIndex = e.currentTarget.dataset.topIndex;
    // console.log(topIndex,typeof topIndex)    
    if(topIndex==='3'){
      this.setData({
        searchStatus:true
      });
    }
    this.setData({
      topStatus:!(topIndex === this.data.topIndex  && this.data.topStatus),
      topIndex:topIndex
    });
    if(topIndex==='0'){
      this.setData({
        creatDate: '',
        customDate:'',
        staffIndex:null,
        creatTimeIndex:null,
        remindTimeIndex:null,
        flollwIndex:null,
        formIndex:null,
        labelIndex:null,
        selectLabelIds:[],
        labelList:[],
        userId:'',
        currentStaff:'',
        selectLabelIds:[],
        orgName:'',
  
      });
    }else if(topIndex==='1'){
      this.setData({
        //allSelect:0,
        orgName:''
  
      });
    }else if(topIndex==='3'){
      this.setData({
        creatDate: '',
        customDate:'',
        staffIndex:null,
        creatTimeIndex:null,
        remindTimeIndex:null,
        flollwIndex:null,
        formIndex:null,
        labelIndex:null,
        selectLabelIds:[],
        labelList:[],
        userId:'',
        currentStaff:'',
        selectLabelIds:[],
  
        //allSelect:0
  
      });
    }
    // 切换要不要清除呢
    // this.reset();
    // wx.showLoading({
    //   title: '加载中',
    // })
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  }, 
  allSelect(e){
    var index = Number(e.currentTarget.dataset.allSelect);
    this.setData({
      allSelect:index,
      followList:[],
      pageIndex:1,
    });
    this.toFilter();
    this.closeTopFloat();
   // console.log('全部的当前选择', index)
  },
  sortSelect(e){
    var index = e.currentTarget.dataset.sortSelect;
    this.setData({
      sortSelect:index
    })
  },
  closeTopFloat(){
    this.setData({
      topStatus:false,
      searchStatus:false
    })
  },
  cancerSearch(){
    this.setData({
      topStatus:false,
      searchStatus:false
    });
    //console.log('1111',this.data.searchStatus);
  },
  bindPickertimeType(e){
    var index = Number(e.detail.value);
    this.setData({
      timeTypeIndex:index
    })  
  },
  bindPickerChange: function(e) {
    var index = Number(e.detail.value);
     this.setData({
      userId: this.data.staffList[index].userId,
      currentStaff:this.data.staffList[index].enNamecnName, 
      staffIndex:0
     })
  },
  bindDateChange: function(e) {
    this.setData({
      creatDate:e.detail.value,
      creatTimeIndex:0,
    });
  },
  customBindDateChange(e){
    this.setData({
      customDate:e.detail.value,
      remindTimeIndex:0,
    });
  },
  followMode(e){
    var index = e.currentTarget.dataset.flollwIndex;
    this.setData({
      flollwIndex:index
    });
  },
  followForm(e){
    var index = e.currentTarget.dataset.formIndex;
    this.setData({
      formIndex:index
    });
   // console.log('跟进形式', index)
  },
  selectLabel(e){
    this.setData({
      labelDialog:true
    })
  },
  selectCurrentLabel(e){
    var index = Number(e.currentTarget.dataset.labelIndex);
    //console.log(e,'index');
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
  getOrgName(e){
    this.setData({
      orgName:e.detail.value
    })
   // console.log(e.detail.value,'orgName');
  },
  reset(){
    this.data.labelList.forEach((item)=>{
      item.status = false
    });
    this.setData({
      creatDate: '',
      customDate:'',
      staffIndex:null,
      creatTimeIndex:null,
      remindTimeIndex:null,
      flollwIndex:null,
      formIndex:null,
      labelIndex:null,
      selectLabelIds:[],
      labelList:this.data.labelList,
      userId:'',
      currentStaff:'',
      selectLabelIds:[],
      screening:1,
      // allSelect:0,//
      orgName:'',//

    });
    
  },
  sure(){
    this.setData({
      followList:[],
      pageIndex:1,
    })
    this.toFilter();
    this.closeTopFloat();
  },
  toSearch(){
    this.setData({
      followList:[],
      pageIndex:1,
    })
    this.toFilter();
    this.closeTopFloat();
  },
  clearSearchInput(e){
   // console.log(e)
    this.setData({
      orgName:''
    })
  },
  
  rowEdit(e){
    this.setData({
      rowContent:e.currentTarget.dataset.rowContent,
      orgId:e.currentTarget.dataset.orgId,
      isEdit:true
    })
    // console.log(e)
  },
  // 编辑取消
  editCancer(){
    this.setData({
      isEdit:false
    })
  },

  getTextareaContent(e){
    this.setData({
      rowContent:e.detail.value
    }) 
  },
  // 编辑确认
  editConfirm(){
    this.setData({
      isEdit:false
    })
  
   API.updateFollowContent({
      content:this.data.rowContent,
      orgId:this.data.orgId
    }).then(()=>{
      this.setData({
        followList:[],
        pageIndex:1,
      })
      this.toFilter();
    })
    
  },
  updateList(e){
    this.setData({
      followList:[],
      pageIndex:1,
    })
    this.toFilter();
  },
  writeFollow(){
    wx.navigateTo({
      url:'../writeFollow/index?isFollowPage=1'
    })
  },
  loadMore() {
    if (!this.data.hasMore) return;
    wx.showLoading({ title: '拼命加载中...' });
    API.followUp({
      screening:this.data.allSelect+1,
      userId:this.data.userId,
      dateTimeType:this.data.timeTypeIndex+1,
      startDateTime:this.data.creatDate,
      endDateTime:this.data.customDate,
      type:this.data.flollwIndex == 7?9:(this.data.flollwIndex!==null?Number(this.data.flollwIndex+1):''),
      form:this.data.formIndex!==null?Number(this.data.formIndex+1):'',
      labelIdList:this.data.selectLabelIds,// ?
      orgName:this.data.orgName,
      pageIndex:this.data.pageIndex++,
      pageSize:this.data.pageSize
    }).then((res)=>{
      var resData = res.data.data||[];
     // console.log(resData,res.data.totalRecords);
     if(this.data.followList.length===res.data.totalRecords){
       this.setData({
        hasMore:false
       })
       wx.hideLoading();
       return;
     }
     this.setData({ followList: this.data.followList.concat(resData)});
     wx.hideLoading();
    });
  },
  toFilter(){
    this.setData({
      hasMore:true
    })
    this.loadMore();
  },
  findAllList(options){
    API.findCounselorList().then((res)=>{
      var resDate = res.data.data||[];
      resDate.forEach((item)=>{
        item.enNamecnName = item.userNameEn+''+item.userNameCn
      });
      // 简报看板 同步执行
     // console.log(options,'options')
      if(options.type){
        let currentName = '';
        resDate.forEach((item)=>{
          if(item.userId===options.userId){
            currentName = item.enNamecnName
          }
        })
        if(options.flow){
          this.setData({
            allSelect:0
          })  
       }
        this.setData({
          dateTimeType:2,
          creatTimeIndex:0,
          remindTimeIndex:0,
          staffIndex:null,
          timeTypeIndex:1,
          topIndex:'1',
          userId:options.userId?options.userId:'',
          currentStaff:currentName,
          creatDate:util.startDateEndDate(options.type)[0],
          customDate:util.startDateEndDate(options.type)[1]
        })
      }
       this.setData({
        staffList:resDate
       })  
       this.findPerformanceForecastLabelGroup();
       this.toFilter()
    })
  },
  findPerformanceForecastLabelGroup(){
    API.findPerformanceForecastLabelGroup().then((res)=>{
      var resData = res.data.data||[];
      resData.forEach((item)=>{
        item.status = false
      });
      //console.log(resData)
       this.setData({
        labelList:resData
       })   
    })
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function(options) {
   this.findAllList(options);
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
    wx.hideLoading();
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
    if(this.data.hasMore){
      this.loadMore();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})