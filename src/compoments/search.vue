<template>
  <div class="search">
    <div class="searchFrom">
      <el-form ref="form" :model="form" label-width="80px">
        <template v-for="(item, i) in List">
          <div :key="'item' + i" class="d-flex ai-center">
            <template v-if="item.type == 'custom'">
              <div class="ChildLine">
                <div class="tips" :style="{ width: labelWidth + 'px' }">
                  <span style="color: red" v-if="item.required">*</span>
                  <span class="title">{{ item.label }} :</span>
                </div>
                <slot :name="item.prop"></slot>
              </div>
            </template>
            <template v-if="item.type == 'search'">
              <div class="ChildLine">
                <span style="color: red" v-if="item.required">*</span>
                <span class="title">{{ item.label }} :</span>
                <el-input
                  :maxlength="item.max"
                  v-model.trim="form[item.prop]"
                  :placeholder="item.place || '请输入'"
                ></el-input>
                <!-- <span class="tipsRed" v-if="validateTips[item.prop]">{{
                  validateTips[item.prop]
                }}</span> -->
              </div>
            </template>
            <template v-if="item.type == 'select'">
              <div class="ChildLine">
                <span style="color: red" v-if="item.required">*</span>
                <span class="title">{{ item.label }} :</span>
                <el-select
                  v-model="form[item.prop]"
                  :placeholder="item.place"
                  :clearable="true"
                >
                  <option
                    v-for="(items, i) in item.select"
                    :key="'select_' + i"
                    :label="items.label || items.text"
                    :value="items.value"
                  ></option>
                </el-select>
              </div>
            </template>
          </div>
        </template>
      </el-form>
    </div>
    <div class="btn">
      <el-button type="primary" @click="(val) => $emit('search', form)"
        >查询</el-button
      >
      <el-button @click="reset">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    SearchList: {
      typeof: Array,
      default: () => [],
      form: {},
    },
    mode: {
      typeof: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        keyword: "",
      },
      List: [],
      validateFun: {}, //效验函数
      oldTime: "",
    };
  },
  watch: {
    // List: {
    //   deep: true,
    //   handler(newval, oldval) {
    //     this.List = JSON.parse(JSON.stringify(newval));
    //     console.log(this.List);
    //   },
    // },
  },
  computed: {},
  methods: {
    reset() {
      let d = new Date();
      console.log(d.getSeconds(), "@", d.getMilliseconds());
      this.form = {};
    },
    //过滤
    filterLine(val, type) {
      //出发自定义规则

      //对输入的数据进行效验
      const vals = this.form[val];
      if (this.validateFun[val]) {
        //对配置的规则先效验
      }
    },
    //生成效验规则
    sliceValidate(arr) {
      if (arr && arr.length) {
        arr.forEach((item, i) => {
          const filterList = [];
          if (item.required) {
            let funcValidate;
            if (item.type == "dateList" || item.type == "inputList") {
              funcValidate = (val) => {
                if (!val[0]) {
                  return `${item.label}第一项不能为空`;
                } else if (!val[1]) {
                  return `${item.label}第二项不能为空`;
                }
                if (val[0] && val[1]) {
                  return false;
                }
              };
            } else {
              funcValidate = (val) => {
                if (!val) {
                  return `${item.label}为必填项`;
                }
                return false;
              };
            }
            filterList.push(funcValidate);
            this.$set(this.validateFun, item.prop, filterList);
          }
        });
      }
    },
    //生成place提示
    format(arr) {
      arr.forEach((item) => {
        item.place = `请输入${item.label}`;
      });
      return arr;
    },
  },
  created() {
    this.List = JSON.parse(JSON.stringify(this.SearchList));
    this.List = this.format(this.List);
    // this.sliceValidate(this.List);
    this.form = this.mode;
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.search {
  width: 100%;
  min-height: 90px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  .searchFrom {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    .ChildLine {
      width: 100%;
      height: 45px;
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      align-items: center;
      justify-content: space-around;
      .title {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        flex-direction: column;
        width: 100px;
      }
    }
  }
  .btn {
    width: 150px;
    height: 40px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-content: center;
    margin-left: 20px;
  }
}
</style>