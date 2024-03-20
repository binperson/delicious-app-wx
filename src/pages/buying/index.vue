<template>
  <div class="t-buying t-container">
    <VHeader></VHeader>
    <div class="buying-content">
      <nut-tabs class="buying-tab" v-model="tabValue" type="smile">
        <nut-tab-pane title="商品">
          <GoodsSelect :list="list" />
        </nut-tab-pane>
        <nut-tab-pane title="商家">
          <div class="business-wrap">
            <div class="business-content">
              <div class="business-item">
                <div class="title">大竹林烤鱼干锅家常菜</div>
                <div class="desc">周一至周日10:00-22:00</div>
                <div class="desc">商家合作电话：19923199509</div>
              </div>
              <div class="business-item">
                <div class="title">商家承诺</div>
                <div class="promise">
                  <div class="promise-item">食品安全</div>
                  <div class="promise-item">亮证经营</div>
                  <div class="promise-item">食无忧保障</div>
                </div>
              </div>
              <nut-cell is-link>
                <template v-slot>
                  <div class="shop-wrap">
                    <div class="shop-title">
                      <IconFont name="location" color="#666"></IconFont
                      >{{ `${shopInfo.name}` }}
                      <!-- {{ `/ 距离您${shopInfo.distance}km` }} -->
                    </div>
                    <div class="shop-desc">
                      {{ `${shopInfo.address}` }}
                    </div>
                  </div>
                </template>
              </nut-cell>
            </div>
          </div>
        </nut-tab-pane>
      </nut-tabs>
    </div>
    <div v-if="tabValue === '0'" class="shop-cart-wrapper">
      <ShopCart
        :selectFoods="selectFoods"
        :deliveryPrice="seller.deliveryPrice"
        :minPrice="seller.minPrice"
        @pay="pay"
        @showBottom="handleShowBottom"
      />
    </div>
  </div>
  <nut-popup
    class="shop-cart-list"
    position="bottom"
    v-model:visible="showBottom"
  >
    <div>
      <div class="list-header">
        <div class="title">购物车</div>
        <span class="empty" @click="empty">清空</span>
      </div>
      <scroll-view class="list-content" ref="listContent">
        <div>
          <div class="food" v-for="(food, index) in selectFoods" :key="index">
            <span class="name">{{ food.name }}</span>
            <div class="price">
              <span>￥{{ food.price * food.count }}</span>
            </div>
            <div class="cart-control-wrapper">
              <CartControl
                @add="onAdd"
                @decrease="onDecrease"
                :food="food"
              ></CartControl>
              <!-- <cart-control @add="onAdd" :food="food"></cart-control> -->
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
  </nut-popup>
</template>

