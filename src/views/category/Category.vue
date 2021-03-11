<template>
<div class="wrapper">
    <ul class="content">
        <button @click="btnClick">按钮</button>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
        <li>fenlei</li>
    </ul>
</div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: "Category",
    data() {
        return {
            scroll: null
        }
    },
    created() {

    },
    mounted() {
        this.scroll = new BScroll('.wrapper', {
            probeType: 3,
            click: true,
            pullUpLoad: true
        })

        this.scroll.on("scroll", (position) => {
            // console.log(position)
        })

        this.scroll.on("pullingUp", () => {
            console.log("上拉加载更多")
        })
    },
    methods: {
        btnClick() {
            console.log("click")
        }
    }
}
</script>

<style scoped>
.wrapper{
    height: 150px;
    background-color: red;
    overflow: hidden;
    /* overflow-y: scroll; */
}
</style>