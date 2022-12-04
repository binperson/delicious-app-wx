<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count > 0" @click.stop="decrease">
        <span class="inner iconfont iconfont icon-decrease"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add iconfont iconfont icon-add" @click.stop="add"></div>
  </div>
</template>

<script>
export default {
  name: "CartControl",
  props: {
    food: {
      type: Object,
    },
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        this.food.count = 1
      } else {
        this.food.count++;
      }
      console.log("this.food.count", this.food.count)
      this.$emit('add', this.food);
    },
    decrease() {
      if (this.food.count) {
        this.food.count--;
        this.$emit('decrease', this.food);
      }
    },
  },
};
</script>
<style lang="less">
.cart-control {
  display: flex;
  align-items: center;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;

    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: #fc725b;
      transition: all 0.4s linear;
      transform: rotate(0);
    }

    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
    }

    &.move-enter,
    &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-count {
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: #666;
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: #fc725b;
  }
}
</style>
