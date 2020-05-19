<template>
    <div id="cart">
      <nav-bar class="nav-bar">
        <div slot="middle">购物车({{ length }})</div>
      </nav-bar>
<!--      商品列表-->
      <cart-list/>
    </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from './childComps/CartList'
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList
    },
    computed: {
      //两种语法 1.数组语法 2.对象语法
      //...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  #cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
