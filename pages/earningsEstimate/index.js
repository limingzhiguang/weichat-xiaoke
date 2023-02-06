// pages/earningsEstimate/index.js
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选值
    dateTimeType:'',// 1-创建时间;2-成单时间
    startDateTime:'',
    endDateTime:'',

    followTimeIndex:'',
    creatTime:null,
    creatEndTime:'',
    startPrice:'',
    endPrice:'',
    yearValueIndex:'',
    //项目名称
    filterSearchValue:'',
    orgName:'',

    //end
    topIndex:0,
    topStatus:false,
    searchStatus:false,
    //预计成单时间
    flowTimeList:[{label:'本周',value:1},{label:'下周',value:2},{label:'本月',value:3},{label:'下月',value:4}],
    yearValueList:[
      {label:'0~100万',value:1},
      {label:'100~300万',value:2},
      {label:'300~500万',value:3},
      {label:'500~1千万',value:4},
      {label:'1千万~2千万',value:5},
      {label:'2千万~5千万',value:6},
      {label:'5千万以上',value:7}
    ],
    customerStatusList:[
      {label:'待下发',value:1},
      {label:'待踢单',value:2},
      {label:'成交客户',value:3}
    ],
    //全部
    allSelect:0,
    allSelectList:['全部','今日新增','我负责的','我下属的'],
    //排序
    sortSelect:null,
    //排序、录入时间正序、录入时间倒序、最后一次跟新时间正序、最后一次跟新时间倒序、离我最近距离
    sortSelectList:['录入时间正序','录入时间倒序','最后一次跟新时间正序','最后一次跟新时间倒序'],
    pageSize:30,
    pageIndex:1,
    orgList:[],
    hasMore:true,
    userId:'',
    consentLevel:[
      {
        value:'N/A',
				label:'未分类'
      },
      {
				value:'A',
				label:'A'
			},
			{
				value:'B',
				label:'B'
			},
			{
				value:'C',
				label:'C'
			},
			{
				value:'D',
				label:'D'
			}
    ],
    intentType:'',
    stageList:[{
        value: 1,
        label: '发现需求'
      },
      {
        value: 2,
        label: '确认需求'
      },
      {
        value: 3,
        label: '解决方案'
      },
      {
        value: 4,
        label: '商务谈判'
      },
      {
        value: 5,
        label: '招标'
      },
      {
        value: 6,
        label: '赢单'
      },
      {
        value: 7,
        label: '输单'
      },
      {
        value: 8,
        label: '延期'
    }]
  },

  // tab切换
  topSwitch(e){
    var topIndex = Number(e.currentTarget.dataset.topIndex);
    this.component.setPage(true)
    this.setData({
      topStatus:!(topIndex === this.data.topIndex && this.data.topStatus),
      topIndex:topIndex
    });
    
    switch(topIndex){
      case 0:
          this.setData({
            orgName:''
          }) 
          this.reset();
      break;
      case 1:
        this.setData({
          orgName:'',
         // allSelect:''
        }) 
      break;
      case 2:

      break;
      case 3:
        this.setData({
         //allSelect:'',
          searchStatus:true
        }) 
        this.reset();
      break;
    }
  },

  // 全部筛选
  allSelect(e){
    var index = e.currentTarget.dataset.allSelect;
    this.setData({
      allSelect:index
    })
    this.firstFindList()
  },

  //跟进时间
  followTime(e){
    var index = e.currentTarget.dataset.followTimeIndex;
    var timeList = [];
    timeList = util.weekMonthStartTimeEndTime(index);
    this.setData({
      followTimeIndex:index,
      dateTimeType:2,
      startDateTime:timeList[0],
      endDateTime:timeList[1],
    })
    // console.log(e,timeList)
  },

  // 创建时间-开始时间
  bindDateChange(e){
    this.setData({
      creatTime:e.detail.value,
      startDateTime:e.detail.value,
      dateTimeType:1,
    })
  },

  //创建时间-结束时间
  bindDateChangeEndTime(e){
    let value = e.detail.value;
    let startTime = new Date(this.data.creatTime).getTime();
    let endTime = new Date(value).getTime();
    if(endTime-startTime<0){
      wx.showModal({
        title: '提示',
        content: '结束时间不能小于开始时间',
        showCancel:false,
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    this.setData({
      creatEndTime:value,
      endDateTime:value,
    })
  },

  // 预计售卖-开始价格
  getStartPrice(e){
    this.setData({
      startPrice:e.detail.value
    })
  },

  // 预计售卖-结束价格
  getEndPrice(e){
    this.setData({
      endPrice:e.detail.value
    })
  },
  // 产品意向度
  setIntent(e){
    this.setData({
      intentType: e.currentTarget.dataset.val
    })
  },
  // 阶段筛选
  yearValue(e){
     this.setData({
      yearValueIndex:e.currentTarget.dataset.yearValueIndex
     })
  },
  // 关闭筛选浮层
  closeTopFloat(){
    this.component.setPage(false)
    this.setData({
      topStatus:false,
      searchStatus:false
    });
    //this.clearFilter();
  },
  
  //筛选-获取搜索内容
  filterSearch(e){
    this.setData({
      filterSearchValue:e.detail.value
    })
  },
  getOrgName(e){
    this.setData({
      orgName:e.detail.value
    })
  },

  // 搜索
  toSearch(){
    this.firstFindList()
  },
  // 列表更新
  updateList(e){
    this.setData({
      hasMore:true,
      pageIndex:1,
      orgList:[]
    })
    this.getList();
  },
  // 头部统一筛选首次加载初始化
  firstFindList(){
    this.setData({
      topStatus:false,
      hasMore:true,
      pageIndex:1,
      orgList:[]
    })
    this.getList();
    this.closeTopFloat();
  },
  clearSearchInput(e){
    this.setData({
      orgName:''
    })
  },
  // 搜索--取消
  cancerSearch(){
    this.setData({
      searchStatus:false
    });
  },

  // 排序
  sortSelect(e){
    var index = e.currentTarget.dataset.sortSelect;
    this.setData({
      sortSelect:index
    })
  },
  clearFilterSearch(){
    this.setData({
      filterSearchValue:''
    }) 
  },
  //筛选确认
  sure(){
    this.component.setPage(false)
    this.setData({
      topStatus:false,
      hasMore:true,
      pageIndex:1,
      orgList:[]
    });
    this.getList();
  },
  // 重置筛选
  reset(){
    this.setData({
      followTimeIndex:'',
      creatTime:null,
      creatEndTime:'',
      startPrice:'',
      endPrice:'',
      yearValueIndex:'',
      filterSearchValue:'',

      dateTimeType:'',
      startDateTime:'',
      endDateTime:'',
     // allSelect:'',
      userId:''
    })
  },

  
  // 列表数据请求
  getList(){
    if (!this.data.hasMore) return;
    wx.showLoading({ title: '拼命加载中...' });
    let {
      allSelect,
      followTimeIndex,creatTime,
      creatEndTime,startPrice,
      endPrice,yearValueIndex,
      filterSearchValue,dateTimeType,
      startDateTime,endDateTime,orgName,intentType} = this.data;   
    API.predictionByList({
      dataType:allSelect,
      dateTimeType:dateTimeType,
      startDateTime:startDateTime,
      endDateTime:endDateTime,
      cjAmountStart:startPrice,
      cjAmountEnd:endPrice,
      stageContent:yearValueIndex,
      projectName:filterSearchValue,
      orgName:orgName,
      intentType:intentType,
      pageSize:this.data.pageSize,
      pageIndex:this.data.pageIndex++,
      userId:this.data.userId
    }).then((res)=>{
       if(res.data.totalRecords===this.data.orgList.length){
          this.setData({
            hasMore:false
          })
          wx.hideLoading();
          return;
       }
       this.setData({
        orgList:this.data.orgList.concat(res.data.data)
       });
       wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 简报看板
    if(options.type){
      let startTime = util.startDateEndDate(options.type)[0];
      let endTime = util.startDateEndDate(options.type)[1];
      this.setData({
        dateTimeType:1,
        topIndex:'1',
        followTimeIndex:'',
        startDateTime:startTime,
        endDateTime:endTime,
        creatTime:startTime,
        creatEndTime:endTime,
        userId:options.userId
      })
    }
     this.getList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.component = this.selectComponent("#component")    
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
    if(this.data.hasMore){
      this.setData({
        hasMore:true
       });
       this.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})