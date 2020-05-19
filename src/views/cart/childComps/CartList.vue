<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList"
                      :item-info="item"
                      :key="index"/>
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from './CartListItem';
  import CartBottomBar from './CartBottomBar';

  export default {
    name: "CartList",
    components: {
      Scroll,
      CartListItem,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll.refresh()
    },
    data(){
      return {

      }
    },
    computed: {
      ...mapGetters(['cartList'])
    }
  }
</script>

<style scoped>
  .cart-list{
    position: relative;
    top:44px;
    left:0px;
    right: 0px;
    height: calc(100% - 44px - 44px - 49px)
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
