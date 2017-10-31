/**
 * Created by lenovo on 2017/10/25.
 */
//import ol from "openlayers";

import {ol} from './mapLib';




/**
 * Format length output.
 * @param {ol.geom.LineString} line The line.
 * @return {string} The formatted length.
 */
function formatLength(line) {
    let length = ol.Sphere.getLength(line);
    let output;
    if (length > 1000) {
        output = (Math.round(length / 1000 * 100) / 100) +
            ' ' + 'km';
    } else {
        output = (Math.round(length * 100) / 100) +
            ' ' + 'm';
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
        output = (Math.round(area / 1000000 * 100) / 100) +
            ' ' + 'km<sup>2</sup>';
    } else {
        output = (Math.round(area * 100) / 100) +
            ' ' + 'm<sup>2</sup>';
    }
    return output;
}


/*function measureTool() {
    ele = document.getElementById('measureTool');
    ele.style.display == "none" ? ele.style.display = "block" : ele.style.display = "none"
}
/!**
 *
 * *!/
function pointerMoveHandler(evt) {
    if (evt.dragging) return
    var helpMsg = 'Click to start drawing';
    if (sketch) {
        var geom = (sketch.getGeometry());
        if (geom instanceof ol.geom.Polygon) {
            helpMsg = continuePolygonMsg;
        } else if (geom instanceof ol.geom.LineString) {
            helpMsg = continueLineMsg;
        }
    }

    helpTooltipElement.innerHTML = helpMsg;
    helpTooltip.setPosition(evt.coordinate);

    helpTooltipElement.classList.remove('hidden');
}
/!**
 * Creates a new help tooltip
 *!/
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
    });
    map.addOverlay(helpTooltip);
}

/!**
 * Creates a new measure tooltip
 *!/
function createMeasureTooltip() {
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

function addInteraction() {
    var type = (typeSelect == 'area' ? 'Polygon' : 'LineString');
    draw = new ol.interaction.Draw({
        source: source,
        type: /!** @type {ol.geom.GeometryType} *!/ (type),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 0.5)',
                lineDash: [10, 10],
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 5,
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.7)'
                }),
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                })
            })
        })
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    var listener;
    draw.on('drawstart',
        function (evt) {
            // set sketch
            sketch = evt.feature;

            /!** @type {ol.Coordinate|undefined} *!/
            var tooltipCoord = evt.coordinate;

            listener = sketch.getGeometry().on('change', function (evt) {
                var geom = evt.target;
                var output;
                if (geom instanceof ol.geom.Polygon) {
                    output = formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                measureTooltipElement.innerHTML = output;
                measureTooltip.setPosition(tooltipCoord);
            });
        }, this);

    draw.on('drawend',
        function () {
            measureTooltipElement.className = 'tooltip tooltip-static';
            measureTooltip.setOffset([0, -7]);
            // unset sketch
            sketch = null;
            // unset tooltip so that a new one can be created
            measureTooltipElement = null;
            createMeasureTooltip();
            ol.Observable.unByKey(listener);
        }, this);
}*/

/**
 *  获取最大分辨率
 *  eg:getMaxResolution('EPSG:3857')
 * */
function getMaxResolution(system) {
    if (!system)
        return null;
    if (system === 'EPSG:4490')
        return ol.extent.getWidth([-180, -90, 180, 90]) / 256;
    let  projection = ol.proj.get(system);
    return ol.extent.getWidth(projection.getExtent()) / 256;
}
/**
 *  获取地图范围
 *  eg:getExtent('EPSG:3857')
 * */
function getExtent(system) {
    if (!system)
        throw new Error("system is null");
    if (system === 'EPSG:4490')
        return [-180, -90, 180, 90];
    return ol.proj.get(system).getExtent()
}
/**
 * 获取原点
 * */
function getOrigin(system) {
    if (!system)
        throw new Error("system is null");
    if (system === 'EPSG:4490')
        return [-180, 90];
    return ol.extent.getTopLeft(getExtent(system))
}
/**
 * 获取分辨率
 * */
function getResolution(system, matrixIds) {
    if (!system || !Array.isArray(matrixIds))
        throw new Error("system is null or matrixIds isn't an array");
    let maxRes = getMaxResolution(system);
    return matrixIds.map(el => maxRes / Math.pow(2, parseInt(el)));
}



/**
 * 根据矩阵ID获取tileGrid
 * */
function getTileGrid(system, matrixIds) {
    if (!system || !Array.isArray(matrixIds))
        throw new Error("system is null or matrixIds isn't an array");
    return  new ol.tilegrid.WMTS({
        origin: getOrigin(system),
        extent:getExtent(system),
        resolutions: getResolution(system,matrixIds),
        matrixIds: matrixIds
    })
}

export function getControls(controlArray){
    if (!Array.isArray(controlArray)||controlArray.length===0)
        return [];
    let controls={
       zoomSlider:ol.control.ZoomSlider,
        fullScreen:ol.control.FullScreen,
        scaleLine:ol.control.ScaleLine
    }

    return controlArray.map(el=>{
        if(controls[el])
            return new controls[el]();
    })
}

export function getLayers(system,layers){
    if (!Array.isArray(layers)||layers.length===0)
        return [];
    return layers.map(el=>{
        let {maxResolution,minResolution,
            source:{
              name,layer,url,style,matrixSet,format,matrixIds
            }
        }=el;

        let tileGrid=getTileGrid(system,matrixIds);

        let _source=new ol.source.WMTS({
            name,layer,url,style,matrixSet,format,tileGrid
        });

        return new ol.layer.Tile({
            maxResolution,minResolution,source:_source
        })
    })
}