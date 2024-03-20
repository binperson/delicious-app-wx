<template>
  <view class="t-order-detail t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="订单详情" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <div class="content">
          <div class="top">
            {{ statusObj[orderDetail.status] }}
            <nut-button
              v-if="orderDetail.status === 101"
              size="mini"
              type="default"
              @click="handlePay"
              >支付</nut-button
            >
          </div>
          <div v-if="orderDetail.deliveryType != '2'" class="delivery-info">
            <div class="title">收货信息</div>
            <div class="phone">{{ orderDetail.phone }}</div>
            <!-- <div class="service-station">
              服务站：潘庄服务站
            </div> -->
            <div class="service-station-detail">
              <!-- 山东省淄博市张店区潘庄生活区东门向南20米 -->
              {{ orderDetail.deliveryAddress }}
            </div>
            <!-- <div class="station-content">
              <div class="agent">站长：山东哈选虚拟角色</div>
              <div class="contact">
                <nut-icon
                  name="iconfont iconfont icon-dianhua"
                  color="#e64340"
                  size="24rpx"
                />联系站长
              </div>
              <div class="time">营业时间：00:00-23:00</div>
            </div> -->
          </div>
          <div class="goods-detail">
            <div class="scheduled-time">
              <div class="tt">预计</div>
              <div class="time">{{ orderDetail.deliveryTime }}</div>
            </div>
            <div class="goods-detail-title">商品详情</div>
            <div class="goods-list">
              <div v-for="item in orderDetail.orderItemList" class="goods-item">
                <div class="pic">
                  <img
                    :src="DELI_BASE_URL_FILE + JSON.parse(item.picUrl)[0]"
                    alt=""
                    srcset=""
                  />
                </div>
                <div class="goods-detail-desc">
                  <div class="desc">
                    {{ item.skuName }}
                  </div>
                  <div class="num">x{{ item.count }}</div>
                </div>
                <div class="price">¥{{ item.totalAmount }}</div>
              </div>
            </div>
          </div>

          <div class="stream-content">
            <div class="stream-item">
              <div class="label">商品金额</div>
              <div class="desc">
                ¥{{ getPayAmount(orderDetail.orderItemList) }}
              </div>
            </div>
            <div class="stream-item">
              <div class="label">支付方式</div>
              <div class="desc">微信支付</div>
            </div>
            <div class="stream-item">
              <div class="label">团购名</div>
              <div class="desc">{{ orderDetail.groupPurchaseName }}</div>
            </div>
            <div class="stream-item">
              <div class="label">折扣</div>
              <div class="desc">{{ orderDetail.discount }}折</div>
            </div>
            <div v-if="orderDetail.point > 0" class="stream-item">
              <div class="label">使用积分</div>
              <div class="desc">{{ orderDetail.point }}</div>
            </div>
            <div v-if="orderDetail.couponName" class="stream-item">
              <div class="label">使用优惠卷</div>
              <div class="desc">{{ orderDetail.couponName }}</div>
            </div>
            <div class="stream-item">
              <div class="label">实付金额</div>
              <div class="desc">¥{{ orderDetail.payAmount }}</div>
            </div>
          </div>
          <div class="order-content">
            <div class="order-item">
              <div class="label">订单编号</div>
              <div class="desc">
                {{ orderDetail.orderNo }}
                <div class="copy">复制订单号</div>
              </div>
            </div>
            <div class="order-item">
              <div class="label">下单时间</div>
              <div class="desc">{{ orderDetail.createTime }}</div>
            </div>
            <!-- <div class="order-item">
              <div class="label">订单编号</div>
              <div class="desc">2022-01-12 00:10:55</div>
            </div> -->
          </div>
        </div>
      </template>
    </DeliView>
  </view>
