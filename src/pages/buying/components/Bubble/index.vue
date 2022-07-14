<template>
  <span class="bubble">
    {{ num }}
  </span>
</template>

<script>
export default {
  name: "Bubble",
  props: {
    num: {
      type: Number,
    },
  },
};
</script>

<style lang="less">
.bubble {
  display: inline-block;
  padding: 0 5px;
  height: 16px;
  line-height: 16px;
  text-align: center;
  border-radius: 16px;
  font-family: Helvetica;
  font-weight: 700;
  font-size: 10px;
  color: #fff;
  background: red;
//   background: linear-gradient(to right, #fc9153, #f01414);
}
</style>
