/**
 * Created by lenovo on 2017/10/26.
 */
import config from "../config";

export default class Message {
    constructor() {
        this._openWin();
        this.eventListner = {
            'annotationLocated': [],
        }
        window.addEventListener('message', event => {
            let {type, data} = event.data;
            let callBackList = this.eventListner[type];
            if (Array.isArray(callBackList))
                callBackList.forEach(el => el.call(window,data))
        })
    }

    _openWin = () => {
        if (!this.win || this.win.closed)
            this.win  = window.open(config.mapWinDomain, "gis",
                `height=${config.mapWinHeight}, width=${config.mapWinWidth}, top=0, left=20, toolbar=no, menubar=no, scrollbars=no, resizable=yes,location=no, status=no`);
        return this.win&&!this.win.closed
    };

    info() {
        console.log(this.win);
    }

    executeWithWinOpened(fn,...args) {
        if( this.win.closed){
            window.confirm("地图窗口已被关闭,是否重新打开？")&&this._openWin()&& this.win.addEventListener("DOMContentLoaded", function(){fn(...args)})
        }else{
            fn(...args)
        }
    }

    annotationAdd=()=>this.executeWithWinOpened(()=> this.win.postMessage({type: 'annotationAdd'}, window.origin));

    locationDisplay=([x,y])=>this.executeWithWinOpened(
        ([p1,p2])=> this.win.postMessage({type: 'locationDisplay', coordinate: [p1, p2]}, window.origin)
        ,[x,y]);

    radiusAnalyse=(target)=>this.executeWithWinOpened(
        location=> this.win.postMessage({type: 'radiusAnalyse', location}, window.origin)
        ,target);

    on(event, fn) {
        if (typeof fn !== 'function')
            return
        this.eventListner[event]&&this.eventListner[event].push(fn)
    }

    un(event, fn) {
        if (this.eventListner[event]&& typeof fn !== 'function')
            return
        let i = this.eventListner[event].indexOf(fn);
        if (i > 0) {
            this.eventListner[event].splice(i, 1);
            this.un(event, fn)
        }
    }
}

window.Message = Message;