</template>
<script>
import { back } from "@/utils/index";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import Taro from "@tarojs/taro";
import { getOrderPageById } from "@/api/order";
import { ref } from "vue";
import { orderPay } from "@/api/order";
export default {
  name: "OrderDetail",
  components: {
    DeliView,
    DeliNavbar,
  },
  setup() {
    const instance = Taro.getCurrentInstance();
    const orderId = instance.router.params.orderId;
    const orderDetail = ref({});
    const statusObj = {
      101: "待支付",
      102: "用户取消",
      103: "系统自动取消",
      201: "已支付",
      202: "申请退款",
      203: "已退款",
      301: "已发货",
      401: "已发货",
      402: "已发货",
      901: "已完成",
    };
    getOrderPageById(orderId).then((res) => {
      orderDetail.value = res.result;
    });
    const getPayAmount = (orderItemList) => {
      let amount = 0;
      orderItemList?.forEach((item) => {
        amount += item.totalAmount;
      });
      return amount;
    };
    const handlePay = () => {
      orderPay({
        orderId,
        orderNo: orderDetail.value.orderNo,
            payType: 5
      }).then((rt) => {
        wx.requestPayment({
          timeStamp: rt.result.timeStamp,
          nonceStr: rt.result.nonceStr,
          package: rt.result.packageVal,
          signType: rt.result.signType,
          paySign: rt.result.paySign,
          success: function (res) {
            // deleteCart();
            // goUrl("/pages/order/index?status=all");
          },
          fail: function (res) {},
          complete: function (res) {},
        });
      });
    };
    return {
      back,
      orderDetail,
      DELI_BASE_URL_FILE,
      getPayAmount,
      statusObj,
      handlePay,
    };
  },
};
</script>
<style lang="less">
.t-order-detail {
  .content {
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24rpx;
      background: #fff;
    }

    .delivery-info {
      padding: 24rpx;
      margin-top: 16rpx;
      background: #fff;

      .title {
        color: #a4a4a4;
      }

      .phone {
        color: #333333;
        font-size: 28rpx;
        margin-top: 8rpx;
      }

      .service-station {
        color: #333333;
        font-size: 28rpx;
        margin-top: 8rpx;
      }

      .service-station-detail {
        color: #a4a4a4;
        font-size: 24rpx;
        margin-top: 8rpx;
      }

      .station-content {
        color: #a4a4a4;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24rpx;
        margin-top: 16rpx;

        .contact {
          color: #f88145;
          display: flex;
          align-items: center;

          .nutui-iconfont {
            margin-right: 6rpx;
          }
        }
      }
    }

    .goods-detail {
      padding: 24rpx;
      margin-top: 16rpx;
      background: #fff;

      .scheduled-time {
        display: flex;
        align-items: center;
        color: #f88145;

        .tt {
          font-size: 24rpx;
        }

        .time {
          font-size: 32rpx;
        }
      }

      .goods-detail-title {
        color: #a4a4a4;
        font-size: 24rpx;
        margin-top: 8rpx;
      }

      .goods-list {
        padding-bottom: 20rpx;

        .goods-item {
          display: flex;
          align-items: center;
          margin-top: 8rpx;

          .pic {
            height: 100rpx;
            width: 100rpx;

            img {
              height: 100rpx;
              width: 100rpx;
            }
          }

          .goods-detail-desc {
            flex: 1;
            padding: 0 40rpx;
            color: #333;
            font-size: 30rpx;
          }

          .price {
            color: #333;
          }
        }
      }
    }

    .stream-content {
      padding: 24rpx;
      margin-top: 16rpx;
      background: #fff;

      .stream-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #999;
        font-size: 28rpx;
        line-height: 50rpx;

        .desc {
          color: #333;
        }
      }
    }

    .order-content {
      padding: 24rpx;
      margin-top: 16rpx;
      background: #fff;

      .order-item {
        display: flex;
        align-items: center;
        color: #999;
        font-size: 28rpx;
        line-height: 42rpx;

        .desc {
          flex: 1;
          margin-left: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .copy {
            color: #f88145;
          }
        }
      }
    }
  }
}
</style>
