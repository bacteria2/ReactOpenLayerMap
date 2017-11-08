/**
 * Created by lenovo on 2017/11/7.
 */
export default class  EventHandler{

    constructor(){
        this.eventListners={
            "annotationAdd":[],
            "radiusAnalyse":[],
            "locationDisplay":[],
        }

        //postmessage监听
        window.addEventListener('message',event=>{
            let{data:{type}}=event;

            let handlerList=this.eventListners[type];
            if(Array.isArray(handlerList)){
                handlerList.forEach(fn=>fn.call(window,event))
            }
        })
    }

    on=(event, fn) =>{
        if (typeof fn !== 'function')
            return;
        this.eventListners[event]&&this.eventListners[event].push(fn)
    }

    un =(event, fn) => {
        if (typeof fn !== 'function')
            return;
        let i = this.eventListners[event].indexOf(fn);
        if (i >-1) {
            this.eventListners[event].splice(i, 1);
            this.un(event, fn)
        }
    }



}
