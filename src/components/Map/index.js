/**
 * Created by lenovo on 2017/10/25.
 */
import React, {Component} from "react";
import proj4 from "proj4";
import {ol} from "./mapResource";
import './index.css'
import {getControls, getLayers} from "./MapHelper";
import MapConfig from "./MapConfig/index";
import Toolbar from "./MapToolbar";

function mapInitialize({
                           projection = "EPSG:3857", controls = [], maxZoom = 1,
                           minZoom = 20, zoom = 6, layers, center
                       }) {
    let _projection = projection;
    if (projection === "EPSG:4490") {
        proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
        _projection= ol.proj.get("EPSG:4490").setExtent([-180, -90, 180, 90]);
    }

    return  new ol.Map({
        layers: [...getLayers(projection, layers)],
        controls: ol.control.defaults().extend(getControls(controls)),
        view: new ol.View({
            center,
            minZoom,
            maxZoom,
            zoom,
            projection: _projection,
        })
    })
}


export default class OpenalayerMap extends Component {
    constructor(props) {
        super(props);
        let config = MapConfig[this.props.mapConfig] || MapConfig.Tianditu;
        this.map = mapInitialize(config);
    }
    componentDidMount() {
          this.map.setTarget("map")
    }
    render() {
        return <div id="map">
            <Toolbar map={this.map}/>
        </div>
    }
}