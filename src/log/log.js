import { clog } from "../util/index"

class SendLog {
  constructor() {
    this.xhr = new XMLHttpRequest()
  }

  init(config) {
    this.appId = config.appId
    this.host = config.host
    this.version = config.version
    this.project = config.host
    this.logstore = config.host
    this.aliyunUrl = `https://${config.project}.${config.host}/logstores/${config.logstore}`
    this.postUrl = config.url ? config.url : (this.aliyunUrl + '/track')
    this.getUrl = config.url ? config.url : (this.aliyunUrl + '/track_ua.gif?APIVersion=0.6.0')
  }

  initData(data = {}) {
    let extraData = {
      appId: this.appId, //项目代码
      version: this.version,
      pageTitle: document.title,
      pageUrl: location.href,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };
    let logs = { ...extraData, ...data };
    for (let key in logs) {
      // Value in log is not string data type
      if (logs[key] === null || logs[key] === undefined) {
        logs[key] = ""
      } else if (typeof logs[key] === 'number') {
        logs[key] = "" + logs[key];
      }
      if (Object.prototype.toString.call(logs[key]) === '[object Object]') {
        logs[key] = JSON.stringify(logs[key])
      }
    }
    return logs
  }

  validate(data) {
    if (!data.appId) {
      clog("请先设置项目代码[appId]")
      return false
    }
    if (!data.version) {
      clog("请先设置项目版本号[version]")
      return false
    }
    if (!data.logType) {
      clog("请先设置项目类型[logType]")
      return false
    }
    if (!data.logCode) {
      clog("请先设置目标对象代码[logCode]")
      return false
    }
    if (!data.logName) {
      clog("请先设置目标对象名称[logName]")
      return false
    }
    return true
  }

  send(data = {}, callback) {
    var method = data.method
    delete data.method
    switch (method) {
      case "GET":
        this.sendGet(data, callback)
        break
      case "IMG":
        this.sendImg(data, callback)
        break
      case "POST":
      default:
        this.sendPost(data, callback)
        break
    }
  }

  sendPost(logs = {}, callback) {
    let body = JSON.stringify({
      __logs__: [logs],
    })
    this.xhr.open("POST", this.postUrl, true)
    this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    this.xhr.setRequestHeader("x-log-apiversion", "0.6.0")
    this.xhr.setRequestHeader("x-log-bodyrawsize", body.length)
    this.xhr.onload = function () {
      if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
        callback && callback()
      }
    }
    this.xhr.onerror = function (error) {
      callback && callback()
      console.log("error", error)
    }
    this.xhr.send(body)
  }

  sendGet(logs = {}, callback) {
    let str = ""
    Object.keys(logs).forEach(function (key) {
      str += "&" + key + "=" + logs[key]
    })
    let url = this.getUrl + str
    this.xhr.open("GET", url, true)
    this.xhr.onload = function () {
      if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
        callback && callback()
      }
    }
    this.xhr.onerror = function (error) {
      callback && callback()
      console.log("error", error)
    }
    this.xhr.send()
  }

  sendImg(logs = {}, callback) {
    var str = ""
    Object.keys(logs).forEach(function (key) {
      str += "&" + key + "=" + logs[key]
    })
    var img = document.createElement("img")
    img.setAttribute("class", "img-responsive")
    img.src = this.getUrl + str
    img.onload = () => {
      callback && callback()
    }
    img.onerror = (error) => {
      callback && callback()
      console.log("error", error)
    }
  }
}

const log = new SendLog()
export default log
