<template>
  <div class="t-v-header" :style="{
    paddingTop: `${menuRect.top}px`,
  }">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64px" height="64px" :src="seller.avatar" />
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- <support-ico :size="1" :type="seller.supports[0].type"></support-ico> -->
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span
      ><span class="bulletin-text">{{ seller.bulletin }}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%" />
    </div>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
export default {
  name: "VHeader",
  components: {},
  setup() {
    const seller = {
      name: "粥品香坊（回龙观）",
      description: "蜂鸟专送",
      deliveryTime: 38,
      score: 4.2,
      serviceScore: 4.1,
      foodScore: 4.3,
      rankRate: 69.2,
      minPrice: 20,
      deliveryPrice: 4,
      ratingCount: 24,
      sellCount: 90,
      bulletin:
        "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
      supports: [
        { type: 0, description: "在线支付满28减5" },
        { type: 1, description: "VC无限橙果汁全场8折" },
        { type: 2, description: "单人精彩套餐" },
        { type: 3, description: "该商家支持发票,请下单写好发票抬头" },
        { type: 4, description: "已加入“外卖保”计划,食品安全保障" },
      ],
      avatar:
        "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
      pics: [
        "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180",
      ],
      infos: [
        "该商家支持发票,请下单写好发票抬头",
        "品类:其他菜系,包子粥店",
        "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
        "营业时间:10:00-20:30",
      ],
    };
    return {
      seller,
      menuRect: Taro.getMenuButtonBoundingClientRect(),
    };
  },
};
</script>

<style lang="less">
.t-v-header {
  position: relative;
  overflow: hidden;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
  .content-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 24px 12px 18px 24px;
    .avatar {
      flex: 0 0 64px;
      width: 64px;
      margin-right: 16px;
      img {
        border-radius: 2px;
      }
    }

    .content {
      flex: 1;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
      }
      .brand {
        width: 30px;
        height: 18px;
        background-image: url(./brand.png);
        background-size: 30px 18px;
        background-repeat: no-repeat;
      }
      .name {
        margin-left: 6px;
        font-size: 16px;
        font-weight: bold;
      }
      .description {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
      }
      .support {
        display: flex;
        align-items: center;
        .support-ico {
          margin-right: 4px;
        }
        .text {
          line-height: 12px;
          font-size: 12px;
        }
      }
    }

    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      display: flex;
      align-items: center;
      padding: 0 8px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      border-radius: 14px;
      background: rgba(7, 17, 27, 0.2);
      .count {
        font-size: 12px-s;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        line-height: 24px;
        font-size: 12px-s;
      }
    }
  }

  .bulletin-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    height: 28px;
    line-height: 28px;
    padding: 0 8px;
    background: rgba(7, 17, 27, 0.2);
    .bulletin-title {
      flex: 0 0 22px;
      width: 22px;
      height: 12px;
      margin-right: 4px;
      background-image: url(./bulletin.png);
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px-s;
    }
    .icon-keyboard_arrow_right {
      flex: 0 0 10px;
      width: 10px;
      font-size: 12px-s;
    }
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
}
</style>
