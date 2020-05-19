<template>
  <div id="app">
<!--    这里如果不加keep-alive的exclude属性的话那么很多东西都会保留状态，-->
<!--    比如详情页永远拿到的时一个id，那么就出错了,所以要把他exclude掉-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import 'assets/css/base.css'
</style>
