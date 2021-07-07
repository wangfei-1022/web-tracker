import { clog } from '../util/index'

class SendLog {
    constructor() {
        this.xhr = new XMLHttpRequest();
    }

    init(config) {
        this.appCode = config.appCode;
        this.host = config.host;
        this.version = config.version;
        this.project = config.host;
        this.logstore = config.host;
        this.url = `https://${config.project}.${config.host}/logstores/${config.logstore}/track`;
    }

    _getData(data = {}) {
        let extraData = {
            appCode: this.appCode, //项目代码
            version: this.version,
            pageTitle: document.title,
            pageUrl: location.href,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        };
        let logs = { ...extraData, ...data };
        for (let key in logs) {
            if (typeof logs[key] === 'number') {
                logs[key] = "" + logs[key];
            }
        }
        return logs
    }

    _validate(data) {
        if (!data.appCode) {
            clog('请先设置项目代码[appCode]');
            return false
        }
        if (!data.version) {
            clog('请先设置项目版本号[version]');
            return false
        }
        if (!data.logType) {
            clog('请先设置项目类型[logType]');
            return false
        }
        if (!data.logCode) {
            clog('请先设置目标对象代码[logCode]');
            return false
        }
        if (!data.logName) {
            clog('请先设置目标对象名称[logName]');
            return false
        }
        return true
    }

    send(data = {}, callback) {
        this.sendPost(data, callback)
    }

    sendPost(data = {}, callback) {
        let logs = this._getData(data);
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

    sendGet(data = {}, callback) {
        let logs = this._getData(data);
        //校验发送的格式是否合格
        if (!this._validate(logs)) {
            return
        }
        let str = ''
        Object.keys(logs).forEach(function (key) {
            str += '&' + key + '=' + logs[key]
        })
        let url = `http://${this.project}.${this.host}/logstores/${this.logstore}/track_ua.gif?APIVersion=0.6.0` + str

        this.xhr.open("GET", url, true);
        this.xhr.onload = function () {
            if ((this.status >= 200 && this.status <= 300) || this.status == 304) {
                callback && callback();
            }
        }
        this.xhr.onerror = function (error) {
            console.log('error', error);
        }
        this.xhr.send();
    }

    sendImg(data = {}, callback) {
        let logs = this._getData(data);
        //校验发送的格式是否合格
        if (!this._validate(logs)) {
            return
        }
        var str = ''
        Object.keys(logs).forEach(function (key) {
            str += '&' + key + '=' + logs[key]
        })
        var img = document.createElement('img');
        img.src = `http://${this.project}.${this.host}/logstores/${this.logstore}/track_ua.gif?APIVersion=0.6.0` + str
    }

}

export default new SendLog();