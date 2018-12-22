import React,{ Component } from 'react';
import { Row, Col, Card } from 'antd';
import Relationshipnetwork from './Relationshipnetwork'
import '../../style/ztt/css/Companyhome.css'
class Connent extends Component{
    render() {
        return(
            <div className="gutter-example button-demo">
                <span>所在位置:首页/关系网</span>
                <Row>
                    <Col xxl={6} xl={6} offset={4} className="topShift">
                        <Card>
                            <div className="pb-m">
                                <Row>
                                    <Col xxl={15} xl={14}>
                                        <span className="titleFont">查看我的用户</span>
                                    </Col>
                                    <Col xxl={9} xl={4}>
                                        <span className="titleFont">共计：</span><span className="fontStyle">6</span>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col xxl={15} xl={14}>户县博物馆</Col>
                                <Col xxl={9} xl={4}>设备:2</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col xxl={6} xl={6} className="rightShift topShift">
                        <Card>
                            <div className="pb-m">
                                <Row>
                                    <Col xxl={15} xl={14}>
                                        <span className="titleFont">我查看的用户</span>
                                    </Col>
                                    <Col xxl={9} xl={4}>
                                        <span className="titleFont">共计：</span><span className="fontStyle">6</span>
                                    </Col>
                                </Row>
                            </div>
                            <Row>
                                <Col xxl={15} xl={14}>户县博物馆</Col>
                                <Col xxl={9} xl={4}>设备:2</Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Relationshipnetwork />
            </div>
        );
    }
}
export default Connent