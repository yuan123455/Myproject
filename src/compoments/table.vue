<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="copyData"
      :border="border"
      style="width: 100%"
      :lazy="lazy"
      :row-key="rowKey"
      :load="load"
    >
      //序号
      <el-table-column
        v-if="serial"
        type="index"
        fixed="left"
        width="100"
        header-align="center"
        min-width="60"
        align="center"
      >
        <template slot="header">
          <div class="d-flex">
            <span style="white-space: nowrap">序号</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, i) in crosObj"
        :key="'array' + i"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width || 120"
        :fixed="item.fixed"
        header-align="center"
        show-overflow-tooltip
        :align="item.align || 'center'"
      >
        <template slot-scope="scope">
          <template v-if="item.type === 'text' && !item.edit">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
          <template v-if="item.type === 'custom'">
            <slot :name="item.prop" :data="scope.row" :column="item" />
          </template>
        </template>
      </el-table-column>
    </el-table>
    <page-nation
      :count="count"
      :limit="limit"
      :fetch="fetch"
      @setData="setData"
    ></page-nation>
  </div>
</template>

<script>
import PageNation from "./pageNation.vue";
export default {
  components: { PageNation },
  props: {
    tableData: {
      typeof: Array,
      default: () => [],
    },
    cols: {
      typeof: Object,
      default: () => {},
    },
    border: {
      typeof: Boolean,
      default: true,
    },
    lazy: {
      typeof: Boolean,
      default: true,
    },
    rowKey: {
      typeof: !String,
    },
    load: {
      typeof: Function,
    },
    serial: {
      typeof: Boolean,
      default: true,
    },
    count: {
      typeof: Number,
    },
    limit: {
      typeof: Array,
    },
    fetch: {
      typeof: Function,
    },
  },
  data() {
    return {
      crosObj: [],
      copyData: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    setData(size, page) {
      this.copyData = this.tableData.slice((page - 1) * size, size * page);
    },
  },
  created() {
    this.crosObj = this.cols.slice(0);
    this.copyData = this.tableData.slice(0);
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>