/**
 * Created by lenovo on 2017/10/25.
 * 用于控制显示六个不同区域分类的子模块
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";
import {Button, Card, Checkbox} from "antd";
import {ol} from "../../mapResource";
import {getFeatureList} from "@/Service/MapService";
import {distanceBetween} from "../../MapHelper";
import {locationList,layerControlConfig} from '../../Const'

const gridStyle = {
    width: '100%',
    textAlign: 'center',
    padding: 8,
    marginTop: -16,
    zIndex: 14
};

export default class LayerControl extends Component {
    constructor(props) {
        super(props);
        this.layerMapper = {};
        //控制图层转换映射mapper
        this.controlLayers = locationList.map(el => new ol.layer.Vector({
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        src: el.img
                    })
                }),
                visible: el.visible,
                selectable: true,
                layerType: el.value,
            })
        );
        this.map = this.props.map;

        //添加layer到map内
        this.controlLayers.forEach((el) => {
            let {layerType} = el.getProperties();
            this.map.addLayer(el);
            this.layerMapper[layerType] = el;
        })

        //初始化范围分析图层
        this.analyserInit();
    }

    state = {
        showControl: this.props.show,
        indeterminate: false,
        checkedList: [],
        checkAll: false,
        featureList: [],
    }

    async componentDidMount() {
        // change mouse cursor when over marker
        this.map.on('pointermove', (e) => {
            if (e.dragging)  return;
            let pixel = this.map.getEventPixel(e.originalEvent);
            let hit = this.map.hasFeatureAtPixel(pixel, {
                layerFilter(layer){return layer.getProperties()['selectable']}
            });
            let ele = document.getElementById(this.map.getTarget());
            ele.style.cursor = hit ? 'pointer' : '';
        })
        let el = await getFeatureList();
        this.setState({featureList: el.data})
    }

    analyserInit() {
        this.analyseLayer = new ol.layer.Vector({
            source: new ol.source.Vector(),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: layerControlConfig.radiusAnalyse.fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: layerControlConfig.radiusAnalyse.strokeColor,
                    width: layerControlConfig.radiusAnalyse.stokeWidth
                }),
                image: new ol.style.Image({
                    color: layerControlConfig.radiusAnalyse.imageColor
                })
            })
        });
        this.map.addLayer(this.analyseLayer);
        this.props.eventBus.on("radiusAnalyse", this.radiusAnalyse);
    }

    /**
     * 根据传入坐标的半径和类型，查找符合条件的标记
     * */
    radiusAnalyse = (evt) => {
        let {type, radius, coordinate} = evt.data.location;
        //生成半径为radius的圆
        this.analyseLayer.getSource().clear();
        let feature = new ol.Feature({
            geometry: new ol.geom.Circle(coordinate, radius)
        })

        this.analyseLayer.getSource().addFeature(feature)
        let featureList = [];
        //获取指定类型的图层，不为空则测算该图层内是否有标记点在圆形范围内
        //如果type为空则查全部layer
        if (type) {
            let targetLayer = this.layerMapper[type];
            if (targetLayer) {
                featureList= featureList.concat(this.radiusAnalyseLayerHandler(targetLayer, feature.getGeometry().getExtent(), type, coordinate))
            }
        } else {
            this.controlLayers.forEach(targetLayer=>{
                featureList= featureList.concat(this.radiusAnalyseLayerHandler(targetLayer, feature.getGeometry().getExtent(), "", coordinate))
            })
        }
        //跨窗口发送数据
        evt.source.postMessage({type: "radiusAnalyse", data: featureList}, window.origin);
        return featureList;
    }

    radiusAnalyseLayerHandler(layer, extent, type, coordinate) {
        let featureList = [];
        layer.setVisible(true);
        layer.getSource().forEachFeatureIntersectingExtent(extent, feature => {
            // let attach = this.featureHandler(feature, coordinate, type);
            let featureInfo = feature.getProperties().featureInfo;
            let[pX,pY]= feature.getGeometry().getCoordinates();
            //type为空或者type和featureInfo的type想同则返回feature
            if (featureInfo && (!type || type === featureInfo.type)) {
                featureList.push({
                    id: featureInfo.id,
                    distance: distanceBetween(coordinate,[parseFloat(pX),parseFloat(pY)] , this.map.getView().getProjection())
                })
            }
        });
        return featureList;
    }

    /**
     * 返回feature的id和距离
     * */
    featureHandler(feature, coordinate, type) {
        let featureInfo = feature.getProperties().featureInfo;
        //type为空或者type和featureInfo的type想同则返回feature
        if (featureInfo && (!type || type === featureInfo.type)) {
            return {
                id: featureInfo.id,
                distance: distanceBetween(coordinate, feature.getGeometry().getCoordinates(), this.map.getView().getProjection())
            }
        }
    }

    addFeature({latitude, type, longitude, id}) {
        let layer = this.layerMapper[type];
        layer.getSource().addFeature(new ol.Feature({
            geometry: new ol.geom.Point([longitude,latitude ]),
            featureInfo: {type, id}
        }))
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < locationList.length),
            checkAll: checkedList.length === locationList.length,
        });
        //选中的图层可见，未选中的图层不可见
        let checked = checkedList.join("");
        locationList.forEach((el, index) => {
            if (checked.includes(el.value))
                this.controlLayers[index].setVisible(true);
            else
                this.controlLayers[index].setVisible(false);
        })

    }
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? locationList.map(el => el.value) : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
        //所有图层可见
        this.controlLayers.forEach(el => el.setVisible(e.target.checked))
    }


    componentWillUnmount() {
        this.controlLayers.forEach(el => this.map.removeLayer(el))
    }

    render() {
        let layerCardStyle = {
            display: this.props.visible ? "block" : "none",
            position: 'absolute', top: '45px', left: '0', zIndex: 99, width: '356px'
        }

        //标题
        let layerTitle = (
            <div className="layer-title">
                <Checkbox
                    indeterminate={this.state.indeterminate}
                    onChange={this.onCheckAllChange}
                    checked={this.state.checkAll}
                >全选</Checkbox>
                <div className="close-wrapper">
                    <Button icon="close" onClick={this.props.onClose}/></div>
            </div>);

        //图层选项
        let checkOptions = locationList.map((el, index) => ({
            value: el.value,
            label: <Card.Grid style={gridStyle} key={el.text + index}>
                <img src={el.img} className="layer-card-icon"/>
                <div>{el.text}</div>
            </Card.Grid>
        }));

        this.state.featureList.forEach(el => this.addFeature(el))

        return <Card title={layerTitle} noHovering style={layerCardStyle}>
            <Checkbox.Group
                options={checkOptions}
                value={this.state.checkedList}
                onChange={this.onChange} style={{position: "absolute"}}>
            </Checkbox.Group>
        </Card>
    }
}






