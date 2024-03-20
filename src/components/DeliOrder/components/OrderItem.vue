<template>
  <view class="t-order-item">
    <div class="top">
      <div class="sn">订单号：{{ orderDetail.orderNo }}</div>
      <div class="status">{{ statusObj[orderDetail.status] }}</div>
    </div>
    <div @click="goUrl(`/pages/order-detail/index?orderId=${orderDetail.orderId}`)" class="order-content">
      <img
        width="57px"
        height="57px"
        :src="getSkuPic(orderDetail.orderItemList)"
      />
      <div class="desc">
        <div class="goods">{{ getSkuName(orderDetail.orderItemList) }}</div>
        <div class="num-desc">等{{orderDetail.orderItemList.length}}件商品</div>
      </div>
      <view class="r">
        <IconFont name="right" />
      </view>
    </div>
    <div class="more">
      <div class="time">
        {{ orderDetail.createTime }}
      </div>
      <div class="price-content">
        实付金额：
        <div class="price">
          ¥{{ orderDetail.payAmount }}
        </div>
      </div>
    </div>
    <div class="op-content">
      <!-- <nut-button size="mini" type="default" @click="handleDelete"
        >删除订单</nut-button
      > -->
    </div>
  </view>
</template>
<script>
import { goUrl } from "@/utils/index";
import { IconFont } from '@nutui/icons-vue-taro';
export default {
  name: "OrderItem",
  props: {
    orderDetail: {
      type: Object,
      default: {},
    }
  },
  components: {
    IconFont
  },
  setup() {
    const handleDelete = () => {
      wx.showModal({
        title: "提示？",
        content: "是否确认删除订单",
        success(res) {
          if (res.confirm) {
          } else if (res.cancel) {
          }
        },
      });

    };

    const getSkuPic = (orderItemList) => {
      let str = DELI_BASE_URL_FILE + JSON.parse(orderItemList[0].picUrl)[0]

      return str
    }

    const getSkuName = (orderItemList) => {
      let str = ''
      orderItemList.forEach(item => {
        str = str + item.skuName
      })

      return str
    }

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

    return { handleDelete, goUrl, getSkuName, getSkuPic, statusObj };
  },
};
</script>
<style lang="less">
.t-order-item {
  padding: 12px;
  background: #fff;

  .top,
  .more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 14px;
  }

  .more {
    .price-content {
      display: flex;
      align-items: center;

      .price {
        color: #444;
      }
    }
  }

  .op-content {
    margin-top: 14px;
    opacity: 0.8;
    display: flex;
    flex-direction: row-reverse;
  }

  .order-content {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .desc {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 20px 0 16px;
      color: #444;
      font-size: 15px;

      .goods {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
        max-width: 100px;
      }

      .num-desc {
        margin-left: 12px;
      }
    }

    .r {
      position: relative;
      top: 2px;
    }
  }
}
</style>
