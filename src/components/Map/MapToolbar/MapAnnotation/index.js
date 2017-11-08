/**
 * Created by lenovo on 2017/11/1.
 * 用于添加标记并且返回
 */
import React, {Component} from "react";
import {location, ol} from "../../mapResource";

function getAnnotationLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill:new ol.style.Fill({
                color:'red'
            }),
            image: new ol.style.Icon({
                src: location,
                anchor: [0.5, 1]
            })
        })
    })
}



export default class MapAnnotation extends Component {
    constructor(props) {
        super(props);
        this.map = props.map;
        this.layer = getAnnotationLayer();
        this.map.addLayer(this.layer);

        this.draw = new ol.interaction.Draw({
            source: this.layer.getSource(),
            type: 'Point'
        })
        this.draw.setActive(false);

        this.draw.on('drawend',evt=>{
            this.draw.setActive(false);
           // console.log(evt.feature.getGeometry().getCoordinates())
        });

        this.map.addInteraction(this.draw);
        let eventBus=props.eventBus;

        eventBus.on("annotationAdd",this.addAnnotation);
        eventBus.on("locationDisplay",this.displayLocation)
    }

    addAnnotation=({source})=>{
        let sendCoordBack=evt=>{
            let coord= evt.feature.getGeometry().getCoordinates();
            source.postMessage({type:'annotationLocated',data:coord},window.origin);
            this.draw.un('drawend',sendCoordBack);
        }
        this.draw.on('drawend',sendCoordBack);
        this.layer.getSource().clear();
        this.draw.setActive(true)
    }

    displayLocation=(evt)=> {
        let {coordinate}=evt.data
        //清理旧坐标
        this.layer.getSource().clear();
        this.layer.getSource().addFeature( new ol.Feature({
            geometry: new ol.geom.Point(coordinate)
        }));
    }


    render() {
        return <div className="layer_item_swtich item" onClick={el=>this.draw.setActive(true)}>
            <span className="icon iconfont">&#xe501;</span>
            <span className="name">添加标记</span>
        </div>
    }

}