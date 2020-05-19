<template>
    <div class="goods-list">
      <goods-list-item v-for="item in goods" :goods-item="item"/>
    </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
.goods-list{
  display: flex;
  /*两个item为一行，首先每个item在那边得设置width 这边使用flex-wrap：包裹*/
  flex-wrap: wrap;
  /*/均等分，两边的距离的和为中间的距离*/
  justify-content: space-evenly;
}
</style>
