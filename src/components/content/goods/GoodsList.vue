<template>
    <div class="goods">
        <goods-list-item v-for="item in goods" :key="item" :goodsItem="item" class="item"/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
    name: "GoodsList",
    components: {
        GoodsListItem
    },
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

/* .goods .item{
    width: 48%;
} */
</style>