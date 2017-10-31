/**
 * Created by lenovo on 2017/10/27.
 */
import React, {Component} from "react";
import {ol} from "../mapLib";
import './measureTools.css'
/**
 * Format length output.
 * @param {ol.geom.LineString} line The line.
 * @return {string} The formatted length.
 */
function formatLength(line) {
    let length = ol.Sphere.getLength(line);
    let output;
    if (length > 1000) {
        output = `${Math.round(length / 1000 * 100) / 100} km`;
    } else {
        output =`${Math.round(length * 100) / 100} m`;
    }
    return output;
}


/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
function formatArea(polygon) {
    let area = ol.Sphere.getArea(polygon);
    let output;
    if (area > 10000) {
        output = `${Math.round(area / 1000000 * 100) / 100} km<sup>2</sup>` ;
    } else {
        output = `${Math.round(area * 100) / 100} m<sup>2</sup>`;
    }
    return output;
}

let sketch;
let helpTooltipElement;
let helpTooltip;
let measureLayer;
let measureTooltipElement;
let measureTooltip;
let draw; // global so we can remove it later


const measureConfig = {
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
    measureLayer:{
        fillColor:'rgba(255, 255, 255, 0.5)',
        strokeColor:'#1d8aa4',
        strokeWidth:2,
        imageRadius:7,
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

export function getMeasureLayer() {
    if(!measureLayer)
       measureLayer = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: measureConfig.measureLayer.fillColor
            }),
            stroke: new ol.style.Stroke({
                color: measureConfig.measureLayer.strokeColor,
                width: measureConfig.measureLayer.strokeWidth
            }),
            image: new ol.style.Circle({
                radius: measureConfig.measureLayer.imageRadius,
                fill: new ol.style.Fill({
                    color:measureConfig.measureLayer.imageFillColor
                })
            })
        })
    });

    return measureLayer;
}

/**
 * Creates a new help tooltip
 */
function createHelpTooltip(map) {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: measureConfig.helpTooltip.offset,
        positioning: measureConfig.helpTooltip.positioning
    });

    map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip(map) {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
    });
    map.addOverlay(measureTooltip);
}

function pointerMoveHandler(evt) {
    if (evt.dragging) {
        return;
    }
    helpTooltipElement.innerHTML = measureConfig.helpTooltip.helpMsg;
    helpTooltip.setPosition(evt.coordinate);
}


export function addInteraction(typeSelect, map, source) {
    let type = (typeSelect === 'area' ? 'Polygon' : 'LineString');

    draw = new ol.interaction.Draw({
        source,
        type: /** @type {ol.geom.GeometryType} */ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: measureConfig.draw.fillColor
            }),
            stroke: new ol.style.Stroke({
                color: measureConfig.draw.strokeColor,
                lineDash: measureConfig.draw.strokeLineDash,
                width: measureConfig.draw.strokeWidth
            }),
            image: new ol.style.Circle({
                radius: measureConfig.draw.imageRadius,
                stroke: new ol.style.Stroke({
                    color: measureConfig.draw.imageStrokeColor
                }),
                fill: new ol.style.Fill({
                    color: measureConfig.draw.imageFillColor
                })
            })
        })
    });
    map.addInteraction(draw);

    createMeasureTooltip(map);
    createHelpTooltip(map);

    map.on('pointermove', pointerMoveHandler);
    helpTooltipElement.classList.remove('hidden');


    let listener;
    var output;
    draw.on('drawstart', function (evt) {
        map.un('pointermove', pointerMoveHandler)
        helpTooltipElement.classList.add('hidden');
        // set sketch
        sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML =
                `${output}<span ></span><br>${measureConfig.measureTooltip.measureMsg}`;
            measureTooltip.setPosition(tooltipCoord);
        });
    }, this);

    draw.on('drawend', function (evt) {

        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltipElement.innerHTML = output ;

        var iconElement=document.createElement("span");
        let feature=evt.feature;
        let dom=measureTooltipElement;
        iconElement.className='icon iconfont icon-chuyidong measure-close-btn';
        iconElement.onclick=function (e) {
            //清理线
            measureLayer.getSource().removeFeature(feature)
            //清理measure
            dom.parentNode.removeChild(dom);
        }

        measureTooltipElement.append(iconElement);
        measureTooltip.setOffset([0, -15]);

        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip(map);
        ol.Observable.unByKey(listener);

        map.removeInteraction(draw);
        evt.stopPropagation();

        //     map.un('pointermove',pointerMoveHandler)
    }, this);
}
