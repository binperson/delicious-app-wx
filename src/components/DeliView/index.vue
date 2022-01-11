<template>
  <view class="t-deli-view">
    <slot name="header"> </slot>
    <view class="deli-view-content">
      <slot name="content"> </slot>
    </view>
    <slot name="footer"> </slot>
  </view>
</template>

<script>
export default {
  name: "Index",
  components: {},
  setup() {},
};
</script>

<style lang="less">
.t-deli-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .deli-view-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
}
</style>
