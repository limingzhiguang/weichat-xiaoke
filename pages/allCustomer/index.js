// pages/allCustomer/index.js
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topIndex:0,
    topStatus:false,
    //筛选索引
    followTimeIndex:'',
    noContactsTimeIndex:'',
    yearValueIndex:'',
    customerStatusIndex:'',
    flowTimeList:[{label:'今日',value:1},{label:'昨日',value:2},{label:'本周',value:3},{label:'本月',value:4}],
    noContantTimeList:[{label:'1-2周',value:1},{label:'2周-1月',value:2},{label:'1月-2月',value:3},{label:'2月以上',value:4}],
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
      {label:'待踢单',value:3},
      {label:'移交客服',value:5},
      {label:'退还待下发',value:4}
    ],
    //全部
    allSelect:0,
    allSelectList:['全部','今日新增','我负责的','我协助的'],
    //排序
    sortSelect:null,
    sortSelectList:['录入时间正序','录入时间倒序','最后一次跟新时间正序','最后一次跟新时间倒序'],
    hasMore:true,
    customerList:[],
    searchStatus:false,
    testList:[],
    region: [],
    customItem: '全部',
    pageIndex:1,
    pageSize:30,
    orgName:'',
    userName:'',
    counselorId:'',
    isShow:false,
    province:'',
    city:'',
    area:''
  },
  topSwitch(e){
    var topIndex = Number(e.currentTarget.dataset.topIndex);
    this.setData({
      topStatus:true,
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
          orgName:''
        }) 
      break;
      case 2:

      break;
      case 3:
        this.setData({
          searchStatus:true
        }) 
        this.reset();
      break;
    }
  }, 
  toDetail(e){
    wx.navigateTo({
      url:`../detail/detail?orgId=${e.currentTarget.dataset.orgId}&orgType=${e.currentTarget.dataset.orgType}`
    })
  },
  // 全部客户
  allSelect(e){
    var index = e.currentTarget.dataset.allSelect;
    this.setData({
      allSelect:index
    })
    this.firstFindList()
  },

  // 最后跟进时间
  followTime(e){
    var index = e.currentTarget.dataset.followTimeIndex;
    this.setData({
      followTimeIndex:index,
    });
  },

  //未联系时间类型
  noContactsTime(e){
    var index = e.currentTarget.dataset.noContactsTimeIndex;
    this.setData({
      noContactsTimeIndex:index
    });
  },

  // 区域
  bindRegionChange(e){
    let address = e.detail.value;
    address[1]=address[0]===address[1]?'市辖区':address[1];
    this.setData({
      region:address,
    })
  },

  // 客户状态
  customerStatus(e){
    var index = e.currentTarget.dataset.customerStatusIndex;
    this.setData({
      customerStatusIndex:index
    })
  },

  // 排序 ——未使用
  sortSelect(e){
    var index = e.currentTarget.dataset.sortSelect;
    this.setData({
      sortSelect:index
    })
  },

  //关闭弹窗
  closeTopFloat(){
    this.setData({
      topStatus:false,
      searchStatus:false
    });
  },

  clearSearchInput(e){
    this.setData({
      orgName:''
    })
  },
  // 取消搜索
  cancerSearch(){
    this.setData({
      searchStatus:false
    });
  },

  // 搜索获得机构名
  getOrgName(e){
    this.setData({
      orgName:e.detail.value
    })
  },
  // 省市区地区
  confirm(e){
    console.log(e,'地址');
    let {province,city,area} = e.detail;
    this.setData({
      province:province,
      city:city,
      area:area,
      isShow:false
    })
  }, 
  selectAddress(){
    this.setData({
      isShow:true
    })
  },
  cancer(){
    this.setData({
      isShow:false
    })
  },
  // 搜索
  toSearch(){
    this.firstFindList()
  },

  // 头部统一筛选首次加载初始化
  firstFindList(){
    this.setData({
      topStatus:false,
      hasMore:true,
      pageIndex:1,
      customerList:[]
    })
    this.loadMore()
    this.closeTopFloat();
  },
  reset(){
    this.setData({
      //allSelect:0,
      followTimeIndex:'',
      noContactsTimeIndex:'',
      region:[],
      customerStatusIndex:'',
      userName:'',
      enterStartTime:'',
      enterEndTime:'',
      yearValueIndex:'',
      sortSelect:'',
      province:'',
      city:'',
      area:''
    });
  },
  sure(){
    this.firstFindList();
  },
 
   // 根据地址统一解析经纬度
   getList(){
    // 接口请求 -- 》list
    var latitude = 0,longitude=0;
    var _this=this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        latitude = res.latitude;
        longitude = res.longitude;
        console.log(latitude,longitude);
        var length = _this.data.customerList.length;
        _this.data.customerList.forEach((item,index)=>{
          // item.address ---> 腾讯接口解析经纬度  ----》返回 机构经纬度
         // item.distance = this.getDistance('用户维度','用户精度', '机构维度', '机构精度')
         //https://apis.map.qq.com/ws/geocoder/v1/?address=
         wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/?key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z&address='+item.orgJianName,
          header: {
            'content-type': 'application/json' // 默认值
          },
          success (res) {
           // console.log(res.data,'返回结果');
            if(res.data.status===0){
              var location = res.data.result.location;
              console.log(location,'返回结果');
              //console.log(length-1,index);
               item.distance = _this.getDistance(latitude,longitude, location.lat,location.lng);
               if((length-1) === index){
                 console.log(index,'index-----')
                // _this.setData({
                //   customerList:_this.data.customerList
                // })
               }
            }
          }
        })
        
        });
         setTimeout(()=>{
          _this.setData({
            customerList:_this.data.customerList
          })
         },2000)
      }
    });
    
    
  
  },
  /**
   * 距离计算
   */
  findXy(x,y) { //获取用户的经纬度
    var that = this;
     wx.getLocation({
       type: 'wgs84',
       success(res) {
         console.log("您位置的经度：" + res.longitude);
         console.log("您位置的维度：" + res.latitude)
         this.getDistance(res.latitude, res.longitude, x, y)
       }
     })
   },
   Rad: function(d) { //根据经纬度判断距离
     return d * Math.PI / 180.0;
   },
   /**
    * lat1用户的纬度,lng1用户的经度,lat2商家的纬度，lng2商家的经度
    */
   getDistance: function(lat1, lng1, lat2, lng2) {
     var radLat1 = this.Rad(lat1);
     var radLat2 = this.Rad(lat2);
     var a = radLat1 - radLat2;
     var b = this.Rad(lng1) - this.Rad(lng2);
     var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
     s = s * 6378.137;
     s = Math.round(s * 10000) / 10000;
     s = s.toFixed(2) + '公里' //保留两位小数
     console.log('经纬度计算的距离:' + s)
     return s
   },
   lookMap(){
    // wx.chooseLocation({
    //   latitude:31.08874759280087,
    //   longitude:121.51950348828123,
    //   success:(res)=>{
    //     console.log(res,'333');
    // } 
    // })

    wx.openLocation({
      latitude:31.058818095385657,
      longitude:121.73695017311857,
      scale: 15
    })
   
   },
   async loadMore() {
    if (!this.data.hasMore) return;
    wx.showLoading({ title: '拼命加载中...' });
    var lastFollowStartDate='',lastFollowEndDate=''; 
    lastFollowStartDate = this.data.followTimeIndex?util.startDateEndDate(this.data.followTimeIndex)[0]:'';
    lastFollowEndDate = this.data.followTimeIndex?util.startDateEndDate(this.data.followTimeIndex)[1]:'';
    const options = {
      dataType:this.data.allSelect,
      orgJianName:this.data.orgName,
      lastFollowStartDate:lastFollowStartDate,
      lastFollowEndDate:lastFollowEndDate,
      forgetRemindType:this.data.noContactsTimeIndex,
      province:this.data.province,
      city:this.data.city,
      aera:this.data.area,
      orgStatus:this.data.customerStatusIndex,
      pageSize:this.data.pageSize,
      pageIndex:this.data.pageIndex++,
      counselor:this.data.userName,
      enterStartTime:this.data.enterStartTime?this.data.enterStartTime:'',
      enterEndTime:this.data.enterEndTime?this.data.enterEndTime:'',
      counselorId:this.data.counselorId?this.data.counselorId:''
    }
    const resCount = await API.findMyOrgListCount(options);
    let totalRecords = resCount.data.totalRecords||resCount.data.data||0
    let res = await API.findAllOrgList(options);
    let result = res.data.data||[];
    if(totalRecords<30){
      this.setData({
        hasMore:false
      })
    }
    if(this.data.customerList.length === totalRecords){
      this.setData({
        hasMore:false
      })
    }else{
      result.forEach((item) => {
        let followDays = item.lastFollowUpDays?Number(item.lastFollowUpDays):null;
         if(followDays>365){
          item.lastFollowUpDays = parseInt(followDays/365)+'年前';
         }else if(followDays>30){
          item.lastFollowUpDays = parseInt(followDays/30)+'个月前';
         }else if(followDays>0){
          item.lastFollowUpDays = followDays+'天前';
         }else if(followDays===0){
          item.lastFollowUpDays = '今天';
         }else{
          item.lastFollowUpDays = '无';
         }
      });
      this.setData({ 
        customerList: this.data.customerList.concat(result)
      });
     // this.getList();
    }
    wx.hideLoading();  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pageIndex:1,
      hasMore:true,
      customerList:[]
    })

    // 简报看板
    console.log(options.type,'Number(options.type)')
    if(options.type){
      var currentUser = wx.getStorageSync('useInfo');
      var type = Number(options.type);
      var enterStartTime,enterEndTime;
      var topIndex = '0';
      if(options.all){
        enterStartTime = '';
        enterEndTime = '';
        topIndex = '0';
      }else{
        enterStartTime = util.startDateEndDate(type)[0];
        enterEndTime = util.startDateEndDate(type)[1];
        topIndex = '0';
      }
      this.setData({
        //followTimeIndex:Number(options.type),
        enterStartTime:enterStartTime,
        enterEndTime:enterEndTime,
        counselorId:options.userId,
        topIndex:topIndex,
        userName:`${currentUser.userNameEn}${currentUser.userNameCn}`
      })
    }

    //遗忘提醒
    if(options.forgetRemindIndex){
      this.setData({
        topIndex:'1',
        counselorId:options.userId,
        noContactsTimeIndex:options.forgetRemindIndex
      })
    }
    this.loadMore()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    // var _this = this;
    // this.getList()
    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userLocation']) {
    //       wx.authorize({
    //         scope: 'scope.userLocation',
    //         success () {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           _this.getList()
    //         }
    //       })
    //     }
    //   }
    // })
   
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