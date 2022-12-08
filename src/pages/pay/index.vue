<template>
  <view class="t-pay t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar title="确认订单" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <scroll-view class="pay-content" :scroll-y="true">
          <nut-cell is-link>
            <template v-slot>
              <div class="shop-wrap">
                <div class="shop-title">
                  <nut-icon name="location" color="#666"></nut-icon
                  >{{ `${shopInfo.name} / 距离您${shopInfo.distance}km` }}
                </div>
                <div class="shop-desc">
                  {{ `${shopInfo.address}` }}
                </div>
              </div>
            </template>
          </nut-cell>
          <div class="pay-bar">
            <nut-divider dashed />
            <view class="address-box">
              <view @click="addAddress" class="show-address">
                <view class="l">
                  <view class="name-tel"
                    >{{ curAddressData.linkMan }} {{ curAddressData.mobile }}</view
                  >
                  <view class="addr-text">{{ curAddressData.address }}</view>
                </view>
                <view class="r">
                  <nut-icon name="right" />
                </view>
              </view>
            </view>
            <nut-cell
              title="送达时间"
              desc="请选择"
              is-link
              @click="startSelectTime"
            />
            <nut-divider dashed />
          </div>
          <!-- <div class="pay-bar">
            <nut-divider dashed />
            <view class="address-box">
              <view
                class="add-address"
                v-if="!curAddressData"
                @click="addAddress"
              >
                <nut-icon
                  name="iconfont iconfont icon-add"
                  color="#e64340"
                  size="48rpx"
                />
                <view>新增配送地址</view>
              </view>
              <view class="show-address" v-for="item in curAddressData">
                <view class="l" @click="selectAddress">
                  <view class="name-tel"
                    >{{ item.linkMan }} {{ item.mobile }}</view
                  >
                  <view class="addr-text">{{ item.address }}</view>
                </view>
                <view class="r">
                  <nut-icon name="right" />
                </view>
              </view>
            </view>
            <nut-cell
              title="送达时间"
              desc="请选择"
              is-link
              @click="startSelectTime"
            />
            <nut-divider dashed />
          </div> -->
          <view class="goods-title">商品明细</view>
          <nut-row v-for="item in cartInfo" :key="item.skuId" class="detail">
            <nut-col :span="18">
              <view class="detail-1">{{item.spuName}}</view>
            </nut-col>
            <nut-col :span="3">
              <view class="num">x{{item.count}}</view>
            </nut-col>
            <nut-col :span="3">
              <view class="price">¥{{item.price}}</view>
            </nut-col>
          </nut-row>
          <view class="amount">共计 {{ totalCount }} 件商品，小计：¥ {{ totalPrice }}</view>
          <nut-input
            class="remark"
            v-model="remark"
            label="备注"
            input-align="right"
            placeholder="如需备注请输入"
          />
        </scroll-view>
      </template>
      <template v-slot:footer>
        <div class="submit-bar__bar">
          <div class="submit-bar__text">
            <text>
              合计：
            </text>
            <nut-price :price="totalPrice" size="normal" :thousands="true" />
            <!-- <text class="submit-bar__price">
              <text class="submit-bar__currency">
                ¥
              </text>
              <text class="submit-bar__price-integer">
                0
              </text>
              <text>
                .00
              </text>
            </text> -->
          </div>
          <nut-button @click="handlePay" type="danger">立即支付</nut-button>
        </div>
      </template>
    </DeliView>
  </view>
  <nut-timeselect
    v-model:visible="visible"
    height="50%"
    :current-key="currentKey"
    :current-time="currentTime"
    title="送达时间"
    @select="handleSelected"
  >
    <template #pannel>
      <nut-timepannel
        name="2月23日(今天)"
        pannel-key="0"
        @change="handleChange"
      ></nut-timepannel>
      <nut-timepannel
        name="2月24日(星期三)"
        pannel-key="1"
        @change="handleChange"
      ></nut-timepannel>
    </template>
    <template #detail>
      <nut-timedetail :times="times1" @select="selectTime"></nut-timedetail>
    </template>
  </nut-timeselect>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import { back } from "@/utils/index";
import Taro from "@tarojs/taro";
import { groupPurchaseStore } from "@/store/modules/groupPurchase.js";
import { tribeStore } from "@/store/modules/tribe.js";
const groupPurchase = groupPurchaseStore();
const tribe = tribeStore();
import { storeToRefs } from "pinia";
import { getCart, confirmOrder, submitOrder, payOrder } from "@/api/cart";

