import excuteQueue from "../log/excuteQueue"

export function injectConsoleError() {
  console.error = (function (origin) {
    return function (info) {
      if (typeof info === "string") {
        excuteQueue.run({
          logType: "monitor",
          type: "ERROR",
          logCode: "CONSOLE_ERROR",
          logName: "控制台错误",
          message: info,
          elementType: "page",
        })
      } else if (typeof info === "object") {
        excuteQueue.run({
          logType: "monitor",
          logCode: "CONSOLE_ERROR",
          logName: "控制台错误",
          message: info.message,
          stack: info.stack,
          elementType: "page",
        })
      }
      origin.call(console, info)
    }
  })(console.error)
}
