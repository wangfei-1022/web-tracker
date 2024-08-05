let lastEvent
;["click", "pointerdown", "touchstart", "mousedown", "keydown", "mouseover"].forEach((event) => {
  document.addEventListener(
    event,
    (event) => {
      lastEvent = event
    },
    {
      capture: true, 
      passive: true
    }
  )
})

export function getLastEvent() {
  return lastEvent
}

export function getLines(stack) {
  if (!stack) {
    return ""
  }
  return stack
    .split("\n")
    .slice(1)
    .map((item) => item.replace(/^\s+at\s+/g, ""))
    .join("^")
}

const getSelectorDom = function (path) {
  return path
    .reverse()
    .filter(function (element) {
      return element !== window && element !== document
    })
    .map(function (element) {
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
        selector = element.nodeName
      }
      return selector
    })
    .join(" ")
}

export function getSelector(pathsOrTarget) {
  if (Array.isArray(pathsOrTarget)) {
    return getSelectorDom(pathsOrTarget)
  } else {
    var paths = []
    var element = pathsOrTarget
    while (element) {
      paths.push(element)
      element = element.parentNode
    }
    return getSelectorDom(paths)
  }
}
