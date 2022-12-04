<template>
  <view class="t-login t-container">
    <DeliView>
      <template v-slot:content>
        <view class="main">
          <view class="logo"></view>
          <view class="btn-wrap">
            <nut-button size="large" block type="primary">
              <button
                open-type="getPhoneNumber"
                @getphonenumber.stop="getPhoneNumber"
              >
                授权微信登录
              </button>
            </nut-button>
          </view>
        </view>
      </template>
      <template v-slot:footer>
        <view class="info-wrap">
          登录代表您已同意<view
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
import { ref } from "vue";
export default {
  name: "Login",
  components: {
    DeliView,
  },
  setup() {
    const code = ref('')
    Taro.login({
      success: res => {
        code.value = res.code
      }
    })
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
            console.log(123, jwt_decode(res.result))
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
          Taro.clearStorageSync();
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
    return {
      getPhoneNumber,
      goUrl,
    };
  },
};
</script>

<style lang="less">
@import "@/style/global.less";
.t-login {
  background-color: #fff;

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
      box-sizing: border-box;
      width: 100%;
      padding: 0 30px;
      margin-top: 66px;

      .nut-button {
        position: relative;
        overflow: hidden;

        button {
          display: inline-block;
          font-size: 18px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: transparent;
          outline: none;
          color: #fff;
        }
      }
    }
  }

  .info-wrap {
    font-size: 12px;
    color: #666666;
    text-align: center;
    padding-bottom: 30px;

    .link {
      color: @color-primary-1;
      display: inline;
    }
  }

  .t-deli-view .deli-view-content {
    background-color: #fff;
  }
}
</style>
