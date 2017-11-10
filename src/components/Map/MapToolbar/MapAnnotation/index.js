/**
 * Created by lenovo on 2017/11/1.
 * 用于添加标记并且返回
 */
import React, {Component} from "react";
import {location, ol} from "../../mapResource";
import {locationMap,annotationConfig} from "../../Const";

function getAnnotationLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: annotationConfig.annotation.fillColor
            }),
            image: new ol.style.Icon({
                src: annotationConfig.annotation.imageSrc,
                anchor: annotationConfig.annotation.imageAnchor
            })
        })
    })
}


function getEventLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector(),
        selectable: true,
    })
}

export default class MapAnnotation extends Component {
    constructor(props) {
        super(props);
        this.map = props.map;
        //annotationLayer
        this.layer = getAnnotationLayer();
        //eventLayer;
        this.eventLayer = getEventLayer();

        this.map.addLayer(this.layer);
        this.map.addLayer(this.eventLayer);
        this.draw = new ol.interaction.Draw({
            source: this.layer.getSource(),
            type: 'Point'
        })
        this.draw.setActive(false);
        this.draw.on('drawend', _ => {
            this.draw.setActive(false);
        });

        this.map.addInteraction(this.draw);
        let eventBus = props.eventBus;

        eventBus.on("annotationAdd", this.addAnnotation);
        eventBus.on("locationDisplay", this.displayLocation)

    }

    /**
     *  新增标记
     * */
    addAnnotation = ({source}) => {
        let sendCoordBack = evt => {
            let coord = evt.feature.getGeometry().getCoordinates();
            source.postMessage({type: 'annotationLocated', data: coord}, window.origin);
            this.draw.un('drawend', sendCoordBack);
        }
        this.draw.on('drawend', sendCoordBack);
        this.layer.getSource().clear();
        this.draw.setActive(true)
    }

    /**
     * 展示带可点击时间的地点
     * */
    locationWithOverlay = evt => {
        let {coordinate, featureInfo, radius} = evt.data;
        if (featureInfo) {
            let local = locationMap[featureInfo.type];
            if (local) {
                let feature = new ol.Feature({
                    geometry: new ol.geom.Point(coordinate),
                    featureInfo: {
                        type: featureInfo.type,
                        data: featureInfo
                    }
                });
                feature.setStyle(new ol.style.Style({
                    image: new ol.style.Icon({
                        src: local.img
                    })
                }));

                this.eventLayer.getSource().addFeature(feature)
            }
        }
        //如果半径>0
        if (radius > 0) {
            let feature = new ol.Feature({
                geometry: new ol.geom.Circle(coordinate, radius)
            });

            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: annotationConfig.circle.fillColor
                }),
                stroke: new ol.style.Stroke({
                    width: annotationConfig.circle.stokeWidth,
                    color:annotationConfig.circle.strokeColor
                }),
            }))
            this.layer.getSource().addFeature(feature);
            console.log(radius,coordinate)
        }
    }

    /**
     * 展示标记
     * */
    displayLocation = evt => {
        let {coordinate, featureInfo} = evt.data;
        //清理旧坐标
        this.layer.getSource().clear();
        this.eventLayer.getSource().clear();

        //拿不到featureInfo,则默认显示
        if (!featureInfo) {
            this.layer.getSource().addFeature(new ol.Feature({
                geometry: new ol.geom.Point(coordinate)
            }));
        } else {
            this.locationWithOverlay(evt);
        }
    }

    render() {
        return <div className="layer_item_swtich item" onClick={el => this.draw.setActive(true)}>
            <span className="icon iconfont">&#xe501;</span>
            <span className="name">添加标记</span>
        </div>
    }

}