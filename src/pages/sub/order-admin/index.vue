<template>
  <view class="t-order t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="全部订单" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <nut-tabs v-model="status" type="smile" @change="paneChange">
          <nut-tab-pane title="全部" pane-key="all">
            <OrderView
              @handlePrint="handlePrint"
              :status="[]"
              ref="allOrderViewInstance"
            />
          </nut-tab-pane>
          <nut-tab-pane title="待付款" pane-key="obligation">
            <OrderView
              @handlePrint="handlePrint"
              :status="[101]"
              ref="obligationOrderViewInstance"
            />
          </nut-tab-pane>
          <nut-tab-pane title="进行中" pane-key="underway">
            <OrderView
              @handlePrint="handlePrint"
              :status="[201, 301, 401, 402]"
              ref="underwayOrderViewInstance"
            />
          </nut-tab-pane>
          <nut-tab-pane title="售后" pane-key="afterSale">
            <OrderView
              @handlePrint="handlePrint"
              :status="[202, 203]"
              ref="afterSaleOrderViewInstance"
            />
          </nut-tab-pane>
          <nut-tab-pane title="已完成" pane-key="completed">
            <OrderView
              @handlePrint="handlePrint"
              :status="[901]"
              ref="completedOrderViewInstance"
            />
          </nut-tab-pane>
        </nut-tabs>
      </template>
    </DeliView>
  </view>
  <nut-popup
    position="bottom"
    :style="{ height: '80%' }"
    v-model:visible="showBottom"
  >
    <button type="primary" @click="openBluetoothAdapter">开始扫描</button>
    <div class="devices-summary">已发现 {{ devices.length }} 个外围设备：</div>
    <scroll-view style="height: 60%" :scroll-y="true">
      <div
        v-for="item in devices"
        @click="createBLEConnection(item)"
        class="device-item"
        hover-class="device-item-hover"
      >
        <div style="font-size: 16px; color: #333">{{ item.name }}</div>
        <div style="font-size: 10px">UUID: {{ item.deviceId }}</div>
      </div>
    </scroll-view>
    <div class="page-section connected-area" v-if="deviceStatus.connected">
      <div class="connected-info">
        <text style="font-size: 30rpx">已连接到 {{ name }}</text>
        <!-- <div wx:for="{{chs}}" wx:key="index">
          <div>特性UUID: {{ item.uuid }}</div>
          <div>特性值: {{ item.value }}</div>
        </div> -->
      </div>
      <div class="btn-area">
        <button
          v-if="canWrite"
          type="primary"
          @click="writeBLECharacteristicValue"
          style="margin-bottom: 10px"
        >
          写数据
        </button>
        <button @click="closeBLEConnection">断开连接</button>
      </div>
    </div>
  </nut-popup>
