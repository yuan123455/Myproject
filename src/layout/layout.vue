<template>
  <div>
    <canvas id="mycanvas" width="500px" height="500px"></canvas>
  </div>
</template>

<script>
import { flower } from "./canvas.js";
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {
    let canvas = document.getElementById("mycanvas");
    let cas = canvas.getContext("2d");
    //   let arrflower = [];
    //   while (arrflower.length < 10) {
    //     arrflower.push(new flower(cas, [500, 100], [200, 0]));
    //   }
    //  setInterval(() => {
    //     cas.clearRect(0, 0, 500, 500);
    //     for (let i = 0; i < arrflower.length; i++) {
    //       arrflower[i].show();
    //       if (arrflower[i].startX < 0 || arrflower[i].startY > 500) {
    //         arrflower.splice(i, 1, new flower(cas, [500, 100], [200, 0]));
    //       }
    //     }
    //   }, 60);
  },
};
</script>
<style lang="less" scoped>
#mycanvas {
  border: 1px solid #000;
  margin: 0 auto;
  display: block;
}
</style>