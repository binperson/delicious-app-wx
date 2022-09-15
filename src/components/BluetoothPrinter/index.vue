<template>
  <div @click="handlePrinter" class="bluetooth-printer">
    <slot> </slot>
  </div>
  <nut-popup
    position="bottom"
    closeable
    round
    :style="{ height: '60%' }"
    v-model:visible="show"
  >
  </nut-popup>
</template>
<script>
import { ref } from "vue";
export default {
  name: "BluetoothPrinter",
  setup(_, { emit }) {
    const show = ref(false);

    const handlePrinter = () => {
      openBluetoothAdapter();
    };

    const openBluetoothAdapter = () => {

    };

    return {
      show,
      handlePrinter,
    };
  },
};
</script>
<style lang="less">
.bluetooth-printer {
  display: inline-block;
}
</style>
