<template>
    <div class="recommand">
      <div v-for="item in recommends" class="recommand-item">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
        <div>{{item.title}}</div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "RecommandView",
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .recommand{
   /*水平布局*/
   display: flex;
   width: 100%;
   text-align: center;
   font-size: 14px;
   padding: 8px 0 15px;
   border-bottom: 8px solid #eee;
 }
  .recommand-item{
    flex:1
  }
  .recommand-item img{
    width: 70px;
    height: 70px;
  }

</style>
