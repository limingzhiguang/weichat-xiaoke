// components/tabBar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTab:Number,
    orgId:String,
    orgName:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex:0,
    tabList:[
      {
        name:'写跟进',
        pathName:'writeFollow',
        icon:'iconbaifangjiluS',
        path:'/pages/writeFollow/index',
        isAdd:false,
        size:'40rpx'
      },
      {
        name:'新增联系人',
        pathName:'addContact',
        icon:'iconxinzengzuyuan',
        path:'/pages/addContact/index',
        isAdd:false,
        size:'46rpx'
      },
      {
        name:'门店照片',
        pathName:'orgPicture',
        icon:'icontupian',
        path:'/pages/orgPicture/index',
        isAdd:false,
        size:'46rpx'
      },
      {
        name:'定位',
        pathName:'position',
        icon:'iconxingzhuang1',
        path:'/pages/position/index',
        isAdd:false,
        size:'42rpx'
      }
     ],
     currentPage:'',
     isIphoneX:false,
     upperPermission:{},
     downPermission:{},
     orgId:'',
     orgName:''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      let _ = this  
      let { path, pathName} = e.currentTarget.dataset
      let orgStatus = this.data.inforData.orgStatus
      let { upperPermission, downPermission } = this.data;
      let followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
      this.setData({
        orgId:this.properties.orgId,
        orgName:this.properties.orgName
      })
      
      if (('/' + this.data.currentPage) === path) {
        return false
      }

      let isPicPage = this.data.currentPage === 'pages/orgPicture/index'
      
      
      if (pathName === 'position'){        
        wx.getSetting({
          success:(res)=>{
            if (!res.authSetting['scope.userLocation']){
              wx.showModal({
                title: '请求获取地理位置授权',
                content: '需要获取您的地理位置,去授权?',
                success: (res) => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: (resx) => {
                        if (resx.authSetting["scope.userLocation"] == true) {
                          // if (isPicPage) {
                          //   wx.redirectTo({
                          //     url: path + '?isOrgDetail=1&orgId=' + _.data.orgId + '&orgName=' + _.data.orgName
                          //   })
                          // } else {
                          //   wx.navigateTo({
                          //     url: path + '?isOrgDetail=1&orgId=' + _.data.orgId + '&orgName=' + _.data.orgName
                          //   })
                          // }
                          this.getLocation()
                        }
                      }
                    })
                  }                  
                },
                fail:(err)=>{
                  wx.showToast({
                    title: '获取地理位置授权失败',
                    icon:'none'
                  })
                }
              })
            }else{
              // if (isPicPage){
              //   wx.redirectTo({
              //     url: path + '?isOrgDetail=1&orgId=' + _.data.orgId + '&orgName=' + _.data.orgName
              //   })
              // }else{
              //   wx.navigateTo({
              //     url: path + '?isOrgDetail=1&orgId=' + _.data.orgId + '&orgName=' + _.data.orgName
              //   })
              // }  
              this.getLocation()
            }
          }
        })
      } else if (isPicPage){
        if(pathName === 'writeFollow'){
          if((orgStatus == 2 && !upperPermission.memorandumButton) || (orgStatus != 2 && !downPermission.memorandumButton)){
            wx.showModal({
              title:'提示',
              content: '您无此操作权限！',
              confirmColor:'#017FFF'
            })

            return false
          }
        }else if(pathName === 'addContact'){
          if((orgStatus == 2 && !upperPermission.personnelInfoPage) || (orgStatus != 2 && !downPermission.personnelInfoPage)){
            wx.showModal({
              title:'提示',
              content: '您无此操作权限！',
              confirmColor:'#017FFF'
            })
            
            return false
          }
        }
        followOrgInfo.orgId = this.data.orgId;
        followOrgInfo.orgName = this.data.orgName;
        followOrgInfo.isOrgDetail = '1';
        wx.removeStorageSync('addContact')
       // wx.removeStorageSync('followOrgInfo')
        wx.setStorageSync('followOrgInfo', followOrgInfo)
        wx.removeStorageSync('orgPerson')
        wx.redirectTo({
          url: path + '?isOrgDetail=1&orgId=' + this.data.orgId + '&orgName=' + this.data.orgName
        })
      }else{
        if(pathName === 'writeFollow'){
          if((orgStatus == 2 && !upperPermission.memorandumButton) || (orgStatus != 2 && !downPermission.memorandumButton)){
            wx.showModal({
              title:'提示',
              content: '您无此操作权限！',
              confirmColor:'#017FFF'
            })

            return false
          }
        }else if(pathName === 'addContact'){
          if((orgStatus == 2 && !upperPermission.personnelInfoPage) || (orgStatus != 2 && !downPermission.personnelInfoPage)){
            wx.showModal({
              title:'提示',
              content: '您无此操作权限！',
              confirmColor:'#017FFF'
            })
           
            return false
          }
        }else if(pathName === 'orgPicture'){
          if((orgStatus == 2 && !upperPermission.shopPhotoPage) || (orgStatus != 2 && !downPermission.shopPhotoPage)){
            wx.showModal({
              title:'提示',
              content: '您无此操作权限！',
              confirmColor:'#017FFF'
            })
            
            return false
          }
        }
        followOrgInfo.orgId = this.data.orgId;
        followOrgInfo.orgName = this.data.orgName;
        followOrgInfo.isOrgDetail = '1';
       // wx.removeStorageSync('followOrgInfo');
        wx.setStorageSync('followOrgInfo', followOrgInfo)
        wx.removeStorageSync('addContact')
        wx.removeStorageSync('orgPerson')
        wx.navigateTo({
          url: path + '?isOrgDetail=1&orgId=' + this.data.orgId + '&orgName=' + this.data.orgName
        })
      }        
    },
    /**
     * @param {string} type 
     * @param {string} per 
     * @return {boolean}
     */
    checkPermission(type,per){
      const permissionList = wx.getStorageSync('permissionList')
      const menuList = wx.getStorageSync('menuList')
      let btnPermission = permissionList?permissionList:[]
      let menuPermission = menuList?menuList:[]
      
      if(type === 'menu'){
        return menuPermission.includes(per)
      }else{
        return btnPermission.includes(per)
      }    
    },
    /**
     * 地图处理方法
     */
    getLocation(){
      let address = app.globalData.orgInfor.address
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + address +'&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z',
        success:(res)=>{
          
          let result = res.data.result
          let longitude = result.location.lng
          let latitude = result.location.lat
          
          wx.openLocation({
            latitude,
            longitude,
            scale:15,
            address: app.globalData.orgInfor.orgName
          })
  
        }
      })
    }
  },
  attached(){
    let currentPage = getCurrentPages()
    
    this.setData({ 
      currentPage: currentPage[currentPage.length - 1].route,
      isIphoneX:app.globalData.isIphoneX,
      inforData:app.globalData.orgInfor,     
      // 上/下游 - 跟进记录
      'upperPermission.memorandumButton': this.checkPermission('button','upStreamPage:memorandumButton'),
      'downPermission.memorandumButton': this.checkPermission('button','downStreamPage:memorandumButton'),
      // 上/下游 - 人员新增信息
      'upperPermission.personnelInfoPage': this.checkPermission('button','followUpCustomerPage_personnelInfoPage:addButton'),
      'downPermission.personnelInfoPage': this.checkPermission('button','stayDownCustomerPage_personnelInfoPage:addButton'),
      // 上/下游 - 门店照片查看
      'upperPermission.shopPhotoPage': this.checkPermission('menu','followUpCustomerPage_shopPhotoPage'),
      'downPermission.shopPhotoPage': this.checkPermission('menu','stayDownCustomerPage_shopPhotoPage')
    })
  }
})
