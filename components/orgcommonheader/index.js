// components/orgcommonheader/index.js
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    imgSrc:'',
    inforData:{},
    upperPermission:{},
    downPermission:{}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setBgImg(status) {
      let pixelRatio = this.getPixelRatio()
      let imgSrc
      // imgSrc
      if (pixelRatio == 2) {
        imgSrc = status == 2 ? '../../images/small_orange_bg_2x.png' : '../../images/small_blue_bg_2x.png'
      } else {
        imgSrc = status == 2 ? '../../images/small_orange_bg.png' : '../../images/small_blue_bg.png'
      }
      this.setData({
        imgSrc
      })
    },
    // 获取设备像素比
    getPixelRatio() {
      let pixelRatio = 0
      wx.getSystemInfo({
        success: function (res) {
          pixelRatio = res.pixelRatio
        },
        fail: function () {
          pixelRatio = 0
        }
      })
      return pixelRatio
    },
    toBasics(){
      if (this.data.inforData.type != 1){
        this.data.inforData.type = 1
        wx.redirectTo({
          url: '/pages/basicsInfor/index?orgId=' + this.data.inforData.orgId
        })
      }
    },
    toRegister(){
      if (this.data.inforData.type != 2) {
        this.data.inforData.type = 2
        wx.redirectTo({
          url: '/pages/register/index?orgId=' + this.data.inforData.orgId
        })
      }
    },
    /**
     * 营销项目
     */
    toProject() {
      if (this.data.inforData.type != 3) {
        app.globalData.orgInfor.type = 3
        
        let url = ''
        if (this.data.inforData.orgStatus == '2'){
          url = `/pages/upperProject/index?orgId=${this.data.inforData.orgId}`
        }else{          
          url = `/pages/project/index?orgId=${this.data.inforData.orgId}`
        }

        wx.redirectTo({url})
      }  
    },
    /**
     * 业绩预测
     */
    toPerformance() {
      if (this.data.inforData.type != 4) {
        app.globalData.orgInfor.type = 4
        wx.redirectTo({
          url: '/pages/performance/index?orgId=' + this.data.inforData.orgId
        })
      }  
    },
    /**
     * 跟进记录
     */
    toFollowUp() {
      if (this.data.inforData.type != 5) {
        app.globalData.orgInfor.type = 5
        wx.redirectTo({
          url: '/pages/followUp/index?orgId=' + this.data.inforData.orgId
        })
      }  
    },
    /**
     * 联系人
     */
    toContact() {
      if (this.data.inforData.type != 6) {
        app.globalData.orgInfor.type = 6
        wx.redirectTo({
          url: '/pages/contact/index?orgId=' + this.data.inforData.orgId
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
    }
  },

  attached(){   
    this.setData({
      // 上/下游 - 添加标签
      'upperPermission.addLabelButton': this.checkPermission('button','followUpCustomerPage:addLabelButton'),      
      'downPermission.addLabelButton': this.checkPermission('button','stayDownCustomerPage:addLabelButton'),
      // 上/下游 - 查看机构信息
      'upperPermission.orgInfoPage': this.checkPermission('menu','followUpCustomerPage_orgInfoPage'),
      'downPermission.orgInfoPage': this.checkPermission('menu','stayDownCustomerPage_orgInfoPage'),
      // 上/下游 - 业绩预测
      'upperPermission.preIncomeInfoPage': this.checkPermission('menu','followUpCustomerPage_preIncomeInfoPage'),
      'downPermission.preIncomeInfoPage': this.checkPermission('menu','stayDownCustomerPage_preIncomeInfoPage'),
      // 上/下游 - 跟进记录
      'upperPermission.memorandumButton': this.checkPermission('button','upStreamPage:memorandumButton'),
      'downPermission.memorandumButton': this.checkPermission('button','downStreamPage:memorandumButton'),
      // 上/下游 - 人员信息
      'upperPermission.personnelInfoPage': this.checkPermission('menu','followUpCustomerPage_personnelInfoPage'),
      'downPermission.personnelInfoPage': this.checkPermission('menu','stayDownCustomerPage_personnelInfoPage'),
      // 下游 - 销售分类
      'downPermission.consultDepButton': this.checkPermission('button','stayDownCustomerPage:consultDepButton'),
      // 下游 - 客户分类
      'downPermission.custServDepButton': this.checkPermission('button','stayDownCustomerPage:custServDepButton'),
      // 下游 - 班级
      'downPermission.unallocatedUpdateButton': this.checkPermission('button','stayDownCustomerPage:unallocatedUpdateButton'),
      // 上/下游 - 工作人员
      'upperPermission.personnelElasticFrame': this.checkPermission('button','followUpCustomerPage:personnelElasticFrame'),
      'downPermission.personnelElasticFrame': this.checkPermission('button','stayDownCustomerPage:personnelElasticFrame'),
      // 下游 - 提交客户
      'downPermission.submitCustomerElasticFrame': this.checkPermission('button','stayDownCustomerPage:submitCustomerElasticFrame'),   
      // 上游 - 商务分类
      'upperPermission.businessCentreUpdateButton': this.checkPermission('button','followUpCustomerPage:businessCentreUpdateButton'),
    
      inforData: app.globalData.orgInfor
    })
    this.setBgImg(app.globalData.orgInfor.orgStatus)
  }
})
