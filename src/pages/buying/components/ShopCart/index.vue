<template>
  <div class="shop-cart">
    <div class="content">
      <div class="content-left" :style="style">
        <div class="logo-wrapper">
          <div
            class="logo"
            @click="showBottom"
            :class="{ highlight: totalCount > 0 }"
          >
            <!-- <i
              class="icon-shopping_cart"
              :class="{ highlight: totalCount > 0 }"
            ></i> -->
            <IconFont
              v-if="totalCount > 0"
              name="iconfont iconfont icon-shoppingcart-highlight"
              color="#fff"
              size="24"
            ></IconFont>
            <IconFont
              v-else
              name="iconfont iconfont icon-shoppingcart"
              color="#fff"
              size="24"
            ></IconFont>
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
        <div class="pay" :style="style" :class="payClass">{{ payDesc }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import Bubble from "../Bubble";
import { IconFont } from "@nutui/icons-vue-taro";
import { groupPurchaseStore } from "@/store/modules/groupPurchase.js";
import { storeToRefs } from "pinia";
import { multiply, add } from "@/utils/math";
import Taro from "@tarojs/taro";
const groupPurchase = groupPurchaseStore();
export default {
  name: "ShopCart",
  components: { Bubble, IconFont },
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
      return count;
    });
    const totalPrice = computed(() => {
      let total = 0;
      props.selectFoods.forEach((food) => {
        total = add(total, multiply(food.price, food.count));
      });
      return total;
    });
    const payDesc = computed(() => {
      if (totalPrice.value === 0) {
        return `￥${currentGroupPurchase.value.minDeliveryPrice}元起送`;
      } else if (
        totalPrice.value < currentGroupPurchase.value.minDeliveryPrice
      ) {
        let diff =
          currentGroupPurchase.value.minDeliveryPrice - totalPrice.value;
        return `还差￥${diff}元起送`;
      } else {
        return "去结算";
      }
    });

    const payClass = computed(() => {
      if (
        !totalCount.value ||
        totalPrice.value < currentGroupPurchase.value.minDeliveryPrice
      ) {
        return "not-enough";
      } else {
        return "enough";
      }
    });
    const pay = () => {
      if (payClass.value === "enough") {
        emit("pay");
      }
    };
    const showBottom = () => {
      emit("showBottom");
    };

    const { currentGroupPurchase } = storeToRefs(groupPurchase);

    const safeInsetBottom = Taro.getStorageSync("safeInsetBottom");
    const height = 36 + safeInsetBottom > 48 ? 36 : 48;
    const style = {
      paddingBottom: Taro.pxTransform(safeInsetBottom),
      height: Taro.pxTransform(height),
    };
    return {
      payDesc,
      totalCount,
      payClass,
      totalPrice,
      pay,
      showBottom,
      currentGroupPurchase,
      style,
    };
  },
};
</script>

<style lang="less">
.shop-cart {
  .content {
    display: flex;
    background: #07111b;
    font-size: 0;
    color: #999;

    .content-left {
      flex: 1;
      height: 36px;
      box-sizing: content-box;
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);

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

        .nutui-iconfont {
          font-family: "iconfont" !important;
        }

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
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-weight: 700;
        font-size: 12px;
        box-sizing: content-box;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);

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
