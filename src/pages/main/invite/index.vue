<template>
  <view class="t-invite t-container">
    <DeliView>
      <template v-slot:header> </template>
      <template v-slot:content>
        <scroll-view class="invite-content" :scroll-y="true">
          <DeliNavbar title="" />
          <view class="content"></view>
        </scroll-view>
      </template>
      <template v-slot:footer> </template>
    </DeliView>
  </view>
</template>

<script>
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";

export default {
  name: "Invite",
  components: {
    DeliView,
    DeliNavbar,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="less">
.t-invite {
  background: #ff7a32;

  .invite-content {
    flex: 1;
    overflow: hidden;

    .content {
      min-height: 100%;
      background-image: linear-gradient(#ff7a32, #ff4f39);
    }
  }
}
</style>
