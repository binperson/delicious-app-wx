<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{ highlight: totalCount > 0 }">
            <!-- <i
              class="icon-shopping_cart"
              :class="{ highlight: totalCount > 0 }"
            ></i> -->
            <nut-icon
              v-if="totalCount > 0"
              name="iconfont iconfont icon-shoppingcart-highlight"
              color="#fff"
              size="24"
            ></nut-icon>
            <nut-icon
              v-else
              name="iconfont iconfont icon-shoppingcart"
              color="#fff"
              size="24"
            ></nut-icon>
          </div>
          <div class="num" v-show="totalCount > 0">
            <Bubble :num="totalCount"></Bubble>
          </div>
        </div>
        <div class="price" :class="{ highlight: totalPrice > 0 }">
          ￥{{ totalPrice }}
        </div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right" @click="pay">
        <div class="pay" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import Bubble from "../Bubble";
export default {
  name: "ShopCart",
  components: { Bubble },
  props: {
    minPrice: {
      type: Number,
      default: 0,
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      },
    },
    deliveryPrice: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const totalCount = computed(() => {
      let count = 0;
      props.selectFoods.forEach((food) => {
        count += food.count;
      });
      console.log(123, count);
      return count;
    });
    const totalPrice = computed(() => {
      let total = 0;
      props.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    });
    const payDesc = computed(() => {
      console.log("totalPrice.value", totalPrice.value);
      console.log("props.minPrice", props.minPrice);
      if (totalPrice.value === 0) {
        return `￥${props.minPrice}元起送`;
      } else if (totalPrice.value < props.minPrice) {
        let diff = props.minPrice - totalPrice.value;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    });

    const payClass = computed(() => {
      if (!totalCount.value || totalPrice.value < props.minPrice) {
        return "not-enough";
      } else {
        console.log("---2");
        return "enough";
      }
    });
    const pay = () => {
      console.log("payClass", payClass)
      if (payClass.value === 'enough') {
        emit('pay');
      }
    };
    return {
      payDesc,
      totalCount,
      payClass,
      totalPrice,
      pay,
    };
  },
};
</script>

<style lang="less">
.shop-cart {
  height: 100%;

  .content {
    display: flex;
    background: #07111b;
    font-size: 0;
    color: #999;

    .content-left {
      flex: 1;

      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #07111b;

        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #333;

          &.highlight {
            background: #fc725b;
          }

          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #999;

            &.highlight {
              background: #fff;
            }
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-weight: 700;
        font-size: 16px;

        &.highlight {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }

    .content-right {
      flex: 0 0 105px;
      width: 105px;

      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-weight: 700;
        font-size: 12px;

        &.not-enough {
          background: #333;
        }

        &.enough {
          background: #fc725b;
          color: #fff;
        }
      }
    }
  }
}
</style>
