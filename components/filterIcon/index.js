// components/filterIcon/index.js
const util = require('../../utils/util.js');
Component({
  properties: {
    row: {
        type: Object,
        value: {},
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    urlList:[]
  },
  attached: function attached() {
    let rowObject = {}
    let pathObject = {};
    rowObject = this.properties.row;
    if(rowObject.crmOrgFollowUpLogAnnexPicBo){
      rowObject.crmOrgFollowUpLogAnnexPicBo.annexPic1 = rowObject.annexPic;
    }
    pathObject = rowObject.crmOrgFollowUpLogAnnexPicBo;
    this.setData({
      urlList:[]
    })
    //type 1图片，2视频，3文本，4音频，5 word,6 excel,7 ppt ,8 pdf
    for(let key in pathObject){
      if(pathObject[key]){
        this.data.urlList.push({
          path:pathObject[key],
          icon:util.filterFileType(pathObject[key]).icon,
          name:util.filterFileType(pathObject[key]).name,
          type:util.filterFileType(pathObject[key]).type
        })
      }
    }
    this.setData({
      urlList:this.data.urlList
    })
  },

  methods: {
    lookFile(e){
      let dataset = {};
      dataset = e.currentTarget.dataset;
      this.triggerEvent('update',{path:dataset.path,type:dataset.type})
    }
  }
})