/**
 * Created by lenovo on 2017/11/1.
 */
import React, {Component} from "react";
import {location, ol} from "../../mapLib";

const AnnotationConfig = {}


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
            console.log(evt.feature.getGeometry().getCoordinates())
        });

        this.map.addInteraction(this.draw);
    }
    componentDidMount(){
        this.addAnnotation([12614135.26, 2648243.60])
    }

    addAnnotation(coord) {
        let anno = new ol.Feature({
            geometry: new ol.geom.Point(coord)
        })
        this.layer.getSource().addFeature(anno);
    }


    render() {
        return <div className="layer_item_swtich item" onClick={el=>this.draw.setActive(true)}>
            <span className="icon iconfont">&#xe501;</span>
            <span className="name">添加标记</span>
        </div>
    }

}