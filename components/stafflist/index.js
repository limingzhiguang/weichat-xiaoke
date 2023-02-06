// components/stafflist/index.js
const letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","#"]

Component({
  /**
   * 组件的属性列表
   */
  properties: {    
    lists:{
      type:Array,
      value: [],
      observer: function(newVal){        
        let _ = this
        if (newVal.length === 0) return        
        this.getCounselor()
        this.setData({
          dataList: JSON.parse(JSON.stringify(newVal))
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    letter,
    dataList:[],
    intoView:'',
    current:'',
    keyword:null,
    Height:0,
    _tops:[],
    stopScroll:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
   * scrollTo
   */
    scrollTo(e) {
      let id = e.target.dataset.id
      
      this.setData({
        current: id,
        intoView:id,
        stopScroll:true
      })
    },
    /**
     * 获取 '.counselor' 的高度集合
     */
    getCounselor(){      
      let _ = this
      let query = this.createSelectorQuery()
           
      query.selectAll('.counselor').boundingClientRect((rects) => {
        let _tops = rects.map((item)=>{
          return { id: item.dataset.index,top:item.top}
        })
        _.setData({
          _tops
        })
      }).exec()

    },
    /**
     * 滚动,右侧定位到显示的数组首字母
     */
    scrolling(e) {
      let st = e.detail.scrollTop
      let _top = this.data._tops, current = ''
            
      if (st < _top[0].top){
        current = _top[0].id
      }else{
        
        for (let i = 0, len = _top.length - 1; i < len; i++){
          if (st < _top[i + 1].top && st >= _top[i].top ){            
            current = _top[i].id
          }
        }
      }
      
      if (!current) current = _top[_top.length -1 ].id
      
      if (this.data.stopScroll){
        this.setData({
          stopScroll:false
        })
      }else{
        this.setData({
          current
        })
      }      
    },

    /**
     * 输入关键词
     */
    inputWord(e) {
      let keyword = e.detail.value.toLowerCase()
      let dataList = JSON.parse(JSON.stringify(this.data.lists))
      
      dataList.forEach((item)=>{
        if(item.children){
          let temp = []
          item.children.forEach((val,idx)=>{
            if (val.userNameEn.toLowerCase().includes(keyword) || val.userNameCn.includes(keyword)){
              temp.push(item.children[idx])
            }
          })
          item.children = temp
        }
      })

      this.setData({
        keyword,
        dataList
      })
    },
    /**
     * 清除关键词
     */
    clear(){
      this.setData({
        keyword:'',
        dataList: JSON.parse(JSON.stringify(this.data.lists))
      })
    },
    /**
     * 取消
     */
    cancel(){
      wx.navigateBack()
    },
    /**
     * 选中顾问
     */
    choose(e){
      let user = e.target.dataset
      this.triggerEvent('choose', { user })
    }
  }
  
})