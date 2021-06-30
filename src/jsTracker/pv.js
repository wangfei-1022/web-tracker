import log from './log';
export function injectPv() {
    var connection = navigator.connection;
    log.send({
        kind: 'PRODUCT',
        type: 'PV',
        effectiveType: connection.effectiveType, //网络环境
        rtt: connection.rtt,//往返时间
        screen: `${window.screen.width}x${window.screen.height}`//设备分辨率
    });
    let startTime = Date.now();
    window.addEventListener('unload', () => {
        let stayTime = Date.now() - startTime;
        log.send({
            kind: 'PRODUCT',
            type: 'STAY_TIME',
            stayTime
        });
    }, false);

}