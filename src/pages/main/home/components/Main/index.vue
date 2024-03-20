<template>
  <view class="t-main t-container">
    <div class="t-main-bg"></div>
    <view class="main-header">
      <view
        :style="{
          height: `${menuRect.height + 2 * menuRect.top - statusBarHeight}px`,
          lineHeight: `${menuRect.height}px`,
          paddingTop: `${menuRect.top}px`,
          paddingBottom: `${menuRect.top - statusBarHeight}px!important`,
        }"
        class="header-content"
      >
        <view class="location" @click="getLocation">
          <IconFont name="location2" color="#fff" size="15"></IconFont>
          <view class="region-name">{{
            location.name ? location.name : "获取定位"
          }}</view>
        </view>
      </view>
      <div
        @click="goUrl('/pages/main/select-tribe/index')"
        class="switch-tribe"
      >
        <div class="title">
          {{ currentTribe.tribeName || "--" }}
        </div>
        <div class="switch">更换</div>
      </div>
    </view>
    <scroll-view
      class="content"
      :scroll-y="true"
      :refresherEnabled="true"
      :refresherTriggered="triggered"
      @refresherrefresh="refresherrefresh"
    >
      <div class="group-list">
        <template v-if="groupPurchaseList.length > 0">
          <div
            @click="updateCurrentGroupPurchase(item)"
            v-for="(item, index) in groupPurchaseList"
            class="group-item"
          >
            <div class="top">
              <div class="title">
                <div class="shop-name">
                  {{ item.name }}
                </div>
                <div class="tip">优选食物团购中</div>
              </div>
              <div class="countdown-wrap">
                <template v-if="item.isEndGroupBuying"> 已结束 </template>
                <template v-else>
                  <nut-countdown
                    :end-time="new Date(item.endTime)"
                  ></nut-countdown>
                  后结束
                </template>
              </div>
            </div>
            <div class="info-wrap">
              <div class="food-wrap">
                <scroll-view>
                  <div class="food-list">
                    <div v-for="item in allFoodList" class="food-item">
                      <div
                        class="food-img"
                        :style="`background: url('${item.avatar}');background-size: cover;`"
                      ></div>
                      <div class="food-title">
                        {{ item.name }}
                      </div>
                      <div class="price-wrap">
                        <div class="price">
                          <nut-price
                            :price="item.price"
                            size="normal"
                            :need-symbol="true"
                            :thousands="true"
                          />
                        </div>
                        <div class="old-price">
                          <nut-price
                            :price="item.originPrice"
                            size="normal"
                            :need-symbol="true"
                            :thousands="true"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </scroll-view>
              </div>
              <div v-if="item.status === '0'" class="info">
                <div class="left">
                  <div class="progress">
                    <nut-progress
                      :percentage="
                        parseInt((item.orderNum / item.mosaicRange[1]) * 100)
                      "
                      :text-inside="true"
                      size="small"
                    />
                  </div>
                  <div class="num-wrap">已拼{{ item.orderNum }}单</div>
                </div>
                <div class="right">
                  <nut-button size="mini" type="warning">
                    <view class="join">
                      <view class="text">去拼单</view>
                      <IconFont
                        name="iconfont iconfont icon-invite-right"
                        color="#fff"
                        size="12"
                      ></IconFont>
                    </view>
                  </nut-button>
                </div>
              </div>
              <div v-else class="info">
                <div class="left">
                  <!-- <div class="progress">
                    <nut-progress
                      percentage="60"
                      :text-inside="true"
                      size="small"
                    />
                  </div> -->
                  <div class="success">拼单成功，加入即配送</div>
                </div>
                <div v-if="!item.isEndGroupBuying" class="right">
                  <nut-button size="mini" type="warning">
                    <view class="join">
                      <view class="text">去加入</view>
                      <IconFont
                        name="iconfont iconfont icon-invite-right"
                        size="12"
                      ></IconFont>
                    </view>
                  </nut-button>
                </div>
              </div>
            </div>
          </div>
        </template>

        <div v-else class="empty-wrap">
          <nut-empty
            :description="`今日团购全部结束，明日11:00~13:00、17:30~19:30继续开团`"
          ></nut-empty>
        </div>
      </div>
    </scroll-view>
  </view>
