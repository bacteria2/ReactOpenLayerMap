/**
 * Created by lenovo on 2017/10/25.
 */
import {ol} from './mapResource';

const earthSphere=new ol.Sphere(6378137);
/**
 *  获取最大分辨率
 *  eg:getMaxResolution('EPSG:3857')
 * */
function getMaxResolution(system) {
    if (!system)
        return null;
    let maxResolution=ol.extent.getWidth(ol.proj.get(system).getExtent()) / 256;
    return maxResolution
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
function getTileGrid(system, matrixIds,extent) {
    if (!system || !Array.isArray(matrixIds))
        throw new Error("system is null or matrixIds isn't an array");
    return  new ol.tilegrid.WMTS({
        origin: getOrigin(system),
        extent:extent||getExtent(system),
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

/**
 * 获取配置的layers
 * */
export function getLayers(system,layers){
    if (!Array.isArray(layers)||layers.length===0)
        return [];
    return layers.map(el=>{
        let {maxResolution,minResolution,
            source:{
                extent,name,layer,url,style,matrixSet,format,matrixIds
            }
        }=el;

        let tileGrid=getTileGrid(system,matrixIds,extent);

        let _source=new ol.source.WMTS({
            name,layer,url,style,matrixSet,format,tileGrid
        });

        return new ol.layer.Tile({
            maxResolution,minResolution,source:_source
        })
    })
}

export function formatLength(line,projection="EPSG:3857 ") {
    let length = ol.Sphere.getLength(line,{projection});
    let output;
    if (length > 1000) {
        output = `${Math.round(length / 1000 * 100) / 100} km`;
    } else {
        output = `${Math.round(length * 100) / 100} m`;
    }
    return output;
}


/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
export function formatArea(polygon,projection="EPSG:3857 ") {
    let area = ol.Sphere.getArea(polygon,{projection});
    let output;
    if (area > 10000) {
        output = `${Math.round(area / 1000000 * 100) / 100} km`;
    } else {
        output = `${Math.round(area * 100) / 100} m`;
    }
    return output;
}

/**
 * resovle distance of two point
 * */
export function distanceBetween(local1,local2,mapProject){
    return earthSphere.haversineDistance(
        ol.proj.transform(local1,mapProject,"EPSG:4326"),
        ol.proj.transform(local2,mapProject,"EPSG:4326")
    );
}