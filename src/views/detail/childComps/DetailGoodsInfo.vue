<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :src="item" alt="" @load="imageLoad">
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    data(){
		  return {
		    counter: 0,
        imageLength: 0,
      }
    },
    props: {
      detailInfo: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
		  imageLoad(){
        this.$emit('imageLoad')
		    // // ++语法是加1操作，加完之后再做===比较操作
		    // // 判断，所有的图片都加载完了，那么进行一次回调就可以了，不需要重复监测imgLoad
		    // if(++this.counter === this.imageLength){
        //
        //   this.$emit('detailImageLoad')
        // }
      }
    },
    // watch:{
		//   //watch监听某个属性的变化，一旦变化了就把最新的长度传给this.imageLength，那么只需要后去一次就可以了
		//   detailInfo(){
		//     this.imageLength = this.detailInfo.detailImage[0].list.length
    //   }
    // }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
