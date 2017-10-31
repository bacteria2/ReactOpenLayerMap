/**
 * Created by lenovo on 2017/10/25.
 */
import React, {Component} from "react";
import {Dropdown, Icon, Menu, message} from "antd";
import "./toolbar.css";
import LayerControl from "./LayerControl";
import {addInteraction} from "../MeasureTool";
import {getMeasureLayer} from "../MeasureTool";

export default class extends Component {

    constructor(props){
        super(props)

        this.map=props.map;
        this.measureLayer=getMeasureLayer();
        this.map.addLayer(this.measureLayer);
    }

    state = {
        showLayerControls: false,
    }

    handleLayerClick = () => {
        this.setState({showLayerControls: !this.state.showLayerControls})
    }

    render() {

        const measure = (
            <Menu onClick={({key}) => {
                message.info(`click on ${key}`);
                if (this.map &&this.measureLayer)
                    addInteraction(key, this.map, this.measureLayer.getSource())
            }}>
                <Menu.Item key="lineString">
                    <span className="icon iconfont">&#xe605;</span>
                    <span style={{marginLeft: 7}}>连线距离</span>
                </Menu.Item>
                <Menu.Item key="area">
                    <span className="icon iconfont">&#xe603;</span>
                    <span style={{marginLeft: 7}}>多边形面积</span>
                </Menu.Item>
            </Menu>);

        return (
            <div id="layerbox_item" style={{position: 'absolute', top: '25px', left: '85px', zIndex: 99}}>
                <div className="show-list">
                    <div className="layer_item_swtich item">
                        <span className="icon iconfont">&#xe501;</span>
                        <span className="name">添加标记</span>
                    </div>
                    <div className="layer_item measure item ">
                        <Dropdown overlay={measure} trigger={['click']}>
                            <span className="icon iconfont">&#xe604;
                                <span style={{fontSize: 14, marginLeft: 7}}>测量<Icon style={{marginLeft: 5}}
                                                                                    type="down"/></span>
                            </span>
                        </Dropdown>
                    </div>
                    <div className="layer_item layercontrol item"
                         onClick={this.handleLayerClick}>
                        <span className="icon iconfont">&#xe70d;</span>
                        <span className="name">图层控制</span>
                    </div>
                    <div className="layer_item layercontrol item"
                          onClick={()=>this.measureLayer.getSource().clear()}
                    >
                        <span className="icon iconfont">&#xe639;</span>
                        <span className="name">清除标记</span>
                    </div>
                </div>
                <LayerControl visible={this.state.showLayerControls}
                              onClose={() => this.setState({showLayerControls: false})}
                              map={this.props.map}
                />
            </div>
        )
    }
}