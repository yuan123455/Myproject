<template>
  <div>
    <el-container>
      <el-aside width="200px" class="maxheight">
        <el-row>
          <el-col :span="24">
            <el-menu
              :default-active="currentIndex"
              class="el-menu-vertical-demo"
              :router="true"
              @open="open"
            >
              <el-menu-item-group>
                <el-menu-item
                  v-for="(item, i) in menuList"
                  :key="i"
                  :index="String(i)"
                  :route="item.router"
                >
                  <template slot="title">
                    <!-- <i class="el-icon-location"></i> -->
                    <span>{{ item.name }}</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      menuList: [
        {
          name: "我的藏书",
          child: [],
          router: "/index/mybook",
        },
        {
          name: "笔记",
          child: [],
          router: "/index/notes",
        },
        {
          name: "时光剪影",
          child: [],
          router: "/index/photo",
        },
        {
          name: "学习记录",
          child: [],
          router: "/index/record",
        },
      ],
      currentIndex: "0", //激活菜单
    };
  },
  watch: {},
  computed: {},
  methods: {
    open(index) {
      //菜单激活
      this.currentIndex = index;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
.maxheight {
  height: 100vh;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;
  /deep/ .el-menu {
    border-right: none;
  }
}
</style>