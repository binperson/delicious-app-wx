<template>
  <view class="tribe-info tribe-block">
    <view class="top">
      <view class="left">
        {{ tribe.tribeName }}
      </view>
      <view class="right">
        <nut-button size="small" type="primary" @click="selectTribe(tribe)">选择</nut-button>
      </view>
    </view>
    <view class="bottom">
      <view class="left">
        当前地址：{{ tribe.address }}
      </view>
    </view>
  </view>
</template>
<script>
import { tribeStore } from "@/store/modules/tribe.js";
const tribe = tribeStore();
export default {
  name: "TribeInfo",
  props: {
    tribe: {
      type: Object,
      default: () => {
        return {}
      },
    },
    location: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  setup(_, { emit }) {
    const selectTribe = (val) => {
      emit("selectTribe", val);
    }

    return {
      selectTribe
    }
  }
};
</script>
<style lang="less">
@import "../index.less";
</style>
