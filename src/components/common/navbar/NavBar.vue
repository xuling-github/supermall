<template>
    <div class="nab-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="middle"><slot name="middle"></slot></div>
      <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  .nab-bar{
    /*flex布局 左右两边固定宽度60px 中间设置flex：1*/
    display:flex;
    /*导航条高度*/
    height: 44px;
    /*内容高度*/
    line-height: 44px;
    /*文字居中*/
    text-align: center;
    /*设置阴影偏移*/
    box-shadow: 0px 1px 1px rgba(100,100,100,.1);
  }
  .left, .right{
    width:60px;
  }
  .middle{
    flex:1
  }
</style>
