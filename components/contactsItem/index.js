// components/contactsItem/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    row:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    callPhone(e){
      wx.showActionSheet({
        itemList: ['拨打电话', '复制电话'],
        success (res) {
          if(res.tapIndex===0){
            wx.makePhoneCall({
              phoneNumber: e.currentTarget.dataset.mobile
            })
          }else{
            // 设置剪贴板
            wx.setClipboardData({
              data: e.currentTarget.dataset.mobile,
              success (res2) {
                
              }
            })
          }
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    toPersonDetail(e){
      let id = e.currentTarget.dataset.id;
      let orgName = e.currentTarget.dataset.orgName;
      let orgId = e.currentTarget.dataset.orgId;
      let isOrgDetail = e.currentTarget.dataset.isDetail
      let query = '?id='+id+'&orgName='+orgName+'&orgId='+orgId
      query += isOrgDetail?'&isOrgDetail=1':''

      wx.navigateTo({
        url: '/pages/contactsInfo/index' + query
      })
    }
  },
  attached(){
    
  }
})
