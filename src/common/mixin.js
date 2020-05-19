import {debounce} from "./utils";

export const itemListenerMixin = {
  data(){
    return {
      imageListener: null,
      newRefresh: null,
    }
  },
  mounted() {
      //1.在组件创建完成后监听图片加载完成事件
      this.newRefresh = debounce(this.$refs.scroll.refresh,500)
      this.imageListener = () => {
        this.newRefresh()
      }
      this.$bus.$on('itemImageLoad', this.imageListener)
      //2.获取controlTap组件的tabOffsetTop，每个组件都有一个$el属性用于获取组件元素的

    }
}

import BackTop from "components/content/backtop/BackTop";

export const backTopMixin = {
  components: {
    BackTop,
  },
  data(){
    return {
      isShowBackTop: false, //默认不显示
    }
  },
  methods: {
    backClick(){
        this.$refs.scroll.scrollTo(0,0,500)

      },
  }
}
