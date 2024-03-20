<template>
  <view class="t-my t-container">
    <scroll-view
      :scroll-y="true"
      style="height: 100%"
      :refresherEnabled="true"
      :refresherTriggered="triggered"
      @refresherrefresh="refresherrefresh"
    >
      <view class="top">
        <view class="info">
          <view class="user-info">
            <view class="avatar-wrap">
              <view class="avatar"></view>
            </view>
            <view class="base-info">
              <view class="name">手机用户</view>
              <view class="iphone">手机号：{{ userInfo.mobile }}</view>
            </view>
          </view>
          <view class="app-info">
            <view class="app-info-top">
              <view class="app-name">
                <IconFont name="iconfont iconfont icon-meishi"></IconFont>
                <view class="name">美食盒子部落</view>
              </view>
              <nut-button @click="invite" size="mini" type="warning">
                <view class="invite">
                  <view class="text">邀请立省</view>
                  <IconFont
                    name="iconfont iconfont icon-invite-right"
                    size="12"
                  ></IconFont>
                </view>
              </nut-button>
            </view>
          </view>
        </view>
      </view>
      <view class="main-content">
        <view class="account-wrap">
          <view class="account-item" @click="goUrl('/pages/coupon/index')">
            <view v-if="memberInfo" class="num">{{ memberInfo.couponCount }}</view>
            <view class="tag-name">
              优惠券
              <view class="unit"> (张) </view>
            </view>
          </view>
          <view class="account-item">
            <view class="num">
              0.
              <view class="decimal">00</view>
            </view>
            <view class="tag-name">
              余额
              <view class="unit"> (元) </view>
            </view>
          </view>
          <view class="account-item">
            <view v-if="memberInfo" class="num">{{ memberInfo.point }}</view>
            <view class="tag-name"> 积分 </view>
          </view>
        </view>

        <view class="order-wrap">
          <view class="title-wrap">
            <view class="title" @click="goUrl(`/pages/${link}/index?status=all`)">
              我的订单
            </view>
            <view
              class="op-wrap"
              @click="goUrl(`/pages/${link}/index?status=all`)"
            >
              全部
              <IconFont
                name="iconfont iconfont icon-black-right"
                size="12"
              ></IconFont>
            </view>
          </view>

          <view class="order-content">
            <view
              class="order-item"
              @click="goUrl(`/pages/${link}/index?status=obligation`)"
            >
              <view class="pic to-pay"></view>
              <view class="item-name"> 待付款 </view>
            </view>
            <view
              class="order-item"
              @click="goUrl(`/pages/${link}/index?status=underway`)"
            >
              <view class="pic receiving"></view>
              <view class="item-name"> 进行中 </view>
            </view>
            <view
              class="order-item"
              @click="goUrl(`/pages/${link}/index?status=afterSale`)"
            >
              <view class="pic after-sale"></view>
              <view class="item-name"> 售后 </view>
            </view>
            <view
              class="order-item"
              @click="goUrl(`/pages/${link}/index?status=completed`)"
            >
              <view class="pic complete"></view>
              <view class="item-name"> 已完成 </view>
            </view>
          </view>
        </view>
        <view class="tribe-wrap">
          <view class="title-wrap">
            <view class="title"> 我的部落 </view>
            <view
              @click="goUrl('/pages/main/select-tribe/index')"
              class="op-wrap"
            >
              全部
              <IconFont
                name="iconfont iconfont icon-black-right"
                size="12"
              ></IconFont>
            </view>
          </view>
          <view class="tribe-content">
            <view class="tribe-name">{{ currentTribe.tribeName || "--" }}</view>
            <view class="area-name">{{ currentTribe.address || "--" }}</view>
            <view class="info">
              <view class="left">
                <view class="tribe-mgt">
                  部落长：{{ currentTribe.manager }}
                </view>
                <view class="time"> 咨询时间：09：00 ~ 21：00 </view>
              </view>
              <view class="right">
                <IconFont
                  size="20"
                  name="iconfont iconfont icon-dianhua"
                  @click="callPhone"
                ></IconFont>
              </view>
            </view>
          </view>
        </view>
        <!-- <view class="func-wrap">
          <view class="title-wrap">
            <view class="title">
              常用功能
            </view>
          </view>
          <view class="func-content">
            <div @click="goUrl('/pages/main/invite/index')" class="func-item">
              <IconFont
                size="40"
                name="iconfont iconfont icon-yaoqingyouli"
              ></IconFont>
              <div class="func-name">
                邀请有礼
              </div>
            </div>
          </view>
        </view> -->
      </view>
    </scroll-view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { ref, computed } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import { goUrl } from "@/utils/index";