<script>
import CartControl from "./components/CartControl/index.vue";
import GoodsSelect from '@/components/GoodsSelect/index.vue'
import VHeader from "./components/VHeader/index.vue";
import ShopCart from "./components/ShopCart/index.vue";
import { ref, computed } from "vue";
import { groupPurchaseStore } from "@/store/modules/groupPurchase.js";
import { getFoodGroupListByPage, getFoodListByPage } from "@/api/sell";
const groupPurchase = groupPurchaseStore();
import { storeToRefs } from "pinia";
import moment from "moment";
import { getCart, addCartItem, removeCartItem } from "@/api/cart";
import { goUrl } from "@/utils/index";
import { confirmOrder } from "@/api/cart";
import Taro from "@tarojs/taro";
export default {
  name: "Buying",
  components: {
    VHeader,
    CartControl,
    ShopCart,
    GoodsSelect
  },
  setup() {
    const instance = Taro.getCurrentInstance();
    const state = instance.router.params.state;
    if (!state) {
      groupPurchase.updateCurrentGroupPurchase({});
    }
    const showBottom = ref(false);

    groupPurchase.getGroupPurchaseDetail();

    const onAdd = (data) => {
      addCartItem(data);
    };

    const onDecrease = (data) => {
      removeCartItem(data);
    };

    const seller = {
      minPrice: 20,
      deliveryPrice: 0,
    };

    const list = ref([]);

    const getFoodList = (data) => {
      getFoodGroupListByPage().then((res) => {
        list.value = res.result || [];
        list.value?.forEach((item) => {
          getFoodListByPage({
            categoryId: item.categoryId,
            pageNo: 1,
            pageSize: 100,
          }).then((it) => {
            it.result.records.forEach((i) => {
              const cartItem = data.find((tt) => tt.skuId === i.skuId);
              if (cartItem) {
                i.count = cartItem.count;
              }
              i.album = JSON.parse(i.album);
              i.picUrl = JSON.parse(i.picUrl);
              i.avatar = DELI_BASE_URL_FILE + i.picUrl[0];
              i.endTime = moment(i.endTime).valueOf();
              i.startTime = moment(i.startTime).valueOf();
            });
            const t = list.value.findIndex(
              (t) => t.categoryId === item.categoryId
            );
            if (t > -1) {
              list.value[t].foods = it.result.records;
            }
          });
        });
      });
    };

    const getCartInfo = () => {
      getCart().then((res) => {
        getFoodList(res.result || []);
      });
    };

    getCartInfo();

    const selectFoods = computed(() => {
      let foods = [];
      list.value?.forEach((good) => {
        good.foods?.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    });

    const { currentGroupPurchase } = storeToRefs(groupPurchase);

    const pay = () => {
      confirmOrder().then((res) => {});
      // addCartItem()
      goUrl("/pages/pay/index");
    };
    const handleShowBottom = () => {
      showBottom.value = true;
    };

    const empty = () => {};
    const shopInfo = {
      name: "大竹林烤鱼干锅家常菜",
      distance: "16",
      address: "恒山东路7号附851号(互联网产业园3期对面)",
    };
    return {
      tabValue: ref("0"),
      goodsTabValue: ref("0"),
      list,
      onAdd,
      seller,
      selectFoods,
      currentGroupPurchase,
      pay,
      onDecrease,
      handleShowBottom,
      showBottom,
      empty,
      shopInfo,
    };
  },
};
</script>

<style lang="less">
@import "@/style/global.less";
.t-buying {
  position: relative;
  display: flex;
  flex-direction: column;

  // .nutui-iconfont {
  //   font-family: "iconfont" !important;
  // }

  .buying-content {
    flex: 1;
    overflow: hidden;

    .buying-tab {
      height: 100%;
      width: 100%;

      .nut-tab-pane {
        position: relative;
        padding: 0;
      }

      .nut-tabs__content {
        flex: 1;
      }
    }

    .goods-tab {
      height: 100%;
      overflow: hidden;

      .foods-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;

        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          position: relative;

          &:last-child {
            border: none;
            margin-bottom: 0;
          }

          .icon {
            flex: 0 0 57px;
            margin-right: 10px;
            img {
              height: auto;
            }
          }

          .content {
            flex: 1;

            .name {
              margin: 2px 0 8px 0;
              // height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: #333;
            }
            .desc,
            .extra {
              line-height: 10px;
              font-size: 10px;
              color: #999;
            }

            .desc {
              line-height: 12px;
              margin-bottom: 8px;
            }

            .extra {
              .count {
                margin-right: 12px;
              }
            }

            .price {
              font-weight: 700;
              line-height: 24px;

              .now {
                margin-right: 8px;
                font-size: 14px;
                color: #f01414;
              }

              .old {
                text-decoration: line-through;
                font-size: 10px;
                color: #999;
              }
            }
          }

          .cart-control-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }

  .shop-cart-wrapper {
    width: 100%;
    position: relative;
    z-index: 20000;
  }
}

.shop-cart-list {
  .nut-popup {
    bottom: 48px;
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: #f3f5f7;

    .title {
      float: left;
      font-size: 14px;
      color: #333;
    }

    .empty {
      float: right;
      font-size: 12px;
      color: #fc725b;
    }
  }

  .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;

    .food {
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;

      .name {
        line-height: 24px;
        font-size: 14px;
        color: #333;
      }

      .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-weight: 700;
        font-size: 14px;
        color: #f01414;
      }

      .cart-control-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }
}

.business-wrap {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding: 0 12px;

  .business-content {
    .business-item {
      padding: 12px 12px;
      background: #fff;
      margin-bottom: 12px;
      border-radius: 6px;

      &:first-child {
        background-image: linear-gradient(#f5f5f5, #fff);
      }

      .desc {
        color: #444;
        font-size: 14px;
        margin-top: 3px;
      }

      .promise {
        display: flex;
        margin-top: 3px;

        .promise-item {
          color: #444;
          font-size: 14px;
        }
      }
    }
  }
}

.shop-wrap {
  display: flex;
  flex-direction: column;
  color: #000;

  .shop-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    line-height: 20px;

    /deep/.nut-icon {
      position: relative;
      top: 5px;
    }
  }

  .shop-desc {
    font-size: 14px;
    color: #444;
    line-height: 24px;
  }
}
</style>
