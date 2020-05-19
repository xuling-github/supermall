<template>
    <div class="cart-bottom-area">
      <check-button class="check-area" :is-checked="isAllChecked" @click.native="checkClick"/>
      <span class="check-state">全选</span>
      <div class="total-item">总价：{{totalPrice}}</div>
      <div class="count-item">去计算({{totalLength}})</div>
    </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice(){
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((prevalue,item) => {
          return prevalue + item.price * item.count
        },0).toFixed(2)
      },
      totalLength(){
        return this.cartList.filter(item => item.checked).length
      },
      isAllChecked(){
        if(this.cartList.length === 0) return false
        // !(3) 结果为fasle  ！（0）结果为true
        return !(this.cartList.filter(item => !item.checked).length)
      }
    },
    methods: {
      checkClick(){
        if(this.isAllChecked){//全部选中状态点击后变为全部不选中
          return this.cartList.forEach(item => item.checked = false)
        }else{//部分未选中或全部不选中点击后变为全选
          return this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
    .cart-bottom-area{
      position: relative;
      height: 40px;
      width: 100%;
      display: flex;
      line-height: 40px;
      font-size: 15px;
    }
  .cart-bottom-area .check-area{
    position: relative;
    width: 18px;
    height: 18px;
    line-height: 18px;
    float: left;
    margin: 10px 3px 8px 2px;
  }
  .cart-bottom-area .check-state{
    width: 60px;
  }
  .cart-bottom-area .total-item{
    flex: 1;
  }
  .cart-bottom-area .count-item{
    width: 90px;
    color: #eee;
    text-align: center;
    background-color: red;

  }

</style>
