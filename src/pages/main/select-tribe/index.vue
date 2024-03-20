<template>
  <view class="t-select-tribe t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar title="请选择部落" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <LocalInfo
          :location="location"
          :tribeLength="tribe.tribeListLast.length"
          @changeLocation="changeLocation"
        />
        <scroll-view class="tribe-list-content" :scroll-y="true">
          <TribeInfo
            :location="location"
            :tribe="item"
            v-for="item in tribe.tribeListLast"
            @selectTribe="selectTribe"
          />
        </scroll-view>
      </template>
      <template v-slot:footer> </template>
    </DeliView>
  </view>
  <!-- <nut-address
    v-model:visible="showPopup"
    :province="province"
    :city="city"
    :country="country"
    :town="town"
    @change="onChange"
    @close="close"
    custom-address-title="请选择所在地区"
  ></nut-address> -->
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import Taro, { useDidShow } from "@tarojs/taro";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import LocalInfo from "./components/LocalInfo.vue";
import TribeInfo from "./components/TribeInfo.vue";
import { back } from "@/utils/index";
import { tribeStore } from "@/store/modules/tribe.js";
const tribe = tribeStore();
const chooseLocation = requirePlugin("chooseLocation");
const key = "TX5BZ-5B53D-WYN4P-PJECA-5FV5S-OLB2N";
const referer = "deli";
export default {
  name: "SelectTribe",
  components: {
    DeliView,
    DeliNavbar,
    LocalInfo,
    TribeInfo,
  },
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
  setup() {
    const showPopup = ref(false);
    const location = ref({});
    location.value = Taro.getStorageSync("location") || {};

    const getLocation = () => {
      wx.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`,
      });
    };

    useDidShow(() => {
      const getLocationInfo = chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
      if (getLocationInfo) {
        location.value = getLocationInfo;
      }
      if (!location?.value?.name) {
        getLocation();
      } else {
        tribe.getTribeList(location.value);
        Taro.setStorageSync("location", location.value);
      }
    });

    watch(
      location,
      (newValue) => {
        // 获取部落
        tribe.getTribeList(newValue);
      },
      {
        immutable: true,
      }
    );

    const selectTribe = (val) => {
      Taro.setStorageSync("currentTribe", val);
      tribe.currentTribe = val;
      Taro.reLaunch({
        url: "/pages/main/home/index",
      });
    };

    const address = reactive({
      province: [
        { id: 1, name: "北京" },
        { id: 2, name: "广西" },
        { id: 3, name: "江西" },
        { id: 4, name: "四川" },
      ],
      city: [
        { id: 7, name: "朝阳区" },
        { id: 8, name: "崇文区" },
        { id: 9, name: "昌平区" },
        { id: 6, name: "石景山区" },
      ],
      country: [],
      town: [],
    });
    const changeLocation = () => {
      getLocation();
    };
    const onChange = (cal) => {
      const name = address[cal.next];
      if (name.length < 1) {
        showPopup.value = false;
      }
    };
    const close = (val) => {
    };
    return {
      back,
      close,
      onChange,
      ...toRefs(address),
      showPopup,
      changeLocation,
      tribe,
      location,
      selectTribe,
    };
  },
};
</script>

<style lang="less">
.tribe-list-content {
  flex: 1;
  overflow: hidden;
}
</style>
