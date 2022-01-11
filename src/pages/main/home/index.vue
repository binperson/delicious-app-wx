<template>
  <view class="t-home t-container">
    <DeliView>
      <template v-slot:content>
        <My />
      </template>
      <template v-slot:footer>
        <DeliTabbar v-model:active="active" :tabbarArr="tabbarArr" />
      </template>
    </DeliView>
  </view>
</template>

<script>
import { ref } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliTabbar from "@/components/DeliTabbar/index.vue";
import My from "./components/My/index";
export default {
  name: "Home",
  components: {
    DeliView,
    DeliTabbar,
    My,
  },
  setup() {
    const active = ref(1);
    const tabbarArr = [
      {
        title: "首页",
        icon: "icon-shouye",
      },

      {
        title: "我的",
        icon: "icon-wode",
      },
    ];
    return {
      active,
      tabbarArr,
    };
  },
};
</script>

<style lang="less"></style>
