<template>
  <div>
    我的藏书:实现对已阅读书籍进行分类展示，同时能够对书籍进行上传、下载、搜索书籍、添加读后感、修改读后感
    <el-header height="200">
      <search :SearchList="list" :mode="FromList" @search="search1"></search>
      <upload UploadName="图书上传"></upload>
    </el-header>
    <el-main>
      <Table :cols="tableList" :tableData="tableData" :count="count"></Table>
    </el-main>
  </div>
</template>

<script>
import upload from "@/compoments/upload.vue";
import Search from "@/compoments/search.vue";
import Table from "@/compoments/table.vue";
export default {
  components: {
    upload,
    Search,
    Table,
  },
  props: {},
  data() {
    return {
      list: [{ label: "书名", prop: "name", type: "search" }], //上传文件
      Frommode: {}, //搜索表单数据
      tableData: [], //表格数据
      tableList: [
        {
          label: "测试内容",
          prop: "first",
          type: "text",
          align: "left",
        },
        {
          label: "测试内容1",
          prop: "second",
          type: "text",
        },
      ], //表头
      count: 0,
      FromList: {
        first: "1",
        second: "2",
      }, //搜索表单值
    };
  },
  watch: {},
  computed: {},
  methods: {
    change(file, fileList) {
      // console.log("文件改变", file, fileList);
      this.list.push(file);
    },
    search1(val) {},
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>