<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="good-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    computed: {
      //因为home页和详情的推荐用的都市goods组件，
      //但是可能有些服务器中他们属性不一致所以这里写一个计算属性取或运算
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad(){
        // 发射图片加载完成事件
        this.$bus.$emit('itemImageLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
 .goods-item{
   padding-bottom: 40px;
   position: relative;
   width: 48%
 }
  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }
  .good-info{
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }
  .good-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .good-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .good-info .collect{
    position: relative;
  }
  .good-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url(../../../assets/img/common/collect.svg) 0 0/14px 14px;
  }
</style>
