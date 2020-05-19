<template>
    <swiper>
      <swiper-item v-for="item in banners">
    <a :href="item.link">
      <img :src="item.image" alt="" @load="imageLoad">
    </a>
  </swiper-item>
    </swiper>
</template>

<script>
  // 导入轮播图
  import {Swiper,SwiperItem} from "components/common/swiper"
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad(){
        // 发送图片加载完成事件，只需要发送一次，
    // 那么我们可以找一个东西记录加载状态isLoad，默认设置为false,
    // 当函数被调用之后把isLoad改为true，那么因为设置这个函数的条件
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        }
      },
    }

  }
</script>

<style scoped>

</style>