</template>
<script>
const LAST_CONNECTED_DEVICE = "last_connected_device";
import Taro, { useDidShow } from "@tarojs/taro";
import { ref, reactive, nextTick } from "vue";
import { add, multiply, subtract, divide } from "@/utils/math";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import OrderItem from "./components/OrderItem.vue";
import OrderView from "./components/OrderView.vue";
const PrinterJobs = require("./printer/printerjobs");
const printerUtil = require("./printer/printerutil");
export default {
  name: "Order",
  components: {
    DeliView,
    DeliNavbar,
    OrderItem,
    OrderView,
  },
  setup() {
    const instance = Taro.getCurrentInstance();
    const status = ref('all');
    const showBottom = ref(false);
    const _discoveryStarted = ref(false);
    const devices = ref([]);
    const canWrite = ref(false);
    const addNewAddress = () => {};

    const _deviceId = ref("");
    const _serviceId = ref("");
    const _characteristicId = ref("");

    const params = reactive({
      pageNo: 1,
      pageSize: 10,
    });
    const allOrderViewInstance = ref(); // 全部
    const obligationOrderViewInstance = ref(); // 待付款
    const underwayOrderViewInstance = ref(); // 进行中
    const afterSaleOrderViewInstance = ref(); // 售后
    const completedOrderViewInstance = ref(); // 已完成

    const orderViewInstanceMap = {
      all: allOrderViewInstance,
      obligation: obligationOrderViewInstance,
      underway: underwayOrderViewInstance,
      afterSale: afterSaleOrderViewInstance,
      completed: completedOrderViewInstance,
    };

    // 滚动到顶部/左边，会触发 scrolltoupper 事件
    const upper = () => {
    };
    // 滚动到底部/右边，会触发 scrolltolower 事件
    const lower = () => {
      params.pageNo++;
      handleGetOrderPage();
    };
    const scroll = () => {
    };

    const paneChange = ({ title, paneKey }) => {
      orderViewInstanceMap[`${paneKey}`].value.handleGetOrderPage();
    };

    const inArray = (arr, key, val) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][key] === val) {
          return i;
        }
      }
      return -1;
    };

    const onBluetoothDeviceFound = () => {
      Taro.onBluetoothDeviceFound((res) => {
        res.devices.forEach((device) => {
          if (!device.name && !device.localName) {
            return;
          }
          const foundDevices = devices.value;
          const idx = inArray(foundDevices, "deviceId", device.deviceId);
          if (idx === -1) {
            devices.value[foundDevices.length] = device;
          } else {
            devices.value[idx] = device;
          }
        });
      });
    };

    const startBluetoothDevicesDiscovery = () => {
      if (_discoveryStarted.value) {
        return;
      }
      _discoveryStarted.value = true;
      Taro.startBluetoothDevicesDiscovery({
        success: (res) => {
          onBluetoothDeviceFound();
        },
        fail: (res) => {
        },
      });
    };

    const openBluetoothAdapter = () => {
      Taro.openBluetoothAdapter({
        success: (res) => {
          startBluetoothDevicesDiscovery();
        },
        fail: (res) => {
          if (res.errCode === 10001) {
            Taro.showModal({
              title: "错误",
              content: "未找到蓝牙设备, 请打开蓝牙后重试。",
              showCancel: false,
            });
            Taro.onBluetoothAdapterStateChange((res) => {
              if (res.available) {
                // 取消监听，否则stopBluetoothDevicesDiscovery后仍会继续触发onBluetoothAdapterStateChange，
                // 导致再次调用startBluetoothDevicesDiscovery
                Taro.onBluetoothAdapterStateChange(() => {});
                startBluetoothDevicesDiscovery();
              }
            });
          }
        },
      });
    };
    const deviceStatus = ref({
      connected: false,
      name: "",
      deviceId: "",
    });

    const getBLEDeviceCharacteristics = (deviceId, serviceId) => {
      Taro.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          // 这里会存在特征值是支持write，写入成功但是没有任何反应的情况
          // 只能一个个去试
          for (let i = 0; i < res.characteristics.length; i++) {
            const item = res.characteristics[i];
            if (item.properties.write) {
              canWrite.value = true;
              showBottom.value = false;
              _deviceId.value = deviceId;
              _serviceId.value = serviceId;
              _characteristicId.value = item.uuid;
              break;
            }
          }
        },
        fail(res) {
          console.error("getBLEDeviceCharacteristics", res);
        },
      });
    };

    const getBLEDeviceServices = (deviceId) => {
      Taro.getBLEDeviceServices({
        deviceId,
        success: (res) => {
          for (let i = 0; i < res.services.length; i++) {
            if (res.services[i].isPrimary) {
              getBLEDeviceCharacteristics(deviceId, res.services[i].uuid);
              return;
            }
          }
        },
      });
    };
    const createBLEConnection = (device) => {
      const deviceId = device.deviceId;
      const name = device.name;
      Taro.showLoading();
      Taro.createBLEConnection({
        deviceId,
        success: () => {
          deviceStatus.value.connected = true;
          deviceStatus.value.name = name;
          deviceStatus.value.deviceId = deviceId;
          getBLEDeviceServices(deviceId);
          Taro.setStorage({
            key: LAST_CONNECTED_DEVICE,
            data: name + ":" + deviceId,
          });
        },
        complete() {
          Taro.hideLoading();
        },
        fail: (res) => {
        },
      });
      stopBluetoothDevicesDiscovery();
    };

    const stopBluetoothDevicesDiscovery = () => {
      Taro.stopBluetoothDevicesDiscovery({
        complete: () => {
          _discoveryStarted.value = false;
        },
      });
    };

    const ab2hex = (buffer) => {
      const hexArr = Array.prototype.map.call(
        new Uint8Array(buffer),
        function (bit) {
          return ("00" + bit.toString(16)).slice(-2);
        }
      );
      return hexArr.join(",");
    };

    const _writeBLECharacteristicValue = (buffer) => {
      Taro.writeBLECharacteristicValue({
        deviceId: _deviceId.value,
        serviceId: _serviceId.value,
        characteristicId: _characteristicId.value,
        value: buffer,
        success(res) {
        },
        fail(res) {
        },
      });
    };

    const writeBLECharacteristicValue = (orderDetail) => {
      let printerJobs = new PrinterJobs();
      printerJobs
        .print("2018年12月5日17:34")
        .print(printerUtil.fillLine())
        .setAlign("ct")
        .setSize(2, 2)
        .print("#美食盒子部落")
        .setSize(1, 1)
        .print("大竹林烤鱼干锅家常菜")
        .setSize(2, 2)
        .print("在线支付(已支付)")
        .setSize(1, 1)
        .setAlign("lt")
        .print(`订单号：${orderDetail.orderNo}`)
        .print(`下单时间：${orderDetail.createTime}`)
        // .print(printerUtil.fillAround())
        .print(printerUtil.fillLine());
      let packingCharges = 0;
      orderDetail.orderItemList.forEach((item) => {
        printerJobs.print(
          printerUtil.inline(
            `${item.skuName} * ${item.count}`,
            String(multiply(item.count, item.price))
          )
        );
        packingCharges = add(
          packingCharges,
          multiply(item.count, item.packageAmt)
        );
      });
      printerJobs
        // .print(printerUtil.fillAround())
        .print(printerUtil.fillLine())
        .print(printerUtil.inline(`打包费：`, `${String(packingCharges)}`))
        .print(printerUtil.fillLine())
        // .setAlign("rt")
        .print(printerUtil.inline(`团购名`, `${orderDetail.groupPurchaseName}`))
        .print(printerUtil.inline(`折扣`, `${orderDetail.discount}折`));
      if (orderDetail.couponName) {
        printerJobs.print(`使用　优惠卷`, `${orderDetail.couponName}`);
      }
      if (orderDetail.point) {
        printerJobs.print(`使用积分`, `${orderDetail.point}`);
      }
      printerJobs
        .print(printerUtil.inline(`原价`, `${orderDetail.totalAmount}`))
        .print(printerUtil.inline(`总价`, `${orderDetail.payAmount}`))
        .setAlign("lt")
        .print(printerUtil.fillAround("收货信息"))
        .print(printerUtil.inline(`电话`, `${orderDetail.phone}`))
        .print(printerUtil.inline(`地址`, `${orderDetail.deliveryAddress}`))
        .print(printerUtil.inline(`送达时间`, `${orderDetail.deliveryTime}`))
        .print(printerUtil.fillLine())
        .print(`${orderDetail.remark}`)
        .print(printerUtil.fillLine())
        .println();

      let buffer = printerJobs.buffer();
      // 1.并行调用多次会存在写失败的可能性
      // 2.建议每次写入不超过20字节
      // 分包处理，延时调用
      const maxChunk = 20;
      const delay = 20;
      for (
        let i = 0, j = 0, length = buffer.byteLength;
        i < length;
        i += maxChunk, j++
      ) {
        let subPackage = buffer.slice(
          i,
          i + maxChunk <= length ? i + maxChunk : length
        );
        setTimeout(_writeBLECharacteristicValue, j * delay, subPackage);
      }
    };

    const closeBLEConnection = () => {
      Taro.closeBLEConnection({
        deviceId: deviceStatus.value.deviceId,
      });
      canWrite.value = false;
    };

    const handlePrint = (orderDetail) => {
      if (canWrite.value && orderDetail) {
        writeBLECharacteristicValue(orderDetail);
      } else {
        showBottom.value = true;
      }
    };
    const back = () => {
      Taro.reLaunch({
        url: "/pages/main/home/index?active=1",
      });
    }

    useDidShow(() => {
      const statusParams = instance.router.params.status;
      status.value = statusParams
      nextTick(() => {
        orderViewInstanceMap[`${status.value}`].value.handleGetOrderPage()
      });
    })
    
    return {
      back,
      addNewAddress,
      status,
      upper,
      lower,
      scroll,
      allOrderViewInstance,
      obligationOrderViewInstance,
      underwayOrderViewInstance,
      afterSaleOrderViewInstance,
      completedOrderViewInstance,
      paneChange,
      showBottom,
      openBluetoothAdapter,
      devices,
      createBLEConnection,
      writeBLECharacteristicValue,
      closeBLEConnection,
      deviceStatus,
      canWrite,
      handlePrint,
    };
  },
};
</script>
<style lang="less">
@import "../../../common.less";
.t-order {
  .nut-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
    .nut-tabs__titles {
      background: #fff;
    }

    .nut-tabs__content {
      flex: 1;
      background-color: @default-bg-color;

      .nut-tab-pane {
        background-color: @default-bg-color;
        padding: 0;
        height: 100%;
        position: relative;
      }
    }
  }
}

page {
  height: 100%;
}

.t-container {
  height: 100%;
  width: 100%;
}
</style>
