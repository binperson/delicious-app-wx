<template>
  <div class="t-invite-item">
    <view class="avatar-wrap">
      <view class="avatar"></view>
    </view>
    <div class="user-info">
      <div class="phone">用户{{ telPhoneTransform(info.mobile) }}</div>
      <div class="desc">TA未完成下单</div>
    </div>
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
      telPhoneTransform,
    };
  },
};
</script>
<style lang="less">
.t-invite-item {
  display: flex;
  align-items: center;

  .avatar-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    width: 48px;
    border-radius: 50%;
    background: #eee;

    .avatar {
      position: relative;
      top: 2px;
      height: 38px;
      width: 38px;
      background: url(../../../../assets/avatar.png);
      background-size: 100% 100%;
    }
  }

  .user-info {
    margin-left: 12px;

    .phone {
      color: #111;
      font-size: 12px;
    }

    .desc {
      color: #aaa;
      font-size: 12px;
    }
  }
}
</style>
