<template>
  <DeliView :paddingBottom="false">
    <template v-slot:header>
      <DeliNavbar title="全部订单" :leftShow="true" :back="back" />
    </template>
    <template v-slot:content>
      <nut-tabs v-model="status" type="smile" @change="paneChange">
        <nut-tab-pane title="全部" pane-key="all">
          <OrderView :status="[]" ref="allOrderViewInstance" />
        </nut-tab-pane>
        <nut-tab-pane title="待付款" pane-key="obligation">
          <OrderView :status="[101]" ref="obligationOrderViewInstance" />
        </nut-tab-pane>
        <nut-tab-pane title="进行中" pane-key="underway">
          <OrderView
            :status="[201, 301, 401, 402]"
            ref="underwayOrderViewInstance"
          />
        </nut-tab-pane>
        <nut-tab-pane title="售后" pane-key="afterSale">
          <OrderView :status="[202, 203]" ref="afterSaleOrderViewInstance" />
        </nut-tab-pane>
        <nut-tab-pane title="已完成" pane-key="completed">
          <OrderView :status="[901]" ref="completedOrderViewInstance" />
        </nut-tab-pane>
      </nut-tabs>
    </template>
  </DeliView>
</template>
<script>
import Taro, { useDidShow } from "@tarojs/taro";
import { ref, reactive, nextTick } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import OrderItem from "./components/OrderItem.vue";
import OrderView from "./components/OrderView.vue";
export default {
  name: "Order",
  components: {
    DeliView,
    DeliNavbar,
    OrderItem,
    OrderView,
  },
  setup() {
    const instance = Taro.getCurrentInstance();
    const statusParams = instance.router.params.status;
    const status = ref("all");
    const addNewAddress = () => {};

    const params = reactive({
      pageNo: 1,
      pageSize: 10,
    });
    const allOrderViewInstance = ref(); // 全部
    const obligationOrderViewInstance = ref(); // 待付款
    const underwayOrderViewInstance = ref(); // 进行中
    const afterSaleOrderViewInstance = ref(); // 售后
    const completedOrderViewInstance = ref(); // 已完成

    const orderViewInstanceMap = {
      all: allOrderViewInstance,
      obligation: obligationOrderViewInstance,
      underway: underwayOrderViewInstance,
      afterSale: afterSaleOrderViewInstance,
      completed: completedOrderViewInstance,
    };

    // 滚动到顶部/左边，会触发 scrolltoupper 事件
    const upper = () => {};
    // 滚动到底部/右边，会触发 scrolltolower 事件
    const lower = () => {
      params.pageNo++;
      handleGetOrderPage();
    };
    const scroll = () => {};

    const paneChange = ({ title, paneKey }) => {
      orderViewInstanceMap[`${paneKey}`].value.handleGetOrderPage();
    };

    const back = () => {
      Taro.reLaunch({
        url: "/pages/main/home/index?active=1",
      });
    };

    useDidShow(() => {
      const statusParams = instance.router.params.status || "all";
      status.value = statusParams;
      nextTick(() => {
        orderViewInstanceMap[`${status.value}`].value.handleGetOrderPage();
      });
    });
    return {
      back,
      addNewAddress,
      status,
      upper,
      lower,
      scroll,
      allOrderViewInstance,
      obligationOrderViewInstance,
      underwayOrderViewInstance,
      afterSaleOrderViewInstance,
      completedOrderViewInstance,
      paneChange,
    };
  },
};
</script>
<style lang="less">
@import "../../common.less";
.nut-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  .nut-tabs__titles {
    background: #fff;
  }

  .nut-tabs__content {
    flex: 1;
    background-color: @default-bg-color;

    .nut-tab-pane {
      background-color: @default-bg-color;
      padding: 0;
      height: 100%;
      position: relative;
    }
  }
}
</style>
