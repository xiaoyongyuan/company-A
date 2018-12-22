import React,{ Component } from 'react';
import {Row, Col, Card,Modal,Spin } from 'antd';
import '../../style/sjg/home.css';
import juyuwang from "../../style/ztt/img/juyuwang.png";
import ztt from "../../style/ztt/css/Companyhome.css";
class Calling extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            type:0
        };
        this.showModal=this.showModal.bind(this);
    }
    componentDidMount() {
      this.showModal();
      setInterval(()=>{
          this.setState({
              visible: false,
              type:0
          });
      },5000);
    }
    showModal = () => {
        this.setState({
            visible: true,
            type:1
        });
    }
    render() {
        return(
            <div className="gutter-example button-demo">
                <span style={{color:'#4B4B5F'}}>所在位置:  场景 /  点名</span>
                <Row gutter={10}>
                    <Col md={8} lg={5} xs={2}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="titleFont" style={{ width: "100%",border:'1px solid #F4F4F4',textAlign:"center" }}>摄像头01</div>
                                <Card>
                                    <Row gutter={10}>
                                        <Col md={24}>
                                            <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"90px"}} />
                                        </Col>
                                    </Row>
                                </Card>
                                <div className="gutter-box">
                                    <div className="pb-m">
                                        <Row>
                                            <Col md={9}>
                                                <span className="titleFont">结果:</span>
                                            </Col>
                                            <Col md={10}>
                                                <span className="titleFont">正常</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Card>
                                        <Row gutter={10}>
                                            <Col md={24}>
                                                <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"90px"}} />
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Card>
                        </div>
                    </Col>
                    <Col md={8} lg={5} xs={2}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="titleFont" style={{ width: "100%",border:'1px solid #F4F4F4',textAlign:"center" }}>摄像头01</div>
                                <Card>
                                    <Row gutter={10}>
                                        <Col md={24}>
                                            <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"90px"}} />
                                        </Col>
                                    </Row>
                                </Card>
                                <div className="gutter-box">
                                    <div className="pb-m">
                                        <Row>
                                            <Col md={9}>
                                                <span className="titleFont">结果:</span>
                                            </Col>
                                            <Col md={10}>
                                                <span className="titleFont">正常</span>
                                            </Col>
                                        </Row>
                                    </div>
                                    <Card>
                                        <Row gutter={10}>
                                            <Col md={24}>
                                                <img src={juyuwang} className="img-responsive" alt="test" style={{width:"100%",height:"90px"}} />
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <div className="modelcircle">
                    <Modal visible={this.state.visible} className="modelCard"/>
                    <div className="scanningImg" style={{display:this.state.type?"block":"none"}}><Spin size="large" /></div>
                </div>
            </div>
        );
    }
}
export default Calling