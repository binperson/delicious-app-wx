<template>
  <view class="t-order-item">
    <div class="top">
      <div class="sn">订单号：12345678</div>
      <div class="status">已取消</div>
    </div>
    <div class="order-content">
      <img
        width="57px"
        height="57px"
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F19%2F20190219140255_mkuch.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649158655&t=d3f358785848b00675721f39378f4917"
      />
      <div class="desc">
        <div class="goods">拉面说乐山红油捞面321g*2/组</div>
        <div class="num-desc">等1件商品</div>
      </div>
      <view class="r">
        <nut-icon name="right" />
      </view>
    </div>
    <div class="more">
      <div class="time">
        2022-01-12 00:10:23
      </div>
      <div class="price-content">
        实付金额：
        <div class="price">
          ¥59.0
        </div>
      </div>
    </div>
    <div class="op-content">
      <nut-button size="mini" type="default" @click="handleDelete"
        >删除订单</nut-button
      >
    </div>
  </view>
</template>
<script>
import { ref } from "vue";
export default {
  name: "OrderItem",
  components: {},
  setup() {

    const handleDelete = () => {
      wx.showModal({
        title: "提示？",
        content: "是否确认删除订单",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });

    };

    return { handleDelete };
  },
};
</script>
<style lang="less">
.t-order-item {
  padding: 12px;
  background: #fff;

  .top,
  .more {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
    font-size: 14px;
  }

  .more {
    .price-content {
      display: flex;
      align-items: center;

      .price {
        color: #444;
      }
    }
  }

  .op-content {
    margin-top: 14px;
    opacity: 0.8;
    display: flex;
    flex-direction: row-reverse;
  }

  .order-content {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .desc {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 0 20px 0 16px;
      color: #444;
      font-size: 15px;

      .goods {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        white-space: nowrap;
      }

      .num-desc {
        margin-left: 12px;
      }
    }

    .r {
      position: relative;
      top: 2px;
    }
  }
}
</style>
