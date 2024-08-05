import excuteQueue from "../log/excuteQueue"
import { onload } from "../util/index"

function getSelector(element) {
  var selector
  if (element.id) {
    selector = `#${element.id}`
  } else if (element.className && typeof element.className === "string") {
    selector =
      "." +
      element.className
        .split(" ")
        .filter(function (item) {
          return !!item
        })
        .join(".")
  } else {
    selector = element.nodeName.toLowerCase()
  }
  return selector
}

export function injectBlankScreen() {
  const wrapperSelectors = ["body", "html", "#app"]
  let emptyPoints = 0
  function isWrapper(element) {
    let selector = getSelector(element)
    if (wrapperSelectors.indexOf(selector) >= 0) {
      emptyPoints++
    }
  }
  onload(function () {
    let xElements, yElements
    for (let i = 1; i <= 9; i++) {
      xElements = document.elementsFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2)
      yElements = document.elementsFromPoint(window.innerWidth / 2, (window.innerHeight * i) / 10)
      isWrapper(xElements[0])
      isWrapper(yElements[0])
    }
    if (emptyPoints >= 0) {
      let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
      excuteQueue.run({
        logType: "monitor",
        logCode: "BLANK_SCREEN",
        logName: "白屏",
        emptyPoints: "" + emptyPoints,
        screen: window.screen.width + "x" + window.screen.height,
        viewPoint: window.innerWidth + "x" + window.innerHeight,
        elementType: getSelector(centerElements[0]),
      })
    }
  })
}
