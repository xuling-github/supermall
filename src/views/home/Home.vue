<template>
<!--    id表示唯一的，只有一个的用id，会有很多的用class-->
<!--  首页只有中间有内容，这里直接替换具名插槽middle-->
  <div id="home">
    <nav-bar class="home-nav"><div slot="middle">购物街</div></nav-bar>
<!--    /在使用BScroll之后可以直接复制一份在这里-->
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabCountrol1"
                 class="tab-control"
                 v-show="isTabFixed"/>

<!--    因为子组件props是probeType驼峰类型，所以这里用斜杠链接，-->
<!--    因为子组件要的是number类型，所以要加上：才能正确传递-->
<!--    不加的话他自会被当作字符串传递-->
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @condentScroll="condentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
                   @swiperImageLoad="swiperImageLoad"/>
      <recommand-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabCountrol2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
<!--    // .native修饰符可以监听到组件的原生事件-->
<!--    // v-show属性用于元素的显示或隐藏为true显示，为false，隐藏-->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  //导入公共组件
  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backtop/BackTop";

  //导入子组件
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommandView from "./childComps/RecommandView";
  import FeatureView from "./childComps/FeatureView";
  import GoodsList from "../../components/content/goods/GoodsList";

  //导入axios
  import {getHomeMultidata,getHomeGoods} from "../../network/home";
  //导入minxin（混入）
  import {itemListenerMixin} from 'common/mixin.js'


  export default {
    name: "Home",
    data(){
      // 及时存储网络请求过来的数据
      // 因为函数调用会临时存储压入函数栈的数据，一旦调用完成这些数据会被弹出函数栈并且销毁
      // 所以我们要在这里创建一个变量及时的保存数据
      return {
        // result: null
        banners: [],
        recommends: [],
        // 设计商品信息数据结构
        goods: {
          "pop": {page:0,list: []},
          "new": {page:0,list: []},
          "sell": {page:0,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false, //默认不显示
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,


      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destoyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.scroll.refresh()

    },
    mixins:[itemListenerMixin],
    deactivated() {
      // 在离开home之前获取当前位置状态
      this.saveY = this.$refs.scroll.getScrollY()
      //在离开home的之前取消监听图片加载时间
      this.$bus.$off('itemImageLoad', this.imageListener)
    },
    components: {
      NavBar,
      TabControl,
      Scroll,
      BackTop,
      HomeSwiper,
      RecommandView,
      FeatureView,
      GoodsList


    },
    // 什么时候发送网络请求呢？
    // 在组建创建完成之后发送，使用生命周期函数create
    created() {
      //1.请求多个数据,在这里调用methods里面的方法，created函数只写肩带哦的逻辑
      this.getHomeMultidata();
      //2.请求商品信息
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    methods: {
      /**
       * 事件监听相关方法
       */
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //保证点击的两个tabcontrol为同一个index
        if(this.$refs.tabCountrol1 !== undefined){
          this.$refs.tabCountrol1.currentIndex = index
          this.$refs.tabCountrol2.currentIndex = index
        }

      },
      backClick(){
        // 通过给scroll组件增加ref属性，我们可以在这里通过this.$refs.refname拿到这个组件对象
        // 这个组件对象的数据里面有scroll变量通过.的方式就可以拿到，而这个scroll又是存储BScroll的实例的
        // 所以他又有scrollTo(x,y,延迟)延迟500毫秒后滚动到(0,0)的位置
        // 但是这个样的代码不容易理解，
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        // 我们可以在scroll组件中封装一个方法scrollTo方法，
        // 因为封装了就可以在拿到组件后直接调用方法
        this.$refs.scroll.scrollTo(0,0,500)

      },
      condentScroll(position){
        // 1.监听backTop
        // console.log(position);
        //positon.y为负值，去负值变成整数，当position.y>1000的时候isShowBackTop为true
        this.isShowBackTop = (-position.y) > 1000

        // 2.监听tabTop
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        this.tabOffsetTop = this.$refs.tabCountrol2.$el.offsetTop;
      },


      /**
       * 网络请求相关方法
       */
      //1.请求多个数据
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          // 使用箭头函数一定要注意this的时候，这里的this指向create，
          // 而create表示当前组件，他是有this的，所以这里可以直接使用this
          // this.result = res
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
      })
      },
      //2.请求首页商品数据
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        // page不应该写死数据应该根据上一次请求的数据中的page+1，当前默认为0，所以这次请求就是第一页了
        getHomeGoods(type,page).then(res => {
          // console.log(page);
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //每次下拉加载完成之后要想下一次能继续加载，这里必须使用finishPullUp方法
          this.$refs.scroll.finishPullUp()
      })
      }
    },

  }
</script>

<style scoped>
  #home{
    /*防止导航栏下面的内容被覆盖，在使用better-scroll之后就不需要*/
    /*padding-top:44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    /*!*!*固定导航栏 防止向下滑动时被覆盖*! 在增加了better-scroll之后这就不需要固定了*!*/
    /*!*因为better-scroll已经把页面分成三个块了，顶部和底部已经相当于固定了*!*/
    /*position: fixed;*/
    /*top:0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*z-index: 9;*/
  }
  /*.tab-control{*/
  /*  !*当tab-control向上滚动到一定的地方固定住，向下滚动到一个地方效果消失*!*/
  /*  !*这个属性一般移动端都可以用但是web端可能不兼容， *!*/
  /*  !* 当我们这个tabcontrol到达44的位置position会自动变成fixed，其他时候时sticky*!*/
  /*  position: sticky;*/
  /*  !*在高度为44px的地方停留（导航栏的下方）*!*/
  /*  top:44px*/
  /*}*/
  .content{
    /*height:300px;*/
    overflow: hidden;
    position: absolute;
    /*导航栏高度*/
    top:44px;
    /*tab-bar高度*/
    bottom: 49px;
    left: 0;
    right: 0;

  }
  .tab-control{
    /*设置相对位置才可以对z-index起效果*/
    position: relative;
    z-index: 9;
  }

</style>