export default {
  name: "SelectTribe",
  components: {
    DeliView,
    DeliNavbar,
  },
  setup() {
    const userInfo = Taro.getStorageSync("userInfo") || {};
    const { currentGroupPurchase } = storeToRefs(groupPurchase);
    const { currentTribe } = storeToRefs(tribe);
    console.log('currentGroupPurchase', currentGroupPurchase)
    const remark = ref("");
    const cartInfo = ref([])
    const state = reactive({
      visible: false,
      currentKey: 0,
      currentTime: [],
      times1: [
        {
          key: 0,
          list: ["9:00-10:00", "10:00-11:00", "11:00-12:00"],
        },
        {
          key: 1,
          list: ["9:00-10:00", "10:00-11:00"],
        },
      ],
    });

    const handleChange = (pannelKey) => {
      state.currentKey = pannelKey;
      state.currentTime = [];
      state.currentTime.push({
        key: state.currentKey,
        list: [],
      });
    };

    const startSelectTime = () => {
      state.visible = true;
    };

    const selectTime = (item) => {
      let curTimeIndex = state.currentTime[0]["list"].findIndex(
        (time) => time === item
      );
      if (curTimeIndex === -1) {
        state.currentTime[0]["list"].push(item);
      } else {
        state.currentTime[0]["list"].splice(curTimeIndex, 1);
      }
    };

    const handleSelected = (obj) => {
      console.log(123, obj);
    };

    const totalPrice = computed(() => {
      let total = 0;
      cartInfo?.value?.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    });

    const totalCount = computed(() => {
      let total = 0;
      cartInfo.value.forEach((food) => {
        total += food.count;
      });
      return total;
    });

    onMounted(() => {
      state.currentTime.push({
        key: state.currentKey,
        list: [],
      });
    });
    console.log('currentTribe', currentTribe)
    const curAddressData = ref({
      linkMan: '',
      mobile: userInfo.mobile,
      address: currentTribe.value.tribeName,
    });

    const addAddress = () => {
      wx.chooseAddress({
        success(res) {
          curAddressData.value = {
            ...curAddressData.value,
            linkMan: '',
            mobile: res.telNumber
            // address: `${res.provinceName}-${res.cityName}-${res.detailInfo}`,
          };
        },
      });
    };
    const selectAddress = () => {};
    const getCartInfo = () => {
      getCart().then(res => {
        console.log(121212, res.result)
        cartInfo.value = res.result
      })
    }
    getCartInfo()
    const handlePay = () => {
      confirmOrder().then(res => {
        console.log('confirmOrder', res)
        submitOrder({
          ...res.result,
          payAmount: totalPrice * 100,
          totalAmount: totalPrice * 100
        }).then(r => {
          console.log('submitOrder', r)
        })
      })
    }
    return {
      back,
      shopInfo: {
        name: "大竹林烤鱼干锅家常菜",
        distance: "16",
        address: "恒山东路177号",
      },
      curAddressData,
      selectAddress,
      addAddress,
      ...toRefs(state),
      handleChange,
      handleSelected,
      selectTime,
      startSelectTime,
      remark,
      totalCount,
      totalPrice,
      cartInfo,
      handlePay
    };
  },
};
</script>

<style lang="less">
.pay-content {
  flex: 1;
  overflow: hidden;
  background: #f2f3f5;

  .shop-wrap {
    display: flex;
    flex-direction: column;
    color: #666;

    .shop-title {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 20px;
    }

    .shop-desc {
      padding-left: 20px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .goods-title {
    font-size: 28rpx;
    font-weight: bold;
    background-color: #ffffff;
    padding: 32rpx;
  }

  .pay-bar {
    background-color: #ffffff;
    width: 100%;
  }

  .address-box {
    margin: 20rpx 0;

    .add-address {
      display: flex;
      align-items: center;
      padding-left: 24rpx;
      font-size: 28rpx;
      color: #000;
    }

    .show-address {
      padding: 0 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .name-tel {
        font-size: 28rpx;
        color: #000;
        padding: 30rpx 0 20rpx 0;
      }

      .addr-text {
        font-size: 24rpx;
        color: #888;
        padding-bottom: 34rpx;
        line-height: 36rpx;
      }

      .r {
        .nut-icon {
          color: #979797;
        }
      }
    }
  }

  .detail {
    background-color: #ffffff;
    padding: 8rpx 32rpx;

    .detail-1 {
      font-size: 28rpx;
    }

    .num {
      font-size: 28rpx;
      text-align: center;
    }

    .price {
      font-size: 28rpx;
      /* text-align: center; */
      text-align: right;
    }
  }

  .amount {
    text-align: right;
    padding-right: 32rpx;
    background-color: #ffffff;
    font-size: 28rpx;
    padding-bottom: 32rpx;
    padding-top: 32rpx;
  }
}

.nut-timedetail {
  padding: 0 10rpx 100rpx 20rpx;
}

.submit-bar__bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 16px;
  height: 50px;
  background: #fff;
  font-size: 14px;

  .submit-bar__text {
    flex: 1;
    text-align: right;
    color: #323233;
    padding-right: 12px;

    .submit-bar__price {
      color: #ee0a24;
      font-size: 12px;

      .submit-bar__price-integer {
        font-size: 20px;
        font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial,
          sans-serif;
      }
    }
  }

  .nut-button {
    height: 40px;
    border-radius: 20px;
  }
}

.remark {
  padding-left: 32rpx;

  input {
    text-align: right !important;
  }
}
</style>
