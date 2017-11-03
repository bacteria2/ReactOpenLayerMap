/**
 * Created by lenovo on 2017/10/25.
 */
import {ol} from './mapResource';


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

/**
 * 获取配置的layers
 * */
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