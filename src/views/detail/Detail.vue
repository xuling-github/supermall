<template>
     <div id="detail">
       <detail-nav-bar class="detail-nav" @titleClick="titleClick"
                       ref="nav"/>
       <scroll class="content" ref="scroll"
               :probe-type="3"
               @condentScroll="condentScroll">
<!--         父子通信时传入属性时驼峰最好在父组件用-链接，不然可能解析错误,但是传入事件的时候可以直接用驼峰-->
         <detail-swiper :top-images="topImages"/>
         <detail-base-info :goods="goods"/>
         <detail-shop-info :shop="shop"/>
         <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
         <detail-param-info :param-info="paramInfo" ref="params" />
         <detail-comment-info :comment-info="commentInfo" ref="comments"/>
         <goods-list :goods="recommends" ref="recommends"/>
       </scroll>
<!--       使用mixin混入-->
       <back-top @click.native="backClick" v-show="isShowBackTop"/>
       <detail-bottom-bar @addToCart="addToCart"/>
     </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';

  import Scroll from "../../components/common/scroll/Scroll";

  import {mapActions} from 'vuex';
  //跟home页共用good因为商品推荐也是goods信息
  //导入minxin（混入）
  import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import {getDetail,getRecommend, Goods, Shop, GoodsParam } from 'network/detail.js'
  import {debounce} from "../../common/utils";
  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailShopInfo,
      DetailBottomBar,
    },
    data(){
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopYs: null,
        currentIndex: 0,

      }
    },
    created() {
      //组件创建完成之后通过路由拿到iid并保存
      this.iid = this.$route.params.iid
      // 2.请求数据
      getDetail(this.iid).then(res => {
        console.log(res);
        //1.获取顶部轮播数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //2.获取商品基本信息
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //3.获取店铺基本信息
        this.shop = new Shop(data.shopInfo)
        //4.获取商品详情信息
        this.detailInfo = data.detailInfo
        //5.获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.获取评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]

        }
        //给移动到对应标题操作增加防抖
        this.getThemeTopYs = debounce(() => {
          this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)

        //增加一个数字最大值，给后面做滚动位置判断提供更优的代码方案基础
        this.themeTopYs.push(Number.MAX_VALUE)

        //console.log(this.themeTopYs)
        },500)
        this.$bus.$on('imageLoad',() => {
          this.imageLoad()
          })

      })
      //3.请求商品推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    },
    mixins:[itemListenerMixin, backTopMixin],
    destroyed() {
      this.$bus.$off('itemImageLoad', this.imageListener)
    },
    methods: {
      imageLoad(){

        this.newRefresh()
        this.getThemeTopYs()
      },
      //监听子组件nav-bar的点击事件
      titleClick(index){
        //console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      condentScroll(position){
        // 1.监听backTop
        // console.log(position);
        //positon.y为负值，去负值变成整数，当position.y>1000的时候isShowBackTop为true
        this.isShowBackTop = (-position.y) > 1000
        //2.监听nav-bar
        //监听页面滚动的位置
        // [0, 2922, 3767, 4057,Number.Max]
        // 当滚动的位置在0和2922之间时 index=0
        // 当滚动的位置在=2922和3767之间时 index=1
        // 当滚动的位置在3767和4057之间时 index=2
        // 当滚动的位置在=4057和最大值之间时 index=3
        // console.log(position);
        let positionY = -position.y
        let length = this.themeTopYs.length
        for(let i = 0; i < length-1; i++){
          if(this.currentIndex !== i && (positionY>=this.themeTopYs[i]&&
            positionY<this.themeTopYs[i+1])){
            this.currentIndex = i
            //console.log(this.currentIndex);
            //拿到detailNavBar中的cunrrentIndex，赋值给他
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      },
      ...mapActions(['addCart']),
      addToCart(){
        //获取购物车需要的值
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        this.addCart(product).then(res => {
          //console.log(res);
          this.$toast.show(res,1500)
          //console.log(this.$toast);
        })

        // this.$store.dispatch('addCart', product).then(res => {
        //   console.log(res);
        // })
      }
    }

  }
</script>

<style scoped>
  /*覆盖tabbar*/
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    /*尽量用相对定位，他会保持他原来的位置，用于微调*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px - 49px);
  }
</style>
