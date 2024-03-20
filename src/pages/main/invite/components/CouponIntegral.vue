<template>
  <div class="t-coupon-integral">
    <div class="title">用户{{ telPhoneTransform(info.phone) }}</div>
    <div class="desc">+{{ info.num + info.type }}</div>
  </div>
</template>
<script>
import { telPhoneTransform } from "@/utils/index"
export default {
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      telPhoneTransform
    }
  },
};
</script>
<style lang="less">
.t-coupon-integral {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;

  .title {
    color: #111;
  }

  .desc {
    color: #aaa;
  }
}
</style>
