/**
 * Created by lenovo on 2017/10/27.
 */
import React, {Component} from "react";
import {createPortal} from "react-dom";
import {ol} from "../../mapResource";
import {Menu, message} from "antd";
import classnames from "classnames";
import {formatLength,formatArea} from '../../MapHelper'

/**
 * Format length output.
 * @param {ol.geom.LineString} line The line.
 * @return {string} The formatted length.
 */
const measureConfig = {
    strokeColor: "#f4e209",//
    helpTooltip: {
        helpMsg: '单击增加起点',//跟随鼠标的提示框
        offset: [15, 0],
        positioning: 'center-left'
    },
    measureTooltip: {
        measureMsg: '单击增加起点,双击结束',//开始描点以后的提示框
        offset: [0, -15],
        positioning: 'bottom-center'
    },
    measureLayer: {
        fillColor: 'rgba(255, 255, 255, 0.5)',
        strokeColor: '#1d8aa4',
        strokeWidth: 2,
        imageRadius: 7,
        imageFillColor: '#1d8aa4',
    },
    draw: {
        fillColor: 'rgba(255, 255, 255, 0.5)',
        strokeColor: 'rgba(0, 0, 0, 0.5)',
        strokeWidth: 2,
        strokeLineDash: [10, 10],
        imageStrokeColor: 'rgba(0, 0, 0, 0.7)',
        imageRadius: 5,
        imageFillColor: 'rgba(255, 255, 255, 0.2)'

    },
    strokeWidth: 2,//
    imageColor: "#1d8aa4",//
    imageRadius: 7,//
    fillColor: 'rgba(255, 255, 255, 0.2)'//

}



//react 实现
let helpTooltipElement;
function getMeasureLayer() {
    return new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: measureConfig.measureLayer.fillColor
            }),
            stroke: new ol.style.Stroke({
                color: measureConfig.measureLayer.strokeColor,
                width: measureConfig.measureLayer.strokeWidth
            }),
            image: new ol.style.Circle({
                radius: measureConfig.measureLayer.imageRadius,
                fill: new ol.style.Fill({
                    color: measureConfig.measureLayer.imageFillColor
                })
            })
        })
    });
}

function createHelpTooltip() {
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltipElement.innerHTML = measureConfig.helpTooltip.helpMsg;
    return new ol.Overlay({
        element: helpTooltipElement,
        offset: measureConfig.helpTooltip.offset,
        positioning: measureConfig.helpTooltip.positioning
    });
}

export default class Measure extends Component {
    constructor(props) {
        super(props);
        this.measureLayer = getMeasureLayer();
        this.helpTooltip = createHelpTooltip();

        this.map = props.map;
        this.map.addLayer(this.measureLayer);
        this.map.addOverlay(this.helpTooltip);
    }

    state = {
        //{type:"line"},{type:"area"}
        measureList: [],
    }
    onPointerMove = (evt) => {
        if (evt.dragging) {
            return;
        }
        this.helpTooltip.setPosition(evt.coordinate);
    }

    unbindPointerMoveHandler = () => {
        //设置helptooltip隐藏
        helpTooltipElement.classList.add('hidden');
        this.map.un('pointermove', this.onPointerMove)
    }

    handleMeasureRemove = (measure) => {
        let index = this.state.measureList.indexOf(measure);
        if (index !== -1) {
            this.state.measureList.splice(index, 1);
            this.handleMeasureRemove(measure);
        }
        this.setState({
            measureList: this.state.measureList
        })
    }

    addInteraction(type) {
        helpTooltipElement.classList.remove('hidden');
        this.map.on('pointermove', this.onPointerMove);

        this.state.measureList.push({type, timestamp: new Date().getTime()});
        this.setState({
            measureList: this.state.measureList
        })
    }