import { tribeStore } from "@/store/modules/tribe.js";
import { storeToRefs } from "pinia";
import { getCurrentMember } from "@/api/member";
import { IconFont } from "@nutui/icons-vue-taro";
const tribe = tribeStore();
export default {
  name: "MY",
  components: {
    DeliView,
    IconFont,
  },
  setup() {
    const triggered = ref(false);
    const memberInfo = ref({}); // 用户信息
    const refresherrefresh = (e) => {
      triggered.value = true;
      setTimeout(() => {
        triggered.value = false;
      }, 1000);
    };
    const { currentTribe } = storeToRefs(tribe);
    const callPhone = () => {
      Taro.makePhoneCall({
        phoneNumber: currentTribe.value.phone,
      });
    };
    const userInfo = Taro.getStorageSync("userInfo") || {};
    const invite = () => {
      goUrl("/pages/main/invite/index");
    };
    const handleGetCurrentMember = () => {
      getCurrentMember().then((res) => {
        memberInfo.value = res.result;
      });
    };
    const link = computed(() =>
      memberInfo.value.roleType === 0 ? "order" : "sub/order-admin"
    );
    handleGetCurrentMember();
    return {
      triggered,
      refresherrefresh,
      goUrl,
      currentTribe,
      callPhone,
      userInfo,
      invite,
      memberInfo,
      link,
    };
  },
};
</script>

<style lang="less">
.t-my {
  background: #f2f3f5;

  .top {
    position: relative;
    height: 230px;
    background: url(../../../../../assets/bg.png);
    background-size: 100% 100%;

    .info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 12px;

      .user-info {
        display: flex;
        align-items: center;

        .avatar-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 64px;
          width: 64px;
          border-radius: 50%;
          background: #fff;

          .avatar {
            position: relative;
            top: 6px;
            height: 58px;
            width: 58px;
            background: url(../../../../../assets/avatar.png);
            background-size: 100% 100%;
          }
        }

        .base-info {
          margin-left: 12px;
          color: #fff;

          .name {
            font-size: 18px;
          }

          .iphone {
            font-size: 14px;
            margin-top: 8px;
          }
        }
      }

      .app-info {
        height: 60px;
        margin-top: 12px;
        background: linear-gradient(135deg, #fa2c19 0%, #fa6419 100%);
        border-radius: 8px;

        .app-info-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px 6px;

          .app-name {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #fff;

            .name {
              margin-left: 4px;
            }
          }

          .nut-button {
            background: #fce0ca;
          }

          .invite {
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
            }
          }
        }
      }
    }
  }

  .main-content {
    position: relative;
    padding: 0 12px;
    margin-top: -20px;

    .account-wrap {
      display: flex;
      justify-content: space-between;
      padding: 18px 40px 18px 30px;
      background: #fff;
      border-radius: 8px;

      .account-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .num {
          display: flex;
          align-items: flex-end;
          color: #000000;
          font-size: 20px;

          .decimal {
            position: relative;
            top: -3px;
            font-size: 12px;
            vertical-align: bottom;
          }
        }

        .tag-name {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #666666;

          .unit {
            font-size: 11px;
            margin-left: 8px;
          }
        }
      }
    }

    .order-wrap {
      margin-top: 6px;
      padding-top: 16px;
      background: #fff;
      border-radius: 8px;

      .order-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 18px 32px 18px;

        .order-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .pic {
            height: 33px;
            width: 38px;

            &.to-pay {
              background: url(./order1.png);
              background-size: 100% 100%;
            }

            &.receiving {
              background: url(./order2.png);
              background-size: 100% 100%;
            }

            &.after-sale {
              background: url(./order3.png);
              background-size: 100% 100%;
            }

            &.complete {
              background: url(./order4.png);
              background-size: 100% 100%;
            }
          }

          .item-name {
            font-size: 12px;
          }
        }
      }
    }

    .tribe-wrap {
      padding-top: 18px;

      .tribe-content {
        padding: 16px 10px 18px;
        background: #fff;
        margin-top: 12px;
        border-radius: 8px;

        .tribe-name {
          font-size: 14px;
        }

        .area-name {
          font-size: 12px;
          margin-top: 12px;
          color: #666666;
        }

        .info {
          margin-top: 12px;
          font-size: 12px;
          color: #666666;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          .left {
            display: flex;
            margin-right: 8px;

            .time {
              margin-left: 6px;
            }
          }
        }
      }
    }

    .func-wrap {
      margin-top: 8px;
      padding: 10px 10px 20px;
      background: #fff;

      .func-content {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        margin-top: 24px;

        .func-item {
          display: flex;
          flex-direction: column;
          align-items: center;

          .func-name {
            font-size: 12px;
            margin-top: 12px;
          }
        }
      }
    }

    .title-wrap {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;

      .title {
        font-size: 16px;
      }

      .op-wrap {
        display: flex;
        align-items: center;
        font-size: 12px;
      }
    }
  }
}
</style>
