<template>
  <view class="t-select-address t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="地址管理" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <div class="content">
          <div class="no-address">
            <nut-empty description="暂无地址信息"></nut-empty>
            <nut-button @click="addNewAddress" type="primary"
              >添加新地址</nut-button
            >
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
export default {
  name: "SelectAddress",
  components: {
    DeliView,
    DeliNavbar,
  },
  setup() {
    const addNewAddress = () => {
    };
    return { back, addNewAddress };
  },
};
</script>
<style lang="less">
.t-select-address {
  .content {
    height: 100%;
    background: #eee;

    .no-address {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
