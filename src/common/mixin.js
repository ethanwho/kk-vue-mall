import {debounce} from './utils'

export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null
        }
    },
    components: {
    },
    methods: {
    },
    mounted() {
        const refresh = debounce(this.$refs.scroll.refresh, 50)
        this.itemImgListener = () => {
            refresh()
        }
        this.$bus.$on('itemImgLoad', this.itemImgListener)
        // console.log("我是混入中的内容")
    }
}