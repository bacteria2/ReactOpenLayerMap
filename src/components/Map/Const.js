/**
 * Created by lenovo on 2017/11/10.
 */
import {dangerous,event, goods, hospital, level1, level2, level3, level4, protect, shelter,location, team} from "./mapResource";

export const locationList = [
    {img: dangerous, text: "危险源点", value: "dangerous", visible: false},
    {img: protect, text: "重点防护", value: "protect", visible: false},
    {img: team, text: "应急队伍", value: "team", visible: false},
    {img: goods, text: "应急物资", value: "goods", visible: false},
    {img: hospital, text: "医疗救助", value: "hospital", visible: false},
    {img: shelter, text: "应急避难", value: "shelter", visible: false}
];

export let locationMap = {
    "event": {img: event, text: "事件处置", value: "event"}
};

locationList.forEach(el => locationMap[el.value] = el);


export const statusArray = [
    {label: "正常", description: '正常', levelImg: level1, imgText: "正常等级", color: '#5ffd00'},
    {label: "警示", description: '警示', levelImg: level2, imgText: "警示等级", color: '#fde500'},
    {label: "发生预警", description: '发生预警', levelImg: level3, imgText: "预警等级", color: '#FD6300'},
    {label: "危险", description: '危险', levelImg: level4, imgText: "危险等级", color: '#fd0c1c'},
];

export const measureConfig = {
    strokeColor: "#f4e209",//
    helpTooltip: {
        helpMsg: '单击增加起点',//跟随鼠标的提示框
        offset: [15, 0],
        positioning: 'center-left'
    },
    measureTooltip: {
        measureMsg: '单击增加起点,双击结束',//开始描点以后的提示框
        offset: [0, -15],
        positioning: 'bottom-center'
    },
    measureLayer: {
        fillColor: 'rgba(255, 255, 255, 0.5)',
        strokeColor: '#1d8aa4',
        strokeWidth: 2,
        imageRadius: 7,
        imageFillColor: '#1d8aa4',
    },
    draw: {
        fillColor: 'rgba(255, 255, 255, 0.5)',
        strokeColor: 'rgba(0, 0, 0, 0.5)',
        strokeWidth: 2,
        strokeLineDash: [10, 10],
        imageStrokeColor: 'rgba(0, 0, 0, 0.7)',
        imageRadius: 5,
        imageFillColor: 'rgba(255, 255, 255, 0.2)'

    },
    strokeWidth: 2,//
    imageColor: "#1d8aa4",//
    imageRadius: 7,//
    fillColor: 'rgba(255, 255, 255, 0.2)'//
}

export const layerControlConfig={
    radiusAnalyse:{
        fillColor:'rgba(255, 255, 255, 0.5)',
        stokeWidth:2,
        strokeColor:'rgba(0, 0, 0, 0.5)',
        imageColor:'rgba(255, 255, 255, 0.5)'
    }
}

export const annotationConfig={
    annotation:{
        fillColor:'rgba(255,200,200,0.5)',
        stokeWidth:3,
        strokeColor:"#ff5b58",
        imageSrc:location,
        imageAnchor:[0.5,1]
    }
}
