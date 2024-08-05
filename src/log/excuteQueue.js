import log from "./log"

class ExcuteQueue {
  constructor() {
    this.state = "NULL"
    this.list = []
    this.timer = null
  }

  excute() {
    if (this.list.length === 0) {
      this.state = "NULL"
      return
    }
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      var item = this.list.shift()
      this.state = "RUNING"
      log.send(item.data, () => {
        this.state = "NULL"
        if (item.callback && typeof item.callback == "function") {
          item.callback()
        }
        this.excute() // 继续执行下一个
      })
    }, 1000)
  }

  run(data, callback) {
    let logs = log.initData(data)
    //校验发送的格式是否合格
    if (!log.validate(logs)) {
      return
    }
    // 同样的报错 不继续提交
    if (logs.message) {
      let index = this.list.findIndex(item => item.data.message === logs.message)
      if (index >= 0) {
        return
      }
    }
    this.list.push({
      data: logs,
      callback
    })
    if (this.state !== "RUNING") {
      this.excute()
    }
  }
}

const excuteQueue = new ExcuteQueue()
export default excuteQueue
