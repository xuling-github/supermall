<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    methods: {
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll &&this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    },
    //一旦这个组件被挂载之后就创建滚动实例,这个实例也是加载完就消失的所以需要一个变量把他及时保存起来
    mounted() {
      // 1.创建BScroll实例
      this.scroll = new BScroll(this.$refs.wrapper,{
        //在wrapper内容有不止一个元素是，为了能够监听点击事件是，
        // 这里必须把click设置为true，不然事件监听不起作用
        // 所以最好一直把click设为true
        click: true,
        // 需要监听事件必须添加probeType属性
        // 因为有些组件不需要实时监听，有些需要，
        // 所以不能在这直接赋值0或3，而应该让父组件传过来一个信息给子组件
        // probeType: 3
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3){
        this.scroll.on('scroll',(position) => {
        //自定义事件将监听到的位置传个父组件home
        this.$emit('condentScroll', position)
      })
      }
      //3,监听滚动到底部
      //发送给home组件监听,这里射pulingup home组件就需要@pulingup监听并且创建一个方法来实施
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })

      }
    },
  }
</script>

<style scoped>

</style>

