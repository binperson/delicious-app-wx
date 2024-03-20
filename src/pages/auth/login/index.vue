<template>
  <view class="t-login t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar :leftShow="false" :back="back">
          <template #left>
            <div @click="goHome" class="home-wrap">
              <IconFont
                name="iconfont iconfont icon-shouye nut-icon-am-breathe nut-icon-am-infinite"
              />
            </div>
          </template>
        </DeliNavbar>
      </template>
      <template v-slot:content>
        <view class="main">
          <view class="logo"></view>
          <view class="btn-wrap">
            <div v-if="!protocol" class="mask-btn" @click="protocolTip"></div>
            <nut-button size="large" block type="primary"></nut-button>
            <button
              class="base-button"
              open-type="getPhoneNumber"
              @getphonenumber.stop="getPhoneNumber"
            >
              手机号一键登录
            </button>
          </view>
        </view>
      </template>
      <template v-slot:footer>
        <view class="info-wrap">
          <nut-checkbox id="popid" v-model="protocol" label=""> </nut-checkbox>
          我已阅读并同意<view
            class="link"
            @click="goUrl('/pages/statement/protocol/index')"
          >
            《用户服务协议》、</view
          ><view
            class="link"
            @click="
              () => {
                goUrl('/pages/statement/policy/index');
              }
            "
            >《隐私政策》</view
          >
        </view>
        <nut-popover
          v-model:visible="visible.customized"
          targetId="popid"
          location="top-start"
          theme="dark"
          custom-class="customClass"
        >
          <template #content>
            <div class="self-content">请阅读并勾选用户协议</div>
          </template>
        </nut-popover>
      </template>
    </DeliView>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import { goUrl } from "@/utils/index";
import { authLoginWechat } from "@/api/user";
import DeliView from "@/components/DeliView/index.vue";
import jwt_decode from "jwt-decode";
import { ref, reactive } from "vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import { IconFont } from "@nutui/icons-vue-taro";
export default {
  name: "Login",
  components: {
    DeliView,
    DeliNavbar,
    IconFont,
  },
  setup() {
    const code = ref("");
    const visible = reactive({
      customized: false,
    });
    const protocol = ref(false);

    Taro.login({
      success: (res) => {
        code.value = res.code;
      },
    });
    const instance = Taro.getCurrentInstance();
    const handleUserAuth = (e) => {
      // Taro.login({
      //   success: async (res) => {
      //     console.log({
      //       type: 2,
      //       jsCode: code.value,
      //       encryptedData: e.detail.encryptedData,
      //       iv: e.detail.iv,
      //     })

      //   },
      // });
      authLoginWechat({
        type: 2,
        jsCode: code.value,
        encryptedData: e.detail.encryptedData,
        inviter: instance.router.params.inviter || "231786483873353728",
        iv: e.detail.iv,
      }).then(
        (res) => {
          // if (res.code === 9 || res.code === 3) {
          //   Taro.showToast({
          //     title: "登录失败，请重新登录",
          //     icon: "none",
          //   });
          //   return;
          // }
          if (res.code === 10000) {
            Taro.setStorageSync("userInfo", jwt_decode(res.result));
            Taro.setStorageSync(DELI_TOKEN_NAME, res.result);
            if (instance.router.params.redirect) {
              let redirect = instance.router.params.redirect;
              let str = "";
              for (let i in instance.router.params) {
                str += `${i}=${instance.router.params[i]}&`;
              }
              str = str.substring(0, str.length - 1);
              Taro.reLaunch({ url: `${redirect}?${str}` });
            } else {
              Taro.reLaunch({ url: "/pages/main/home/index" });
            }
          } else {
            Taro.showToast({
              title: res.msg,
              icon: "none",
            });
          }
        },
        () => {
          // Taro.clearStorageSync();
          Taro.removeStorage("userInfo");
          Taro.removeStorage(DELI_TOKEN_NAME);
          // Taro.removeStorage('location')
          Taro.removeStorage("currentTribe");
          Taro.removeStorage("groupPurchase");
        }
      );
    };
    // 用微信登录
    const getPhoneNumber = (e) => {
      if (e.detail.errMsg === "getPhoneNumber:fail user deny") {
        return;
      }
      handleUserAuth(e);
    };

    // 跳转首页
    const goHome = () => {
      Taro.reLaunch({ url: "/pages/main/home/index" });
    };

    const protocolTip = () => {
      if (!protocol.value) {
        visible.customized = true;
      }
    };
    return {
      getPhoneNumber,
      goUrl,
      goHome,
      protocol,
      visible,
      protocolTip,
    };
  },
};
</script>

<style lang="less">
@import "@/style/global.less";
.t-login {
  background-color: #fff;

  .home-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #999;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    opacity: 0.9;

    .iconfont {
      font-family: "iconfont" !important;
    }
  }

  .main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .logo {
      height: 300px;
      width: 300px;
      background: url(./logo.png);
      background-size: 100% 100%;
    }

    .btn-wrap {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      padding: 0 30px;
      margin-top: 66px;

      .mask-btn {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2000;
      }

      .nut-button {
        position: relative;
        overflow: hidden;
      }

      .base-button {
        display: inline-block;
        font-size: 18px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
        background-color: transparent;
        outline: none;
        color: #fff;

        &::after {
          border: none;
        }
      }
    }
  }

  .info-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #666666;
    text-align: center;
    padding-bottom: 30px;

    .nut-checkbox__label {
      margin-left: 4px;
    }

    .link {
      color: @color-primary-1;
      display: inline;
    }
  }

  .t-deli-view .deli-view-content {
    background-color: #fff;
  }
}
.nut-popover-content {
  width: 150px;
  margin-left: -14px;
  text-align: center;
  padding: 2px;
}
</style>
