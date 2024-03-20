<template>
  <view class="t-pay t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar title="确认订单" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <!-- <nut-cell is-link>
          <template v-slot>
            <div class="shop-wrap">
              <div class="shop-title">
                <IconFont name="location" color="#666"></IconFont
                >{{ `${shopInfo.name}` }}
                {{ `/ 距离您${shopInfo.distance}km` }}
              </div>
              <div class="shop-desc">
                {{ `${shopInfo.address}` }}
              </div>
            </div>
          </template>
        </nut-cell> -->
        <nut-tabs class="pay-tab" v-model="tabValue" type="smile">
          <nut-tab-pane title="到店就吃" pane-key="2"></nut-tab-pane>
          <nut-tab-pane title="外卖配送" pane-key="1"></nut-tab-pane>
        </nut-tabs>
        <scroll-view class="pay-content" :scroll-y="true">
          <div class="pay-bar">
            <!-- <nut-divider dashed /> -->
            <view v-if="tabValue === '1'" class="address-box">
              <view @click="addAddress" class="show-address">
                <view class="l">
                  <view class="name-tel"
                    >{{ curAddressData.linkMan }}
                    {{ curAddressData.mobile }}</view
                  >
                  <view class="addr-text">{{ curAddressData.address }}</view>
                </view>
                <view class="r">
                  <IconFont name="right" />
                </view>
              </view>
            </view>
            <nut-cell
              :title="tabValue === '1' ? '送达时间' : '到店时间'"
              :desc="
                currentTime[0] && currentTime[0].list && currentTime[0].list[0]
                  ? currentTime[0].list[0]
                  : '请选择'
              "
              is-link
              @click="startSelectTime"
            />
            <nut-cell
              v-if="columns && columns.length > 0"
              title="优惠卷"
              :desc="
                couponSelectedOptions[0] && couponSelectedOptions[0].name
                  ? couponSelectedOptions[0].name
                  : '请选择'
              "
              is-link
              @click="pickerShow = true"
            />
            <nut-cell
              v-if="pointColumns.length > 0"
              title="积分"
              :desc="String(point)"
              is-link
              @click="pointShow = true"
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
                <IconFont
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
                  <IconFont name="right" />
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
          <nut-row class="detail">
            <nut-col :span="6">
              <view class="detail-1">商品</view>
            </nut-col>
            <nut-col :span="6">
              <view class="num">单价</view>
            </nut-col>
            <nut-col :span="6">
              <view class="num">包装费</view>
            </nut-col>
            <nut-col :span="3">
              <view class="num">数量</view>
            </nut-col>
            <nut-col :span="3">
              <view class="price">总计</view>
            </nut-col>
          </nut-row>
          <nut-row v-for="item in cartInfo" :key="item.skuId" class="detail">
            <nut-col :span="6">
              <view class="detail-1">{{ item.spuName }}</view>
            </nut-col>
            <nut-col :span="6">
              <view class="num"
                >{{ item.price }}*{{
                  currentGroupPurchase.discount * 0.1
                }}</view
              >
            </nut-col>
            <nut-col :span="6">
              <view class="num">{{
                item.packageAmt ? item.packageAmt : 0
              }}</view>
            </nut-col>
            <nut-col :span="3">
              <view class="num">x{{ item.count }}</view>
            </nut-col>
            <nut-col :span="3">
              <view class="price"
                >¥{{
                  multiply(
                    add(
                      multiply(
                        multiply(item.price, currentGroupPurchase.discount),
                        0.1
                      ),
                      item.packageAmt
                    ),
                    item.count
                  )
                }}</view
              >
            </nut-col>
          </nut-row>
          <view class="amount"
            >共计 {{ totalCount }} 件商品，{{
              currentGroupPurchase.discount
            }}折优惠, 总计：¥ {{ payPrice }}</view
          >
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
            <text> 合计： </text>
            <nut-price :price="payPrice" size="normal" :thousands="true" />
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
  <nut-time-select
    v-model:visible="visible"
    height="50%"
    :current-key="currentKey"
    :current-time="currentTime"
    title="送达时间"
    @select="handleSelected"
  >
    <template #pannel>
      <nut-time-pannel
        :name="getDeliveryTimeDay(currentGroupPurchase.deliveryTime[0])"
        pannel-key="0"
        @change="handleChange"
      ></nut-time-pannel>
    </template>
    <template #detail>
      <nut-time-detail :times="times" @select="selectTime"></nut-time-detail>
    </template>
  </nut-time-select>

  <nut-popup position="bottom" v-model:visible="pickerShow">
    <nut-picker
      v-model="popupValue"
      :columns="columns"
      title="请选择优惠卷"
      @confirm="popupConfirm"
      @cancel="pickerShow = false"
    >
    </nut-picker>
  </nut-popup>

  <nut-popup position="bottom" v-model:visible="pointShow">
    <nut-picker
      v-model="pointPopupValue"
      :columns="pointColumns"
      title="请选择积分"
      @confirm="pointPopupConfirm"
      @cancel="pointShow = false"
    >
    </nut-picker>
  </nut-popup>
