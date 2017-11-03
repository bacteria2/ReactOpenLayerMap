/**
 * Created by lenovo on 2017/10/25.
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";
import {Button, Card, Checkbox} from "antd";
import {dangerous, goods, hospital, ol, protect, shelter, team} from "../../mapResource";
import InfoOverlay from "./InfoOverlay";
import {getFeatureList} from "@/Service/MapService";

const gridStyle = {
    width: '100%',
    textAlign: 'center',
    padding: '8px'
};

let grids = [
    {img: dangerous, text: "危险源点", value: "dangerous", visible: false},
    {img: protect, text: "重点防护", value: "protect", visible: false},
    {img: team, text: "应急队伍", value: "team", visible: false},
    {img: goods, text: "应急物资", value: "goods", visible: false},
    {img: hospital, text: "医疗救助", value: "hospital", visible: false},
    {img: shelter, text: "应急避难", value: "shelter", visible: false}
];


export default class LayerControl extends Component {
    constructor(props) {
        super(props);
        this.layerMapper = {};
        //控制图层转换映射mapper
        this.controlLayers = grids.map(el => new ol.layer.Vector({
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
                layerFilter: function (layer) {
                    return layer.getProperties()['selectable']
                }
            });
            let ele = document.getElementById(this.map.getTarget());
            ele.style.cursor = hit ? 'pointer' : '';
        })
        let el = await getFeatureList();
        this.setState({featureList: el.data})
    }

    addFeature({latitude, type, longitude, id}) {
        let layer = this.layerMapper[type];
        layer.getSource().addFeature(new ol.Feature({
            geometry: new ol.geom.Point([latitude, longitude]),
            layerInfo: {type, id}
        }))
    }

    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < grids.length),
            checkAll: checkedList.length === grids.length,
        });
        //选中的图层可见，未选中的图层不可见
        let checked = checkedList.join("");
        grids.forEach((el, index) => {
            if (checked.includes(el.value))
                this.controlLayers[index].setVisible(true);
            else
                this.controlLayers[index].setVisible(false);
        })

    }
    onCheckAllChange = (e) => {
        this.setState({
            checkedList: e.target.checked ? grids.map(el => el.value) : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
        //所有图层可见
        this.controlLayers.forEach(el => el.setVisible(e.target.checked))
    }

    componentWillUpdate() {
        this.state.featureList.forEach(el => this.addFeature(el))
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
        let checkOptions = grids.map((el, index) => ({
            value: el.value,
            label: <Card.Grid style={gridStyle} key={el.text + index}>
                <img src={el.img} className="layer-card-icon"/>
                <div>{el.text}</div>
            </Card.Grid>
        }));

        return <Card title={layerTitle} noHovering style={layerCardStyle}>
            <Checkbox.Group
                options={checkOptions}
                value={this.state.checkedList}
                onChange={this.onChange} style={{position: "absolute"}}>
            </Checkbox.Group>
            <InfoOverlay map={this.map}/>
        </Card>
    }
}






