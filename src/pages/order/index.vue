<template>
  <view class="t-order t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="全部订单" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <nut-tabs v-model="status" type="smile">
          <nut-tabpane title="全部">
            <div v-for="item in allOrder" class="order-item-content">
              <OrderItem />
            </div>
            <div class="bottom-line">我是有底线的</div>
          </nut-tabpane>
          <nut-tabpane title="待付款">
            待付款
            <div class="bottom-line">我是有底线的</div>
          </nut-tabpane>
          <nut-tabpane title="进行中">
            进行中
            <div class="bottom-line">我是有底线的</div>
          </nut-tabpane>
          <nut-tabpane title="售后">
            售后
            <div class="bottom-line">我是有底线的</div>
          </nut-tabpane>
          <nut-tabpane title="已完成">
            已完成
            <div class="bottom-line">我是有底线的</div>
          </nut-tabpane>
        </nut-tabs>
      </template>
    </DeliView>
  </view>
</template>
<script>
import { ref } from "vue";
import { back } from "@/utils/index";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import OrderItem from "./components/OrderItem.vue";
export default {
  name: "Order",
  components: {
    DeliView,
    DeliNavbar,
    OrderItem,
  },
  setup() {
    const status = ref("");
    const addNewAddress = () => {};
    const allOrder = [{}];
    return { back, addNewAddress, status, allOrder };
  },
};
</script>
<style lang="less">
@import "../../common.less";
.t-order {
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

      .nut-tabpane {
        background-color: @default-bg-color;
        padding: 0;

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
      }
    }
  }
}
</style>
