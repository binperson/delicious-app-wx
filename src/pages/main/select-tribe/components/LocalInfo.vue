<template>
  <view class="local-info tribe-block">
    <view class="nearby top">附近共{{ tribeLength }}个站</view>
    <view class="location bottom">
      <view class="left"> 当前地址：{{ location.name }} </view>
      <view class="right">
        <nut-button size="small" plain type="primary" @click="changeLocation"
          >更换地址</nut-button
        >
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "LocalInfo",
  props: {
    location: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tribeLength: {
      type: Number,
      default: 0,
    },
  },
  setup(_, { emit }) {
    const changeLocation = () => {
      emit("changeLocation");
    };
    return {
      changeLocation,
    };
  },
};
</script>
<style lang="less">
@import "../index.less";
.local-info {
  background-color: #f5f5f5;
}
</style>
