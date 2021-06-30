let lastEvent;
['click', 'pointerdown', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(event => {
    document.addEventListener(event, (event) => {
        lastEvent = event;
    }, {
            capture: true,//capture 控制监听器是在捕获阶段执行还是在冒泡阶段执行 
            passive: true //passive 的意思是顺从的，表示它不会对事件的默认行为说 no
        });
});
export function getLastEvent() {
    return lastEvent;
};

export function formatTime(time) {
    return `${time}`.split(".")[0]
}

const getSelectorDom = function (path) {
    return path.reverse().filter(function (element) {
        return element !== window && element !== document;
    }).map(function (element) {
        var selector;
        if (element.id) {
            selector = `#${element.id}`;
        } else if (element.className && typeof element.className === 'string') {
            selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
        } else {
            selector = element.nodeName;
        }
        return selector;
    }).join(' ');
}
export function getSelector(pathsOrTarget) {
    if (Array.isArray(pathsOrTarget)) {
        return getSelectorDom(pathsOrTarget);
    } else {
        var paths = [];
        var element = pathsOrTarget;
        while (element) {
            paths.push(element);
            element = element.parentNode;
        }
        return getSelectorDom(paths);
    }
}

export function onload(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
};

export const clog = (text) => {
    console.log(`%c ${text}`, 'color:red')
}
export function merge(obj, target) {
    for (var key in target) {
        obj[key] = target[key]
    }
    return obj
}