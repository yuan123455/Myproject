<template>
  <div class="Login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      label-position="left"
    >
      <el-form-item label="用户名:" prop="username">
        <el-input
          type="text"
          v-model="ruleForm.username"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="验证码:" prop="code">
        <el-input
          type="text"
          v-model="ruleForm.code"
          autocomplete="off"
        ></el-input>
        <canvas
          @click="reactDraw()"
          id="yzm"
          width="120px"
          height="40px"
        ></canvas>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api";
export default {
  components: {},
  props: {},
  data() {
    var checkCode = (rule, val, callback) => {
      console.log(val, this.verification, "123");
      if (val.trim() != this.verification) {
        return callback(new Error("验证码错误,请重新输入"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: "admin",
        pass: "123",
        code: "",
      }, //表单数据,
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        pass: [{ required: true, message: "请输入密码" }],
        code: [
          { required: true, message: "请输入验证码" },
          { validator: checkCode, trigger: "blur" },
        ],
      }, //效验规则
      ctx: null, //画笔
      verification: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    //登录
    submitForm(val) {
      this.$router.push("/index/mybook");
      return;
      this.$refs["ruleForm"].validate((val) => {
        if (val) {
          //发送请求
          login({
            username: this.ruleForm.username,
            password: this.ruleForm.pass,
          }).then((res) => {
            if (res.status == 200) {
              this.$router.push("/index/mybook");
            }
          });
        }
      });
    },
    //重置
    resetForm() {
      this.$refs["ruleForm"].resetFields();
      this.verification = "";
    },
    //绘制验证码
    reactDraw() {
      this.verification = "";
      this.ctx.clearRect(0, 0, 120, 40);
      this.ctx.fillStyle = this.randomColor(170, 250);
      this.ctx.fillRect(0, 0, 120, 40);
      var data =
        "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
      for (let i = 0; i < 120; i += 30) {
        let c = data.substr(this.ranbNum(0, data.length - 1), 1);
        this.verification += c; //保存验证码用户效验
        this.ruleForm.code = this.verification; //自动输入验证码
        this.ctx.fillStyle = this.randomColor(60, 160); //字体颜色
        this.ctx.font = this.ranbNum(15, 40) + "px SimHei"; //字体大小,字体
        this.ctx.fillText(c, i + this.ranbNum(5, 12), 30, 120); //字体填充(字内容,x轴,y轴)
      }
      //   //绘制干扰线
      //   for (let i = 0; i < 15; i++) {
      //     this.ctx.beginPath();
      //     this.ctx.moveTo(this.ranbNum(0, 120), this.ranbNum(0, 40));
      //     this.ctx.lineTo(this.ranbNum(0, 120), this.ranbNum(0, 40));
      //     this.strokeStyle = this.randomColor(60, 160);
      //     this.ctx.stroke();
      //   }
      //绘制干扰点
      for (let i = 0; i < 15; i++) {
        this.ctx.beginPath();
        this.ctx.arc(
          this.ranbNum(0, 120),
          this.ranbNum(0, 40),
          this.ranbNum(0, 3),
          0,
          Math.PI * 2
        );
        this.ctx.strokeStyle = this.randomColor(60, 200);
        this.ctx.stroke();
      }
    },
    randomColor(min, max) {
      let r = Math.floor(Math.random() * (max - min) + 1 + min);
      let g = Math.floor(Math.random() * (max - min) + 1 + min);
      let b = Math.floor(Math.random() * (max - min) + 1 + min);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    ranbNum(min, max) {
      return Math.floor(Math.random() * (max - min) + 1) + min;
    },
  },
  created() {},
  mounted() {
    // canvas绘制验证码;
    let canvas = document.querySelector("#yzm");
    this.ctx = canvas.getContext("2d");
    this.reactDraw();
    //自动输入验证码
    this.ruleForm.code = this.verification;
  },
};
</script>
<style lang="less" scoped>
.Login {
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  align-items: center;
  /deep/ .el-form {
    width: 430px;
    height: 250px;
    padding: 10px;
    border: 1px solid #fff6f8;
    box-sizing: border-box;
    .el-form-item:nth-of-type(3) {
      width: 100%;
      height: 40px;
      .el-form-item__content {
        width: 338px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        .el-input {
          width: 200px;
        }
        #yzm {
          border: 1px solid #666;
          margin-left: 15px;
          box-sizing: border-box;
          display: inline-block;
        }
      }
    }
  }
}
</style>