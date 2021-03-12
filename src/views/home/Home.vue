<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control ref="tabControl1"
        :titles="['流行', '新款', '精选']" 
        @tabClick="tabClick"
        class="tab-control"
        v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" 
        :probe-type="3" 
        @scroll="contentScroll" 
        :pull-up-load="true"
        @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends" />
        <feature-view />
        <tab-control ref="tabControl2"
            :titles="['流行', '新款', '精选']" 
            @tabClick="tabClick"/>
        <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from "network/home"
import {debounce} from 'common/utils'

export default {
    name: "Home",
    components: {
        HomeSwiper,
        RecommendView,
        FeatureView,
        NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop
    },
    data(){
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0, list: []},
                'new': {page: 0, list: []},
                'sell': {page: 0, list: []}
            },
            currentType: 'pop',
            isShowBackTop: false,
            tabOffsetTop: 0,
            isTabFixed: false,
            saveY: 0
        }
    },
    computed: {
        showGoods() {
            return this.goods[this.currentType].list
        }
    },
    created() {
        this.getHomeMultidata()

        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)    //refresh有闭包
        this.$bus.$on('itemImageLoad', ()=>{
            // console.log("refresh")
            // this.$refs.scroll.refresh()

            refresh()
        })
    },
    destroyed() {
        console.log("home destryed")
    },
    activated() {
        this.$refs.scroll.scrollTo(0, this.saveY, 0)
        this.$refs.scroll.refresh()
    },
    deactivated() {
        this.saveY = this.$refs.scroll.getScrollY()
    },
    methods: {
        // 事件监听相关的方法
        tabClick(index) {
            switch(index) {
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
            this.$refs.tabControl1.currentIndex = index
            this.$refs.tabControl2.currentIndex = index
        },
        backClick(){
            this.$refs.scroll.scrollTo(0, 0)
        },
        contentScroll(pos) {
            //1.判断BackTop是否显示
            this.isShowBackTop = pos.y < -1000

            //2.决定tabControl是否吸顶(position: fixed)
            this.isTabFixed = pos.y < -this.tabOffsetTop
        },
        loadMore() {
            this.getHomeGoods(this.currentType)
        },
        //所有组件都有一个属性$el, 用于获取组件中的元素
        swiperImageLoad() {
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
        },

        // 网络请求相关的方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
                this.banners = res.data.banner.list
                this.recommends = res.data.recommend.list
            })
        },
        getHomeGoods(type) {
            const page = this.goods[type].page + 1
            getHomeGoods(type, page).then(res => {
                this.goods[type].list.push(...res.data.list) //其实用concat()也可以
                this.goods[type].page += 1

                this.$refs.scroll.finishPullUp()
            })
        }
    }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;   //用了better-scroll后，顶部导航条也不需要固定定位了(因为bs本来就只在中间区域滚动，导航条本来不会随着滚动)
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* (之前的).tab-control {
  position: sticky;     //用了better-scroll 之后，粘滞定位失效了
  top: 44px;
  z-index: 9;
} */

/* .fixed{
    position: fixed;    //better-scroll底层原理和固定定位冲突
    left: 0;
    right: 0;
    top: 44px;
} */

.tab-control{
    position: relative;
    z-index: 9;
}

.content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}

/* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; 
} */
</style>