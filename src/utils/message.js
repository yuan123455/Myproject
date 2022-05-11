// 各类弹窗通知封装方法
import { Message, MessageBox, Notification } from "element-ui";

// 提示类确认弹窗
export const confirm = (title) => {
  return new Promise((resolve, reject) => {
    MessageBox.confirm(title, "提示信息", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    }).then(() => {
      return resolve()
    }).catch(() => {
      // Message.info('已取消')
    })
  })
}

// 消息提示类弹窗(带确认按钮)
export const popAlert = (content, title = "消息提示") => {
  MessageBox.alert(content, title, {
    confirmButtonText: '确定',
    callback: action => {
      return
    }
  })
}

// 单个输入框的弹窗加校验规则
export const popPrompt = (title, tips, validate, errmsg, value,) => {
  return new Promise((reslove, reject) => {
    //当校验规则为正则表达式时
    if (typeof (validate) == 'string') {
      MessageBox.prompt(title, tips, {
        inputValue: value,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: new RegExp(validate),
        inputErrorMessage: errmsg
      }).then((res) => {
        reslove(res.value)
      }).catch(() => {
        // Message.info('已取消')   
      });
    }

    // 当校验规则为函数时
    if (validate instanceof Function) {
      MessageBox.prompt(title, tips, {
        inputValue: value,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValidator: (res) => {
          return validate(res)
        },
        inputErrorMessage: errmsg
      }).then((res) => {
        Message.success(res.value)
      }).catch(() => {
        // Message.info('已取消')   
      });
    }
  })
}

// 通知类弹窗
let MessageType = 'success' | 'warning' | 'info' | 'error';
let NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
export const popnotify = (msg, type = MessageType, title, duration = number, positio = NotificationPosition) => {
  if (!title) { title = "提示" }
  if (!duration && duration != 0) { duration = 3000 }
  if (!type) { type = "success" }
  if (!position) { position = undefined }
  Notification({
    title: title,
    message: msg,
    duration: duration,
    type: type,
    position: position
  })
}