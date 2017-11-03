/**
 * Created by lenovo on 2017/10/25.
 */
import React, {Component} from "react";
import {Dropdown, Icon} from "antd";
import LayerControl from "./LayerControl";
import MeasureTool from "./MeasureTool";
import Annotation from './MapAnnotation'
import "./toolbar.css";

export default class extends Component {
    constructor(props) {
        super(props)
        this.map = props.map;
    }
    state = {
        showLayerControls: false,
    }
    handleLayerClick = () => {
        this.setState({showLayerControls: !this.state.showLayerControls})
    }

    render() {
        let measure = <MeasureTool map={this.map}
                                   afterClearMeasure={()=>this.setState({clearMeasure:false})}/>
        return (
            <div id="layerbox_item" style={{position: 'absolute', top: '25px', left: '85px', zIndex: 99}}>
                <div className="show-list">
                    <Annotation map={this.map}/>
                    <div className="layer_item measure item ">
                        <Dropdown overlay={measure} trigger={['click']}>
                            <span className="icon iconfont">&#xe604;
                                <span style={{fontSize: 14, marginLeft: 7}}>
                                    测量
                                    <Icon style={{marginLeft: 5}}  type="down"/>
                                </span>
                            </span>
                        </Dropdown>
                    </div>
                    <div className="layer_item layercontrol item"
                         onClick={this.handleLayerClick}>
                        <span className="icon iconfont">&#xe70d;</span>
                        <span className="name">图层控制</span>
                    </div>
               {/*     <div className="layer_item layercontrol item" onClick={() =>this.setState({clearMeasure:true})}>
                        <span className="icon iconfont">&#xe639;</span>
                        <span className="name">清除标记</span>
                    </div>*/}
                </div>
                <LayerControl visible={this.state.showLayerControls}
                              onClose={() => this.setState({showLayerControls: false})}
                              map={this.props.map}
                />
            </div>
        )
    }
}