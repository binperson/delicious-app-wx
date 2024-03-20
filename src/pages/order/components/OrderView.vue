<template>
  <div class="t-order-view">
    <scroll-view
      @scrolltoupper="upper"
      @scrolltolower="lower"
      @scroll="scroll"
      class="content"
      style="height: 100%"
      :scroll-y="true"
      :refresherEnabled="true"
      :refresherTriggered="triggered"
      @refresherrefresh="refresherrefresh"
    >
      <div v-for="item in allOrder" class="order-item-content">
        <OrderItem :orderDetail="item" />
      </div>
      <div class="bottom-line">我是有底线的</div>
    </scroll-view>
  </div>
</template>
<script>
import OrderItem from "./OrderItem.vue";
import { ref, reactive } from "vue";
import { getOrderPage } from "@/api/order";
import Taro from "@tarojs/taro";

export default {
  name: "OrderView",
  components: { OrderItem },
  props: {
    status: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const userInfo = ref(Taro.getStorageSync("userInfo") || {});
    const triggered = ref(false);
    const allOrder = ref([]); // 全部

    const params = reactive({
      pageNo: 1,
      pageSize: 10,
      memberId: userInfo.value.id,
      statusList: props.status,
    });

    // 滚动到顶部/左边，会触发 scrolltoupper 事件
    const upper = () => {};
    // 滚动到底部/右边，会触发 scrolltolower 事件
    const lower = () => {
      params.pageNo++;
      handleGetOrderPage();
    };
    const scroll = () => {};
    const refresherrefresh = () => {
      triggered.value = true;
      params.pageNo = 1;
      handleGetOrderPage();

      setTimeout(() => {
        triggered.value = false;
      }, 1000);
    };
    const handleGetOrderPage = () => {
      getOrderPage({
        ...params,
      }).then((res) => {
        if (params.pageNo === 1) {
          allOrder.value = res.result.records;
        } else {
          allOrder.value = allOrder.value.concat(res.result.records);
        }
      });
    };
    return {
      triggered,
      allOrder,
      upper,
      lower,
      scroll,
      refresherrefresh,
      handleGetOrderPage,
    };
  },
};
</script>
<style lang="less">
.t-order-view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.order-item-content {
  padding-top: 10px;
}

.bottom-line {
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 14px;
}
</style>
