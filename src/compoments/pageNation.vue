<template>
  <div class="page">
    <el-pagination
      v-if="count"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="offset"
      :page-sizes="limit"
      :page-size="size"
      :total="count"
      background
      layout="total, sizes, prev, pager, next, jumper"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    count: {
      typeof: Number,
    },
    limit: {
      typeof: Array,
      default: () => [1, 2, 3, 10, 20],
    },
  },
  data() {
    return {
      size: this.limit[0], //条数
      offset: 1,
    };
  },
  watch: {
    size: {
      immediate: true,
      handler(newval) {
        this.$emit("setData", newval, this.offset);
      },
    },
    offset(newval) {
      // if(this.count<=0){
      //   return;
      // }
      this.$emit("setData", this.size, newval);
    },
  },
  computed: {},
  methods: {
    handleSizeChange(val) {
      //条数
      this.size = val;
      this.offset = 1;
    },
    handleCurrentChange(val) {
      this.offset = val;
      //页码监听
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.page {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 0px;
}
</style>