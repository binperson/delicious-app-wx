<template>
  <div class="goods-select">
    <div class="tab-wrapper">
      <nut-tabs
        v-model="goodsTabValue"
        title-scroll
        direction="vertical"
        class="goods-tab"
      >
        <nut-tab-pane v-for="item in list" :title="item.name">
          <div class="foods-wrapper">
            <scroll-view style="height: 100%" :scroll-y="true">
              <ul>
                <li v-for="food in item.foods" class="food-item">
                  <div class="icon">
                    <img width="57px" height="57px" :src="food.avatar" />
                  </div>
                  <div class="content">
                    <h2 class="name">{{ food.name }}</h2>
                    <p class="desc">{{ food.description }}</p>
                    <!-- <div class="extra">
                              <span class="count"
                                >月售{{ food.sellCount }}份</span
                              ><span>好评率{{ food.rating }}%</span>
                            </div> -->
                    <div class="price">
                      <span class="now">￥{{ food.price }}</span>
                      <span class="old" v-show="food.originPrice"
                        >￥{{ food.originPrice }}</span
                      >
                    </div>
                    <div class="cart-control-wrapper">
                      <CartControl
                        @add="onAdd"
                        @decrease="onDecrease"
                        :food="food"
                      ></CartControl>
                    </div>
                  </div>
                </li>
              </ul>
            </scroll-view>
          </div>
        </nut-tab-pane>
      </nut-tabs>
    </div>
    <div class="shop-cart-wrapper">
      <!-- <ShopCart
        :selectFoods="selectFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        @pay="pay"
        @showBottom="handleShowBottom"
        /> -->
    </div>
  </div>
</template>
<script>
import { ref, computed } from "vue";
import CartControl from "../CartControl/index.vue";
export default {
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  setup() {
    return {
      goodsTabValue: ref("0"),
    };
  },
};
</script>
<style lang="less">
.goods-select {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .tab-wrapper {
    flex: 1;
    min-height: 100%;
  }

  .shop-cart-wrapper {
    width: 100%;
    position: relative;
    z-index: 20000;
  }
}
</style>
