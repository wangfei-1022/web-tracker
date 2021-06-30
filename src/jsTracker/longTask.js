import log from './log';
import { formatTime, getLastEvent, getSelector } from '../util/index';
export function longTask() {
    new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
            if (entry.duration > 100) {
                let lastEvent = getLastEvent();
                requestIdleCallback(() => {
                    log.send({
                        kind: 'PERFORMANCE',
                        type: 'LONG_TASK',
                        eventType: lastEvent.type,
                        startTime: formatTime(entry.startTime),// 开始时间
                        duration: formatTime(entry.duration),// 持续时间
                        selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
                    });
                });
            }
        });
    }).observe({ entryTypes: ["longtask"] });
}