    render() {
        return <div>
            <Menu onClick={
                ({key}) => {
                    message.info(`click on ${key}`);
                    if (this.map && this.measureLayer)
                        this.addInteraction(key)
                }}>
                <Menu.Item key="LineString">
                    <span className="icon iconfont">&#xe605;</span>
                    <span style={{marginLeft: 7}}>连线距离</span>
                </Menu.Item>
                <Menu.Item key="Polygon">
                    <span className="icon iconfont">&#xe603;</span>
                    <span style={{marginLeft: 7}}>多边形面积</span>
                </Menu.Item>
                <Menu.Item key="Circle">
                    <span className="icon iconfont">&#xe656;</span>
                    <span style={{marginLeft: 7}}>范围</span>
                </Menu.Item>
            </Menu>
            <div >
                {
                    Array.isArray(this.state.measureList) && this.state.measureList.length > 0 &&
                    this.state.measureList.map((measure, index) => <MeasureFeature
                        measureLayer={this.measureLayer}
                        type={measure.type}
                        map={this.map}
                        onMeasureRemove={this.handleMeasureRemove}
                        unbindPointerMove={this.unbindPointerMoveHandler}
                        key={measure.type + index + measure.timestamp}
                    />)
                }
            </div>

        </div>


    }
}

class MeasureFeature extends Component {
    constructor(props) {
        super(props);
        let {measureLayer, map, type} = props;
        this.map = map;
        this.measureLayer = measureLayer;
        this.feature = null;
        this.el = document.createElement('div');
        this.measureOverlay = new ol.Overlay({
            element: this.el,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false
        });
        map.addOverlay(this.measureOverlay);
        this.draw = this.getMeasureDraw(type);

        //绑定双击放大操作控件
        let interactions = this.map.getInteractions().getArray();
        for (let i = 0; i < interactions.length; i++) {
            if (interactions[i] instanceof ol.interaction.DoubleClickZoom)
                this.dbClickZoom = interactions[i]
        }
    }

    state = {
        output: '',
        drawing: true,
    }

    componentDidMount() {
        this.map.addInteraction(this.draw);
    }

    componentDidUpdate() {
        //绘制状态中禁用双击放大功能,结束绘制延迟启用双击放大
        if (this.dbClickZoom && !this.state.drawing)
            setTimeout(() => this.dbClickZoom.setActive(true), 500)
        else
            this.dbClickZoom.setActive(false);
    }


    getMeasureDraw(type) {
        let draw = new ol.interaction.Draw({
            source: this.measureLayer.getSource(),
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: measureConfig.draw.fillColor
                }),
                stroke: new ol.style.Stroke({
                    color: measureConfig.draw.strokeColor,
                    lineDash: measureConfig.draw.strokeLineDash,
                    width: measureConfig.draw.strokeWidth
                }),
                image: new ol.style.Circle({
                    radius: measureConfig.draw.imageRadius,
                    stroke: new ol.style.Stroke({
                        color: measureConfig.draw.imageStrokeColor
                    }),
                    fill: new ol.style.Fill({
                        color: measureConfig.draw.imageFillColor
                    })
                })
            })
        });

        draw.on('drawstart', evt => {
            this.props.unbindPointerMove();
            let output;
            let tooltipCoord = evt.coordinate;
            //修改draw状态
            this.setState({drawing: true});
            //添加feature绑定
            this.feature = evt.feature;
            //添加listner绑定
            this.listener = this.feature.getGeometry().on('change', (evt) => {
                let geom = evt.target;
                if (geom instanceof ol.geom.Polygon) {
                    output = <span>{formatArea(geom)}<sup>2</sup></span>;
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof ol.geom.LineString) {
                    output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                }
                this.measureOverlay.setPosition(tooltipCoord);
                this.setState({output})
            });
        })

        draw.on('drawend', evt => {
            this.setState({drawing: false});
            this.measureOverlay.setOffset([0, -15]);
            this.map.removeInteraction(draw);
            //解绑handler
            ol.Observable.unByKey(this.listener);
        });
        return draw
    }

    clearFeature = () => {
        if (this.feature) {
            //移除feature
            this.measureLayer.getSource().removeFeature(this.feature)
            //移除tooltip
            this.map.removeOverlay(this.measureOverlay);
            //移除父级数组
            this.props.onMeasureRemove(this.props.measure);
        }
    }

    render() {
        let tooltipClass = classnames("tooltip", {
            'tooltip-measure': this.state.drawing,
            'tooltip-static': !this.state.drawing
        });

        return createPortal(
            <div className={tooltipClass}>
                {this.state.output}
                {!this.state.drawing &&
                <span onClick={this.clearFeature} className="icon iconfont icon-chuyidong measure-close-btn"/>}
            </div>, this.el)
    }

}
