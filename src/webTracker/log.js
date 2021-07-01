import { clog } from '../util/index'

class SendLog {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    init(config) {
        this.pcode = config.pcode;
        this.host = config.host;
        this.version = config.version;
        this.project = config.host;
        this.logstore = config.host;
        this.url = `http://${config.project}.${config.host}/logstores/${config.logstore}/track`;
    }

    _getData() {
        return {
            pcode: this.pcode, //项目代码
            version: this.version,
            title: document.title,
            url: location.href,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        };
    }

    _validate(data) {
        if (!data.pcode) {
            clog('请先设置项目代码[pcode]');
            return false
        }
        if (!data.version) {
            clog('请先设置项目版本号[version]');
            return false
        }
        return true
    }

    send(data = {}, callback) {
        let extraData = this._getData();
        let logs = { ...extraData, ...data };
        for (let key in logs) {
            if (typeof logs[key] === 'number') {
                logs[key] = "" + logs[key];
            }
        }

        //校验发送的格式是否合格
        if (!this._validate(logs)) {
            return
        }

        let body = JSON.stringify({
            __logs__: [logs]
        });
        this.xhr.open("POST", this.url, true);
        this.xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhr.setRequestHeader('x-log-apiversion', '0.6.0');
        this.xhr.setRequestHeader('x-log-bodyrawsize', body.length);
        this.xhr.onload = function () {
            if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
                callback && callback();
            }
        }
        this.xhr.onerror = function (error) {
            console.log('error', error);
        }
        this.xhr.send(body);
    }


}

export default new SendLog();