import React, { Component } from 'react';
import { Row,Col,Card } from 'antd';
import '../../style/yal/css/datavisual.css';
import {post} from "../../axios/tools";

class Datavisual extends Component {
    constructor(props){
        super(props);
        this.state= {
        }
    }
    componentWillMount=()=>{

    }
    componentDidMount() {

    }
    
    render() {
        
        return (
            <div className="Datavisual">
                <Row>
                    <Col span={11}>
                        <div className="topleft">

                        </div>
                    </Col>
                    <Col span={2}>
                        <div className="topcenter">
                            <span>西安文物局</span>
                        </div>
                    </Col>
                    <Col span={11}>
                        <div className="topright">

                        </div>
                    </Col>
                </Row>
                <Row  gutter={24} >
                    <Col span={6}>
                        <Row>
                            <Col>
                                <div className="xiaotusz">
                                   可查看单位
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="xiaotuzz">
                                    我的设备
                                </div>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={12}>
                        <div className="datus">
                            位置图
                        </div>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col>
                                <div className="xiaotusy">
                                    账号信息
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="xiaotuzy">
                                    报警次数
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={24} >
                    <Col span={6}>
                        <div className="xiaotuxz">
                            点名次数
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="datux" >
                            报警分析

                        </div>
                    </Col>
                    <Col span={6}>
                        <div className="xiaotuxy">
                            巡更次数
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Datavisual;
