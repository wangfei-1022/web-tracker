import tracker from '../util/tracker';
import onload from '../util/onload';
function getSelector(element) {
    var selector;
    if (element.id) {
        selector = `#${element.id}`;
    } else if (element.className && typeof element.className === 'string') {
        selector = '.' + element.className.split(' ').filter(function (item) { return !!item }).join('.');
    } else {
        selector = element.nodeName.toLowerCase();
    }
    return selector;
}
export function blankScreen() {
    const wrapperSelectors = ['body', 'html', '#container', '.content'];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelector(element);
        if (wrapperSelectors.indexOf(selector) >= 0) {
            emptyPoints++;
        }
    }
    onload(function () {
        let xElements, yElements;
        debugger
        for (let i = 1; i <= 9; i++) {
            xElements = document.elementsFromPoint(window.innerWidth * i / 10, window.innerHeight / 2)
            yElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight * i / 10)
            isWrapper(xElements[0]);
            isWrapper(yElements[0]);
        }
        if (emptyPoints >= 0) {
            let centerElements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2)
            tracker.send({
                kind: 'stability',
                type: 'blank',
                emptyPoints: "" + emptyPoints,
                screen: window.screen.width + "x" + window.screen.height,
                viewPoint: window.innerWidth + 'x' + window.innerHeight,
                selector: getSelector(centerElements[0]),
            })
        }
    });
}
//screen.width  屏幕的宽度   screen.height 屏幕的高度
//window.innerWidth 去除工具条与滚动条的窗口宽度 window.innerHeight 去除工具条与滚动条的窗口高度