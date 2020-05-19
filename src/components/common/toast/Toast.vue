<template>
    <div class="toast" v-show="isShow">
      <div>{{message}}</div>
    </div>
</template>

<script>
  export default {
    name: "Toast",
    data(){
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message,duration){
        this.message = message
        this.isShow = true

        //设置提示文字消失时间
        setTimeout(() => {
          this.message = ''
          this.isShow = false
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 10px 10px;
    /*移动到总体的中间*/
    transform: translate(-50%,-50%);
    color: #fff;

    background-color: rgba(0,0,0,.75);
    z-index: 999;
  }
</style>
