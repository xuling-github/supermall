<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="middle" class="title">
      <div v-for="(item,index) in titles"
           class="title-item"
           @click="itemClick(index)"
           :class="{active: currentIndex == index}">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data(){
      return {
        titles: ['商品', '参数', '评论', '详情'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index){
        this.currentIndex = index
        //发出事件给父组件
        this.$emit('titleClick', index)
      },
      backClick(){
        this.$router.back()
      }
    },
    components: {
      NavBar
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text)
  }
  .back{
    margin-top: 5px;
  }
</style>