</template>
<script>
import moment from "moment";
import Taro, { useDidShow } from "@tarojs/taro";
import { reactive, toRefs, ref, watch } from "vue";
import { goUrl } from "@/utils/index";
import { tribeStore } from "@/store/modules/tribe.js";
import { foodStore } from "@/store/modules/food.js";
import { groupPurchaseStore } from "@/store/modules/groupPurchase.js";
import { storeToRefs } from "pinia";
import { getPmsGroupPurchaseList } from "@/api/groupPurchase";
import { IconFont } from "@nutui/icons-vue-taro";
const tribe = tribeStore();
const food = foodStore();
const groupPurchase = groupPurchaseStore();
const chooseLocation = requirePlugin("chooseLocation");
const key = "TX5BZ-5B53D-WYN4P-PJECA-5FV5S-OLB2N";
const referer = "deli";
export default {
  name: "Main",
  components: {
    IconFont,
  },
  onUnload() {
    // 页面卸载时设置插件选点数据为null，防止再次进入页面，geLocation返回的是上次选点结果
    chooseLocation.setLocation(null);
  },
  setup() {
    // const hotCitys = "重庆";
    const state = reactive({
      menuRect: Taro.getMenuButtonBoundingClientRect(),
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
    });
    const location = ref({});
    const groupPurchaseList = ref([]);
    const triggered = ref(false);
    location.value = Taro.getStorageSync("location") || {};
    food.getAllFoodList();

    const getLocation = () => {
      wx.navigateTo({
        url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`,
      });
    };

    const shuffle = (arr, index) => {
      if (index % 6 !== 0) {
        return arr;
      }
      var l = arr.length;
      var index, temp;
      while (l > 0) {
        index = Math.floor(Math.random() * l);
        temp = arr[l - 1];
        arr[l - 1] = arr[index];
        arr[index] = temp;
        l--;
      }
      return arr;
    };

    // 更新当前团购
    const updateCurrentGroupPurchase = (val) => {
      if (val.isEndGroupBuying) {
        return;
      }
      groupPurchase.updateCurrentGroupPurchase(val);
      goUrl("/pages/buying/index?state=1");
    };

    useDidShow(() => {
      const getLocationInfo =
        Taro.getStorageSync("location") || chooseLocation.getLocation(); // 如果点击确认选点按钮，则返回选点结果对象，否则返回null
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
      }
      // {
      //   immediate: true,
      // }
    );
    const { currentTribe } = storeToRefs(tribe);
    const { allFoodList } = storeToRefs(food);

    const getPmsGroupPurchaseListByTribeId = (tribeId) => {
      getPmsGroupPurchaseList({
        effectTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        tribeId,
      }).then((res) => {
        if (res) {
          const arr = [];
          res.result?.forEach((item) => {
            item.mosaicRange = JSON.parse(item.mosaicRange);
            item.deliveryTime = JSON.parse(item.deliveryTime);
            item.isEndGroupBuying =
              Date.now() - new Date(item.deliveryTime[1]).getTime() > 0;
            if (!item.isEndGroupBuying) {
              arr.push(item);
            }
          });
          groupPurchaseList.value = arr;
        }
      });
    };

    watch(
      currentTribe,
      (newValue) => {
        // 获取团购列表
        if (newValue.tribeId) {
          getPmsGroupPurchaseListByTribeId(newValue.tribeId);
        } else {
          goUrl("/pages/main/select-tribe/index");
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const refresherrefresh = () => {
      triggered.value = true;
      getPmsGroupPurchaseListByTribeId(currentTribe.tribeId);
      setTimeout(() => {
        triggered.value = false;
      }, 600);
    };
    return {
      ...toRefs(state),
      location,
      goUrl,
      getLocation,
      currentTribe,
      groupPurchaseList,
      allFoodList,
      shuffle,
      updateCurrentGroupPurchase,
      triggered,
      refresherrefresh,
    };
  },
};
</script>
<style lang="less">
.t-main {
  display: flex;
  flex-direction: column;
  position: relative;

  .empty-wrap {
    background-color: #fff;
    min-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;

    .nut-empty__description {
      text-align: center;
    }
  }

  .t-main-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 350px;
    background-image: linear-gradient(#ec6a34, #ffffff);
  }
  .main-header {
    padding: 0 12px;
    position: relative;

    .header-content {
      display: flex;
      align-items: center;

      .location {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 15px;
        .region-name {
          margin-left: 6px;
        }
      }
    }

    .switch-tribe {
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      background: #fffff2e8;
      padding: 0 15px;
      border-radius: 6px;

      .title {
        font-size: 13px;
        color: #fa4918;
      }

      .switch {
        font-size: 12px;
        color: #bdc4cc;
      }
    }
  }

  .content {
    flex: 1;
    overflow: hidden;

    .group-list {
      padding: 7px 12px 0 12px;

      .group-item {
        padding: 0 12px 12px 12px;
        margin-top: 12px;
        background: #f7702e;
        border-radius: 16px 0 0 0;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;

          .title {
            display: flex;
            align-items: flex-end;
            color: #fff;

            .shop-name {
              font-size: 16px;
            }

            .tip {
              font-size: 12px;
              line-height: 18px;
              margin-left: 12px;
            }
          }

          .countdown-wrap {
            display: flex;
            align-items: center;
            color: #ffe4ab;
            font-size: 12px;
          }
        }

        .info-wrap {
          background: #fff;
          padding: 8px 0 0 8px;

          .food-wrap {
            .food-list {
              display: flex;

              .food-item {
                display: flex;
                flex-direction: column;
                margin-right: 8px;

                .food-img {
                  height: 80px;
                  width: 80px;
                  background-size: 100% 100%;
                }

                .food-title {
                  font-size: 12px;
                  color: #666666;
                  margin-top: 8px;
                  padding: 0 2px;
                  flex: 1;
                  line-height: 18px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                }
              }

              .price-wrap {
                display: flex;
                align-items: center;
                .price {
                  .nut-price--symbol-normal {
                    font-size: 13px;
                  }
                  .nut-price--normal {
                    font-size: 13px;
                  }

                  .nut-price--decimal-normal {
                    font-size: 11px;
                  }
                }

                .old-price {
                  margin-left: 2px;
                  .nut-price {
                    color: #bdc4cc;
                    text-decoration-line: line-through;
                  }

                  .nut-price--symbol-normal {
                    font-size: 8px;
                    text-decoration-line: line-through;
                  }
                  .nut-price--normal {
                    font-size: 8px;
                    text-decoration-line: line-through;
                  }
                  .nut-price--decimal-normal {
                    font-size: 6px;
                    text-decoration-line: line-through;
                  }
                }
              }
            }
          }
          .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 8px 8px 0;

            .left {
              display: flex;
              align-items: center;
              width: 70%;

              .success {
                color: #fa2c19;
                font-size: 12px;
              }

              .progress {
                flex: 1;

                .nut-progress-inner {
                  opacity: 0.6;
                }
              }

              .num-wrap {
                font-size: 10px;
                color: #999;
                margin-left: 8px;
              }
            }

            .right {
              font-size: 12px;

              .nut-button {
                background: #fce0ca;
              }

              .join {
                position: relative;
                display: flex;
                align-items: center;
                color: #fa5f22;

                .text {
                  position: relative;
                  left: -6px;
                }

                .icon-invite-right {
                  position: absolute;
                  right: -6px;
                  top: 1px;
                  color: #fa5f22 !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
