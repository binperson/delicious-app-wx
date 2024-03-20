<template>
  <view class="invite-empty">
    <IconFont
      name="iconfont iconfont icon-yaoqingyouli"
      color="#D3DDD9"
      size="48"
    ></IconFont>
    <view class="desc">{{ desc }}</view>
  </view>
</template>

<script>
import { IconFont } from '@nutui/icons-vue-taro';
export default {
  name: "InviteEmpty",
  components: {
    IconFont
  },
  props: {
    desc: {
      type: String,
      default: "",
    },
  },
  setup(_, { emit }) {
    return {};
  },
};
</script>
<style lang="less">
.invite-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .desc {
    font-size: 13px;
    font-weight: normal;
    color: #888f98;
    line-height: 5px;
    margin-top: 12px;
  }
}
</style>
