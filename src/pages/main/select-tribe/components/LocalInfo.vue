<template>
  <view class="local-info tribe-block">
    <view class="nearby top">附近共36个站</view>
    <view class="location bottom">
      <view class="left">
        当前地址：华龙网总部
      </view>
      <view class="right">
        <nut-button size="small" plain type="primary">更换地址</nut-button>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "LocalInfo",
};
</script>
<style lang="less">
@import "../index.less";
.local-info {
  background-color: #f5f5f5;
}
</style>
