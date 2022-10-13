import excuteQueue from "../log/excuteQueue"
import { onload, formatTime } from "../util/index"

export function injectPerf() {
  let FMP, LCP
  new PerformanceObserver((entryList, observer) => {
    let perfEntries = entryList.getEntries()
    FMP = perfEntries[0]
    observer.disconnect()
  }).observe({ entryTypes: ["element"] })

  new PerformanceObserver((entryList, observer) => {
    const perfEntries = entryList.getEntries()
    const lastEntry = perfEntries[perfEntries.length - 1]
    LCP = lastEntry
    observer.disconnect()
  }).observe({ entryTypes: ["largest-contentful-paint"] })

  new PerformanceObserver(function (entryList, observer) {
    const firstInput = entryList.getEntries()[0]
    if (firstInput) {
      let inputDelay = firstInput.processingStart - firstInput.startTime //处理延迟
      let duration = firstInput.duration //处理耗时
      if (firstInput > 0 || duration > 0) {
        //第一输入延迟（FID）测量用户首次与您的站点交互时的时间 //计算出的延迟时间
        excuteQueue.add({
          logType: "monitor",
          logCode: "PERFORMANCE_FIRST_INPUT_DELAY",
          logName: "第一输入延迟",
          elementType: "page",
          inputDelay: inputDelay ? formatTime(inputDelay) : 0,
          duration: duration ? formatTime(duration) : 0,
          startTime: firstInput.startTime,
        })
      }
    }
    observer.disconnect()
  }).observe({ type: "first-input", buffered: true })

  onload(function () {
    setTimeout(() => {
      const { fetchStart, connectStart, connectEnd, requestStart, responseStart, responseEnd, domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd, loadEventStart } =
        performance.timing
      log.send({
        logType: "monitor",
        logCode: "PERFORMANCE_TMING",
        logName: "性能计时",
        elementType: "page",
        connectTime: connectEnd - connectStart, //TCP连接耗时
        ttfbTime: responseStart - requestStart, //ttfb
        responseTime: responseEnd - responseStart, //Response响应耗时
        parseDOMTime: loadEventStart - domLoading, //DOM解析渲染耗时
        domContentLoadedTime: domContentLoadedEventEnd - domContentLoadedEventStart, //DOMContentLoaded事件回调耗时
        timeToInteractive: domInteractive - fetchStart, //首次可交互时间
        loadTime: loadEventStart - fetchStart, //完整的加载时间
      })
      const FP = performance.getEntriesByName("first-paint")[0]
      const FCP = performance.getEntriesByName("first-contentful-paint")[0]

      excuteQueue.add({
        logType: "monitor",
        logCode: "PERFORMANCE_PAINT",
        logName: "首次绘制",
        elementType: "page",
        firstPaint: FP ? formatTime(FP.startTime) : 0,
        firstContentPaint: FCP ? formatTime(FCP.startTime) : 0,
        firstMeaningfulPaint: FMP ? formatTime(FMP.startTime) : 0,
        largestContentfulPaint: LCP ? formatTime(LCP.renderTime || LCP.loadTime) : 0,
      })
    }, 3000)
  })
}
