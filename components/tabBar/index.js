// components/tabBar/index.js
// isIphoneX
const permission = require('../../utils/permission.js');
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentTab:Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabIndex:0,
    tabList:[
      {
        name:'首页',
        icon:'iconshouye',
        path:'/pages/dashboard/index',
        isAdd:false
      },
      {
        name:'待办',
        icon:'icondaibanshixiang',
        path:'/pages/dealWith/index',
        isAdd:false
      },
      {
        name:'新增',
        icon:'iconwode',
        path:'/pages/newclient/newclient',
        isAdd:true
      },
      {
        name:'客户',
        icon:'iconkehuziyuanguanli',
        path:'/pages/allCustomer/index',
        isAdd:false
      },
      {
        name:'我的',
        icon:'iconwode',
        path:'/pages/user/user',
        isAdd:false
      }
     ],
     isIphoneX:false
  },
  attached: function attached() {
    let currentPage = getCurrentPages()
    this.setData({
      currentPage: currentPage[currentPage.length - 1].route,
      isIphoneX:app.globalData.isIphoneX
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e){
      let { tabIndex, path } = e.currentTarget.dataset;
      let currentPage = this.data.currentPage

      //客户
      if(tabIndex===3){
        if(!permission.menuControl('allCustomerPage')) return;        
      }

      // 阻止新增时点新增刷新
      if(tabIndex === 2){
        // if(('/' + currentPage) === path){
        //   return false
        // }
        wx.navigateTo({
          url: e.currentTarget.dataset.path,
        })
      }else{
        wx.reLaunch({
          url: e.currentTarget.dataset.path
        })
      }

      
    }
  }
})
