/**
 * Created by lenovo on 2017/10/26.
 */

let Map = {};

Map.Qingxin = {
    center: [113.05, 23.71625],
    projection: "EPSG:4490",
    maxZoom: 19,
    minZoom: 9,
    zoom: 13,
    layers: [
        {
            maxResolution:0.0028,
            minResolution:0.00008,
            source: {
                name: "L9_L14",
                layer: "L9_L14D",
                url: "http://19.168.104.247/qy_dlg_gov/wmts",
                style: "L9_L14",
                matrixSet: "Matrix_0",
                format: "image/tile",
                matrixIds:['9', '10', '11', '12', '13', '14'],
                type:"WMTS",
            }
        },
        {
            maxResolution:0.0028,
            minResolution:0.00008,
            source: {
                name: "L9_L14zj",
                layer: "L9_L14DLGZJ",
                url: "http://19.168.104.247/qy_dlg_gov_zj/wmts",
                style: "L9_L14zj",
                matrixSet: "Matrix_6",
                matrixIds:[ '9', '10', '11', '12', '13', '14'],
                format: "image/tile",
                type:"WMTS"
            }
        },
        {
            maxResolution:0.00008,
            minResolution:0.00001,
            source: {
                name: "L15_L17",
                layer: "DLG_GOV_L15toL17",
                url: "http://19.168.104.247/qy_dlg_gov/wmts",
                style: "DLG_GOV_L15toL17",
                matrixSet: "Matrix_6",
                format: "image/tile",
                matrixIds:[ '15', '16', '17'],
                type:"WMTS",
            }
        },
        {
            maxResolution:0.00008,
            minResolution:0.00001,
            source: {
                name: "L15_L17zj",
                layer: "test",
                url: "http://19.168.104.247/qy_dlg_gov_zj/wmts",
                style: "test",
                matrixSet: "Matrix_0",
                matrixIds:[ '15', '16', '17'],
                format: "image/tile",
                type:"WMTS"
            }
        },
        {
            maxResolution:0.00001,
            minResolution:0.0000026,
            source: {
                name: "L18_L19",
                layer: "L20",
                url: "http://19.168.104.247/qy_dlg_gov/wmts",
                style: "L20",
                matrixSet: "Matrix_3",
                format: "image/tile",
                matrixIds:['18', '19'],
                type:"WMTS",
            }
        },
        {
            maxResolution:0.00001,
            minResolution:0.0000026,
            source: {
                name: "L18_L19zj",
                layer: "L20",
                url: "http://19.168.104.247/qy_dlg_gov_zj/wmts",
                style: "L20",
                matrixSet: "Matrix_3",
                format: "image/tile",
                matrixIds:[ '18', '19'],
                type:"WMTS"
            }
        }
    ],
    controls: ['zoomSlider', 'scaleLine']
};

Map.Tian = {
    center: [12614135.26, 2647243.60],
    projection: "EPSG:3857",
    maxZoom: 18,
    minZoom: 1,
    zoom: 12,
    layers: [
        {
            type:"Tile",
            source: {
                name: "map",
                layer: "vec",
                url: "http://t0.tianditu.com/vec_w/wmts",
                style: "default",
                matrixSet: "w",
                format: "tiles",
                matrixIds:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                type:"WMTS"
            }
        },{
            type:"Tile",
            source: {
                name: "chinese-annotation",
                layer: "cva",
                url: "http://t0.tianditu.com/cva_w/wmts",
                style: "default",
                matrixSet: "w",
                matrixIds:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19'],
                format: "tiles",
                type:"WMTS"
            }
        }
    ],
    controls: ['zoomSlider', 'scaleLine']
};


export default Map;