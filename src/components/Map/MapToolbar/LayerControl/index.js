/**
 * Created by lenovo on 2017/10/25.
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";
import {Button, Card, Checkbox} from "antd";
import {dangerous, goods, hospital,level1,level2,level3, level4, ol, protect, shelter, team, timeAxis, timeBtn} from "../../mapLib";

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
        this.controlLayers = {};
        //控制图层转换映射mapper
        this.controlLayers = grids.map((el, index) => {
            let layer = new ol.layer.Vector({
                source: new ol.source.Vector(),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        src: el.img
                    })
                }),
                visible: el.visible,
                selectable: true
            })
            let feature = new ol.Feature({
                geometry: new ol.geom.Point([12614135.26 + index * 1000, 2647243.60]),
                layerInfo: {
                    type: el.value,
                    id: index
                }
            });
            layer.getSource().addFeature(feature)
            return layer;
        });


        this.map = this.props.map;

        //添加layer到map内
        this.controlLayers.forEach((el) => {
            this.map.addLayer(el);
            this.controlLayers[el.value] = el;
        })

    }

    state = {
        showControl: this.props.show,
        indeterminate: false,
        checkedList: [],
        checkAll: false,
    }

    componentDidMount() {
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
            label: <Card.Grid style={gridStyle} key={index}>
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

let nullImage = "data:image/png;base64,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"

function LayerLabel({title, content}) {
    return <div className="layer-info-label">
        <span className="label">{title}</span>
        <span className="content">{content}</span>
    </div>
}

function CommonHeader({title, onClickHandler, split}) {
    let header = [
        <header className="layer-info-header" key={'title'}>
            {title}
            <span className="icon iconfont icon-chuyidong"
                  onClick={onClickHandler}
            />
        </header>
    ]
    if (split) {
        header.push(<hr size="1" color="#565E61" className="layer-info-hr" key={'splitLine'}/>)
    }

    return header;
}

function AlertTd({label, value}) {
    return [
        <td className="addition-label" key='label'>{label}</td>,
        <td className="addition-text" key='value'>
            <input readOnly value={value}/>
        </td>]
}

class InfoOverlay extends Component {
    constructor(props) {
        super(props)
        this.el = document.createElement('div');
        this.el.classList.add('layer-info');
        this.el.onclick = function (e) {
            console.log('el', e)
        }
        this.map = props.map;
        this.infoOverlay = new ol.Overlay({
            element: this.el,
            positioning: 'bottom-center',
            offset: [0, -15],
            stopEvent: false
        });
        this.map.addOverlay(this.infoOverlay);
        this.infoOverlay.setPosition(undefined);

        // display Overlay on click
        this.map.on('click', evt => {
            let feature = this.map.forEachFeatureAtPixel(evt.pixel, feature => feature, {layerFilter: layer => layer.getProperties()['selectable']});
            console.log('map click', evt);
            if (feature) {
                let coordinates = feature.getGeometry().getCoordinates();
                let {id, type} = feature.getProperties()['layerInfo'];
                if (type) {
                    this.setState({id, type});
                    this.infoOverlay.setPosition(coordinates)
                }
            }
        });
    }

    state = {
        id: "",
        type: "default",
    }


    render() {
        let id = this.state.id;
        let resp = this.getLayerInfo(id);
        let OverlayInfo = resp ? this[resp.type] : this.defaultInfo;
        return createPortal(<OverlayInfo {...resp}/>, this.el)
    }

    hiddenOverlay = () => this.infoOverlay.setPosition(undefined)

    getLayerInfo(id) {
        let mockData = [
            {
                title: "光明桥化学物品储藏处",
                alertLevel: 50,
                alertType: "易爆炸物品储藏",
                name: "工矿业炸药",
                administration: "区环保局",
                phone: 9837121211221,
                contacts: "洋伞",
                type: "dangerous"
            },
            {title: "XX警戒保护区", type: "protect", name: "野生动物园", contacts: "杨树增", phone: 7712312332},
            {title: "运动广场", people: 220, phone: 777221212, name: "清远小学111111111111111112121312321", type: "team"},
            {title: "大号防护服", phone: 121277221212, name: "霹雳啪啦消防栓", administration: "应急处", account: 120, type: "goods"},
            {
                title: "笔架路医疗救助站",
                address: "广东省清远市清新区笔架路22号华东状元小区12栋一单元2203号",
                phone: 112312317221212,
                name: "霹雳啪啦消防栓",
                type: "hospital"
            },
            {title: "露天避难所", type: "shelter", name: "笔架山XXX公园", available: 550, contacts: "杨xx", phone: "7711123312"}
        ]

        return mockData[id];
    }

    defaultInfo() {
        return <div className="defaultInfo-info">some wrong with sever</div>
    }

    dangerous = (props) => {
        let statusArray = [
            {label: "正常", description: '正常',levelImg:level1,imgText:"正常等级",color: '#5ffd00'},
            {label: "警示", description: '警示',levelImg:level2,imgText:"警示等级",color: '#fde500'},
            {label: "发生预警", description: '发生预警',levelImg:level3,imgText:"预警等级", color: '#FD6300'},
            {label: "危险", description: '危险',levelImg:level4,imgText:"危险等级",color: '#fd0c1c'},
            '发生预警',
            '',
            '危险'];
        let level=3;
         if(props.alertLevel<=80){
             level=2;
             if(props.alertLevel<=60){
                 level=1;
                 if(props.alertLevel<=30)
                     level=0;
             }
         }

        let {description,label,levelImg,imgText,color}=statusArray[level];


        return (
            <div className="danger-info">
                <CommonHeader title={props.title} onClickHandler={this.hiddenOverlay}/>
                <div className="danger-status">
                    <label>当前状态:</label>
                    <span style={{color}}>{label}</span>
                    <label>状态描述:</label>
                    <span style={{color}}>{description}</span>
                </div>
                <div className="danger-analysis">
                    <div className="analysis-progress">
                        <div>危险性分析</div>
                        <img src={timeAxis}/>
                        <img className="analysis-progress-btn" src={timeBtn} style={{left: props.alertLevel>100?300:props.alertLevel* 3}}/>
                    </div>
                    <div className="analysis-level">
                        <img src={levelImg}/>
                        <div>{imgText}</div>
                    </div>
                </div>
                <table className="danger-level">
                    <tbody>
                    <tr>
                        <th width="25%" className="danger-index eq30">0-30 (I)</th>
                        <th width="25%" className="danger-index gt30">30-60 (II)</th>
                        <th width="25%" className="danger-index gt60">60-80 (III)</th>
                        <th width="25%" className="danger-index gt80">&gt;80 (IV)</th>
                    </tr>
                    <tr className="danger-description">
                        <td>有一定危险性，有可能造成一般性伤害事故</td>
                        <td>不会导致重伤以上事故，但有较大可能性发生</td>
                        <td>一旦发生事故将会导致多人伤害</td>
                        <td>一旦发生事故将会造成人员重大伤亡和财产损失</td>
                    </tr>
                    </tbody>
                </table>
                <table className="danger-addition">
                    <tbody>
                    <tr>
                        <AlertTd label="名称" value={props.name}/>
                        <AlertTd label="类别" value={props.alertType}/>
                    </tr>
                    <tr >
                        <AlertTd label="管理单位" value={props.administration}/>
                        <AlertTd label="联系人" value={props.contacts}/>
                    </tr>
                    <tr>
                        <AlertTd label="联系电话" value={props.phone}/>
                    </tr>
                    </tbody>
                </table>
                <div style={{height: 15}}/>
            </div>)
    }


    protect = (props) => {
        return (
            <div className="protect-info">
                <CommonHeader title={props.title} split onClickHandler={this.hiddenOverlay}/>
                <div className="layer-info-table">
                    <div className="label-content">
                        <LayerLabel title="名称" content={props.name}/>
                        <LayerLabel title="联系人" content={props.contacts}/>
                        <LayerLabel title="联系电话" content={props.phone}/>
                    </div>
                    <img className="layer-info-image"
                         src={props.image ? props.image : nullImage}/>
                </div>
            </div>)
    }

    team = (props) => {
        return (
            <div className="team-info">
                <CommonHeader title={props.title} split onClickHandler={this.hiddenOverlay}/>
                <div className="layer-info-table">
                    <div className="label-content">
                        <LayerLabel title="名称" content={props.name}/>
                        <LayerLabel title="人数" content={props.people}/>
                        <LayerLabel title="值班电话" content={props.phone}/>
                    </div>
                    <img className="layer-info-image"
                         src={props.image ? props.image : nullImage}/>
                </div>
            </div>)
    }

    goods = (props) => {
        return (
            <div className="goods-info">
                <CommonHeader title={props.title} split onClickHandler={this.hiddenOverlay}/>
                <div className="layer-info-table">
                    <div className="label-content">
                        <LayerLabel title="名称" content={props.name}/>
                        <LayerLabel title="数量" content={props.account}/>
                        <LayerLabel title="管理单位" content={props.administration}/>
                        <LayerLabel title="联系电话" content={props.phone}/>
                    </div>
                    <img className="layer-info-image"
                         src={props.image ? props.image : nullImage}/>
                </div>
            </div>)
    }

    hospital = (props) => {
        return (
            <div className="hospital-info">
                <CommonHeader title={props.title} split onClickHandler={this.hiddenOverlay}/>
                <div className="layer-info-table">
                    <div className="label-content">
                        <LayerLabel title="名称" content={props.name}/>
                        <LayerLabel title="地址" content={props.address}/>
                        <LayerLabel title="联系电话" content={props.phone}/>
                    </div>
                    <img className="layer-info-image"
                         src={props.image ? props.image : nullImage}/>
                </div>
            </div>)
    }

    shelter = (props) => {
        return (
            <div className="shelter-info">
                <CommonHeader title={props.title} split onClickHandler={this.hiddenOverlay}/>
                <div className="layer-info-table">
                    <div className="label-content">
                        <LayerLabel title="场所名称" content={props.name}/>
                        <LayerLabel title="容纳人数" content={props.available}/>
                        <LayerLabel title="联系人" content={props.contacts}/>
                        <LayerLabel title="联系电话" content={props.phone}/>
                    </div>
                    <img className="layer-info-image"
                         src={props.image ? props.image : nullImage}/>
                </div>
            </div>)
    }
}



