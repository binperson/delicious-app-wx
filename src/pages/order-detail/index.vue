<template>
  <view class="t-order-detail t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:content>
          123
      </template>
    </DeliView>
  </view>
</template>
<script>
import { back } from "@/utils/index";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
export default {
  name: "OrderDetail",
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
.t-order-detail {
  
}
</style>
