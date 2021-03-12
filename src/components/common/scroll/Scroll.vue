<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (pos) => {
        this.$emit("scroll", pos);
      });
    }

    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("到底部了");
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      console.log("refresh");
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
        return this.scroll ? this.scroll.y : 0
    }
  },
};
</script>

<style scoped>
</style>