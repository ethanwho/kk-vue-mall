<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">合计：{{ totalPrice }}</div>

    <div class="calculate" @click="calcClick">去计算({{ checkedLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartList
          .filter((item) => item.checked)
          .reduce((prevalue, item) => prevalue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if(this.cartList.length == 0) return false
      return !this.cartList.some(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {  //全部选中
        this.cartList.forEach( item => item.checked = false)
      } else {  //全部未选中或者部分未选中
        this.cartList.forEach( item => item.checked = true)
      }
    },
    calcClick() {
      if(this.checkedLength == 0) {
        this.$toast.show('请选择购买的商品', 1500)
      }
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  font-size: 14px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>