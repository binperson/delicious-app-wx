<template>
  <view class="t-order t-container">
    <DeliOrder />
  </view>
</template>
<script>
import DeliOrder from "@/components/DeliOrder/index.vue";
export default {
  name: "Order",
  components: {
    DeliOrder,
  },
  setup() {
    return {};
  },
};
</script>
