<template>
  <div>
    <el-upload
      ref="upload"
      action="#"
      :list-type="listType"
      :auto-upload="false"
      :file-list="fileList"
      :on-change="(file, fileList) => $emit('change', file, fileList)"
      :before-upload="(file) => $emit('upload', file)"
      :on-success="
        (res, file, fileList) => $emit('success', res, file, fileList)
      "
      :http-request="fileRequest"
    >
      <template v-if="listType == 'picture-card'">
        <i slot="default" class="el-icon-plus"></i>
        <div slot="file" slot-scope="{ file }">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <i class="el-icon-download"></i>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
            >
              <i class="el-icon-delete"></i>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-button @click="Upload" type="primary" style="margin-top: 5px"
      >上传</el-button
    >
  </div>
</template>

<script>
import { FileUpload, download } from "@/api/index.js";
export default {
  name: "BokeUpload",
  props: {
    fileList: {
      typeof: Array,
      default: () => [],
    },
    listType: {
      typeof: String,
      default: "text",
    },
  },
  data() {
    return {
      disabled: false,
    };
  },

  mounted() {},

  methods: {
    handleRemove(file) {
      //点击移除
      this.$confirm("确认要删除改文件").then((res) => {
        for (const i in this.fileList) {
          if (this.fileList[i].uid === file.uid) {
            this.fileList.splice(i);
          }
        }
      });
    },
    handleDownload(file) {
      //点击下载
      download(file.name).then((res) => {
        // console.log(res, "文件下载");
        if (
          !!window.ActiveXObject ||
          "ActiveXObject" in window ||
          navigator.userAgent.indexOf("Edge") > -1
        ) {
          navigator.msSaveBlob(blobs, fileName);
          loading && loading.close();
        } else {
          let arr = [];
          arr.push(res);
          let url = window.URL.createObjectURL(
            new Blob(arr, { type: "application/octet-stream" })
          );
          let link = document.createElement("a");
          link.style.display = "none";
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
        }
      });
    },
    fileRequest(item) {
      const { file } = item;
      var formData = new FormData();
      formData.append("file", file);
      FileUpload(formData)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          this.$message.error("文件上传失败:", err);
        });
    },
    Upload() {
      this.$refs.upload.submit();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>