/**
 * Created by lenovo on 2017/11/3.
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";
import {cloudPopup, nullImage, ol, timeAxis, timeBtn} from "../../mapResource";
import {getFeatureById} from "@/Service/MapService";
import {statusArray} from '../../Const';

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



/**
 * 根据layer是否能被选择，展示显示提示信息
 * */

export default class InfoOverlay extends Component {
    constructor(props) {
        super(props)
        this.el = document.createElement('div');
        this.el.classList.add('layer-info');
        this.map = props.map;
        this.infoOverlay = new ol.Overlay({
            element: this.el,
            positioning: 'bottom-center',
            offset: [0, -20],
            stopEvent: false
        });
        this.map.addOverlay(this.infoOverlay);
        this.infoOverlay.setPosition(undefined);

        // display Overlay on click
        this.map.on('click', evt => {
            let feature = this.map.forEachFeatureAtPixel(evt.pixel, feature => feature, {layerFilter: layer => layer.getProperties()['selectable']});
            if (feature) {
                let coordinates = feature.getGeometry().getCoordinates();
                let view = this.map.getView();
                let {id, type, data} = feature.getProperties()['featureInfo'];
                if (type) {
                    this.infoOverlay.setPosition(coordinates);
                    //view.setCenter(coordinates);
                    view.animate({
                        center: coordinates,
                        duration: 2000
                    });
                    if (data)
                        this.setState({resp: data});
                    else
                        getFeatureById(id).then(el => this.setState({resp: el.data}))
                }
            }
        });
    }

    state = {
        resp: null
    }


    render() {
        let cloudStyle = {
            background: `url(${cloudPopup})`,
            left: 'calc(50% - 30px)',
            bottom: -20
        };
        if (this.state.resp) {
            let OverlayInfo = this[this.state.resp.type];
            return createPortal([
                    <div className="cloud-popup" style={cloudStyle} key="cloud"/>,
                    <OverlayInfo {...this.state.resp} key="Overlay"/>]
                , this.el)
        }
        return null;
    }

    hiddenOverlay = () => this.infoOverlay.setPosition(undefined)


    defaultInfo() {
        return <div className="defaultInfo-info">some wrong with sever</div>
    }

    event = (props) => (<div className="location-event">
        <CommonHeader title={props.name} split onClickHandler={this.hiddenOverlay}/>
        <div className="layer-info-table">
            <div className="label-content">
                <LayerLabel title="名称" content={props.name}/>
                <LayerLabel title="事件" content={props.event}/>
                <LayerLabel title="概况" content={props.description}/>
            </div>
            <img className="layer-info-image"
                 src={props.image ? props.image : nullImage}/>
        </div>
    </div>)

    dangerous = (props) => {
        let level = 3;
        if (props.alertLevel <= 80) {
            level = 2;
            if (props.alertLevel <= 60) {
                level = 1;
                if (props.alertLevel <= 30)
                    level = 0;
            }
        }
        let {description, label, levelImg, imgText, color} = statusArray[level];
        return (
            <div className="danger-info">
                <CommonHeader title={props.name} onClickHandler={this.hiddenOverlay}/>
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
                        <img className="analysis-progress-btn" src={timeBtn}
                             style={{left: props.alertLevel > 100 ? 300 : props.alertLevel * 3}}/>
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