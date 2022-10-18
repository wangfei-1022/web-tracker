import log from "./log"

class ExcuteQueue {
  constructor() {
    this.state = "NULL"
    this.list = []
  }

  add(data, callback) {
    this.list.push({
      data,
      callback,
    })
    if (this.state !== "RUNING") {
      this.run()
    }
  }

  run() {
    if(this.list.length <= 0){
      this.state = "NULL"
      return
    }
    var item = this.list.shift()
    if (item && item.data) {
      this.state = "RUNING"
      log.send(item.data, () => {
        this.state = "NULL"
        if (item.callback && typeof item.callback == "function") {
          item.callback()
        }
      })
    }
  }
}

export default new ExcuteQueue()