</template>

<script>
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import { back, goUrl } from "@/utils/index";
import Taro from "@tarojs/taro";
import { groupPurchaseStore } from "@/store/modules/groupPurchase.js";
import { tribeStore } from "@/store/modules/tribe.js";
import { add, multiply, subtract, divide } from "@/utils/math";
const groupPurchase = groupPurchaseStore();
const tribe = tribeStore();
import { storeToRefs } from "pinia";
import { IconFont } from "@nutui/icons-vue-taro";
import { getCurrentMember } from "@/api/member";
import {
  getCart,
  confirmOrder,
  submitOrder,
  payOrder,
  deleteCart,
} from "@/api/cart";
import { orderPay } from "@/api/order";
import { getMemberCoupon } from "@/api/coupon";
import { subsectionTime, getGroupTime, formatDate } from "@/utils/date";
import debounce from "lodash.debounce";

export default {
  name: "SelectTribe",
  components: {
    IconFont,
    DeliView,
    DeliNavbar,
  },
  setup() {
    const userInfo = ref(Taro.getStorageSync("userInfo") || {});
    const point = ref(0);
    const pointShow = ref(false);
    const { currentGroupPurchase } = storeToRefs(groupPurchase);
    const { currentTribe } = storeToRefs(tribe);

    const timeObj = subsectionTime(currentGroupPurchase.value.deliveryTime, 12);
    const groupTime = getGroupTime(timeObj, 2);
    const pickerShow = ref(false);
    const columns = ref([]);
    const pointColumns = ref([]);
    const popupValue = ref();
    const pointPopupValue = ref();
    const couponSelectedOptions = ref([]); // 优惠卷选择
    const groupTimeArr = [];
    groupTime.forEach((item) => {
      groupTimeArr.push(item.join("-"));
    });
    const remark = ref("");
    const cartInfo = ref([]);
    const getCoupon = () => {
      getMemberCoupon({ smsCouponUse: {}, status: 0 }).then((res) => {
        res.result.forEach((item) => {
          item.text = item.name;
          item.value = item.id;
        });
        columns.value = res.result;
      });
    };
    getCoupon();
    const state = reactive({
      visible: false,
      currentKey: 0,
      currentTime: [],
      times: [
        {
          key: 0,
          list: groupTimeArr,
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
      state.currentTime[0]["list"] = [];
      let curTimeIndex = state.currentTime[0]["list"].findIndex(
        (time) => time === item
      );
      if (curTimeIndex === -1) {
        state.currentTime[0]["list"].push(item);
      }
      state.visible = false;
    };

    const handleSelected = (obj) => {};

    const payPrice = computed(() => {
      let total = 0;
      cartInfo?.value?.forEach((food) => {
        total = add(
          total,
          multiply(
            add(
              multiply(
                food.price,
                multiply(currentGroupPurchase.value.discount, 0.1)
              ),
              Number(food.packageAmt)
            ),
            food.count
          )
        );
      });
      if (couponSelectedOptions.value.length > 0) {
        couponSelectedOptions.value.forEach((item) => {
          total = subtract(total, item.faceValue);
        });
      }

      if (point.value > 0) {
        total = subtract(total, divide(point.value, 100));
      }
      return total;
    });

    const totalPrice = computed(() => {
      let total = 0;
      cartInfo?.value?.forEach((food) => {
        total = add(
          total,
          multiply(add(food.price, Number(food.packageAmt)), food.count)
        );
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
    const curAddressData = ref({
      linkMan: "",
      mobile: userInfo.value.mobile,
      address: currentTribe.value.tribeName,
    });

    const addAddress = () => {
      // wx.chooseAddress({
      //   success(res) {
      //     curAddressData.value = {
      //       ...curAddressData.value,
      //       linkMan: "",
      //       mobile: res.telNumber,
      //       // address: `${res.provinceName}-${res.cityName}-${res.detailInfo}`,
      //     };
      //   },
      // });
    };
    const selectAddress = () => {};
    const getCartInfo = () => {
      getCart().then((res) => {
        if (res) {
          cartInfo.value = res.result;
        }
      });
    };
    getCartInfo();
    const tabValue = ref("2");
    const handlePay = debounce(() => {
      if (!state.currentTime[0]?.list[0]) {
        Taro.showToast({
          title: `请选择${tabValue.value === "1" ? "送达时间" : "到店时间"}`,
          icon: "none",
        });
        return;
      }
      wx.showToast({
        title: "支付中",
        icon: "success",
        duration: 1000,
        mask: true,
      });
      confirmOrder().then((res) => {
        const option = {
          ...res.result,
          groupPurchaseId: currentGroupPurchase.value.groupPurchaseId,
          point: point.value,
          // couponSelectedOptions: couponSelectedOptions.value,
          deliveryAddress: currentTribe.value.tribeName,
          deliveryTime:
            formatDate(
              currentGroupPurchase.value.deliveryTime[0],
              "yyyy-MM-dd"
            ) +
            " " +
            state.currentTime[0]?.list[0],
          phone: curAddressData.value.mobile,
          payAmount: String(payPrice.value),
          totalAmount: String(totalPrice.value),
          deliveryType: tabValue.value,
          remark: remark.value,
        };
        if (couponSelectedOptions.value.length > 0) {
          option.couponUseId = couponSelectedOptions.value[0].couponUseId;
        }
        submitOrder(option).then((r) => {
          if (r.code !== 10000) {
            Taro.showToast({
              title: r.msg,
              icon: "loading",
            });
            // deleteCart().then(() => {
            //   getCartInfo()
            // })
            return;
          }
          orderPay({
            orderId: r.result.orderId,
            orderNo: r.result.orderNo,
            payType: 5,
          }).then((rt) => {
            wx.requestPayment({
              timeStamp: rt.result.timeStamp,
              nonceStr: rt.result.nonceStr,
              package: rt.result.packageVal,
              signType: rt.result.signType,
              paySign: rt.result.paySign,
              success: function (res) {
                deleteCart();
                // wx.requestSubscribeMessage({
                //   tmplIds: ["ws2Gu1d7gPWUUAZtjyjJr7dLOb4CK6VMAux2XzFaGvM"],
                //   success(r) {
                //     console.log("success", r);
                //   },
                //   fail(r) {
                //     console.log("fail", r);
                //   },
                //   complete(r) {
                //     console.log("complete", r);
                //   },
                // });
                goUrl("/pages/order/index?status=all");
              },
              fail: function (res) {},
              complete: function (res) {
                wx.hideToast();
              },
            });
          });
        });
      });
    }, 500);

    const isToday = (str) => {
      let d = new Date(str).setHours(0, 0, 0, 0);
      let today = new Date().setHours(0, 0, 0, 0);

      let obj = {
        "-86400000": "昨天",
        0: "今天",
        86400000: "明天",
      };

      return obj[d - today] || "";
    };
    const getDeliveryTimeDay = () => {
      const isTodayStr = isToday(currentGroupPurchase.value.deliveryTime[0]);
      if (!isTodayStr) {
        return `${formatDate(
          currentGroupPurchase.value.deliveryTime[0],
          "MM月dd日"
        )}`;
      }
      return `${formatDate(
        currentGroupPurchase.value.deliveryTime[0],
        "MM月dd日"
      )}(${isTodayStr})`;
    };
    const popupConfirm = ({ selectedValue, selectedOptions }) => {
      couponSelectedOptions.value = selectedOptions;
      pickerShow.value = false;
    };

    const pointPopupConfirm = ({ selectedValue, selectedOptions }) => {
      point.value = selectedValue[0];
      pointShow.value = false;
    };

    const handleGetCurrentMember = () => {
      getCurrentMember().then((res) => {
        userInfo.value = res.result;
        const total = userInfo.value.point / 100;
        for (let i = 0; i < total; i++) {
          pointColumns.value.push({
            text: (i + 1) * 100,
            value: (i + 1) * 100,
          });
        }
      });
    };
    handleGetCurrentMember();
    return {
      back,
      shopInfo: {
        name: "大竹林烤鱼干锅家常菜",
        distance: "16",
        address: "恒山东路7号附851号(互联网产业园3期对面)",
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
      payPrice,
      cartInfo,
      handlePay,
      formatDate,
      currentGroupPurchase,
      isToday,
      getDeliveryTimeDay,
      pickerShow,
      popupValue,
      columns,
      pointColumns,
      popupConfirm,
      couponSelectedOptions,
      userInfo,
      pointShow,
      pointPopupValue,
      pointPopupConfirm,
      point,
      add,
      multiply,
      tabValue,
    };
  },
};
</script>

<style lang="less">
.t-pay {
  .nut-tabs__content {
    display: none;
  }

  .pay-tab {
    margin-bottom: -10px;
  }
}

.shop-wrap {
  display: flex;
  flex-direction: column;
  color: #666;

  .shop-title {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;

    /deep/.nut-icon {
      position: relative;
      top: 5px;
    }
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
      .IconFont {
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
.pay-content {
  flex: 1;
  overflow: hidden;
  background: #f2f3f5;
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

.nut-time-detail__detail__list__item {
  margin-right: 8px;
}
</style>
