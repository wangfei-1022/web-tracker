export function formatTime(time) {
  return `${time}`.split(".")[0]
}

export function onload(callback) {
  if (document.readyState === "complete") {
    callback()
  } else {
    window.addEventListener("load", callback)
  }
}

export const clog = (text) => {
  console.log(`%c ${text}`, "color:red")
}

export function merge(obj, target) {
  for (var key in target) {
    obj[key] = target[key]
  }
  return obj
}
