import React from 'react';
import { DatePicker,Row,Col,Select,Button,Icon } from "antd";
import "../../style/ztt/css/police.css";
import {post} from "../../axios/tools";
import nodata from "../../style/imgs/nodata.png";
const { RangePicker } = DatePicker;
const Option = Select.Option;
class Alarmlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:0
        };
    }
    componentDidMount() {
        post({url:'/api/alarm/getlist'},(res)=>{
            if(res.success){
                if(res.data>1){
                    this.setState({
                        type:1
                    })
                }else{
                    this.setState({
                        type:0
                    })
                }
            }
        })
    }
    //时间选择
    onChange = (date, dateString)=> {
        console.log(date, dateString);
    }
    //设备select选择
    handleChange = (value)=> {
        console.log(`selected ${value}`);
    }
    render(){
        return(
            <div>
                <Row style={{marginTop:"50px"}}>
                    <Col xl={9} xxl={6}>
                        日期：<RangePicker onChange={this.onChange} />
                    </Col>
                    <Col xl={5} xxl={3}>
                        设备：<Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled" disabled>Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    </Col>
                    <Col xl={3} xxl={2}>
                        <Button type="primary">查询</Button>
                    </Col>
                    <Col xl={3} xxl={2}>
                        <Button type="primary">一键处理</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"70px",display:this.state.type==1?"none":"block"}}>
                    <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt=""/></div></Col>
                </Row>
                <Row style={{display:this.state.type==1?"block":"none"}}>
                    <Col xl={12} xxl={12} style={{marginTop:"40px"}}>
                        <Row>
                            <Col xl={3} xxl={2}>
                                <div className="handle">
                                    <div className="handle-right">待处理</div>
                                </div>
                            </Col>
                            <Col xl={9} xxl={7} className="policeIcon">
                                <div className="pliceImg">
                                    <div className="img"></div>
                                </div>
                                <div className="camera"><Icon type="video-camera" theme="filled" /></div>
                            </Col>
                            <Col xl={11} xxl={12}>
                                <div className="policeContext">
                                    <div className="triangle"></div>
                                    <Row className="line-police">
                                        <Col xl={12} xxl={12} className="policeName">理工大北门</Col>
                                        <Col xl={12} xxl={12}>入侵报警</Col>
                                    </Row>
                                    <Row className="line-police">
                                        <Col xl={12} xxl={12}>2018/12/09</Col>
                                        <Col xl={12} xxl={12}>报警对象：无</Col>
                                    </Row>
                                    <Row className="line-police">
                                        <Col xl={8} xxl={8}><Icon type="redo" />确认</Col>
                                        <Col xl={8} xxl={8}><Icon type="redo" />虚报</Col>
                                        <Col xl={8} xxl={8}><Icon type="redo" />忽略</Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={12} xxl={12} style={{marginTop:"40px"}}>
                        <Row>
                            <Col xl={3} xxl={2}>
                                <div className="handle">
                                    <div className="handle-right">待处理</div>
                                </div>
                            </Col>
                            <Col xl={9} xxl={7} className="policeIcon">
                                <div className="pliceImg">
                                    <div className="img"></div>
                                </div>
                                <div className="camera"><Icon type="video-camera" theme="filled" /></div>
                            </Col>
                            <Col xl={11} xxl={12}>
                                <div className="policeContext">
                                    <div className="triangle"></div>
                                    <Row className="line-police">
                                        <Col xl={12} xxl={12} className="policeName">理工大北门</Col>
                                        <Col xl={12} xxl={12}>入侵报警</Col>
                                    </Row>
                                    <Row className="line-police">
                                        <Col xl={12} xxl={12}>2018/12/09</Col>
                                        <Col xl={12} xxl={12}>报警对象：无</Col>
                                    </Row>
                                    <Row className="line-police">
                                        <Col xl={8} xxl={8}><Icon type="redo" />确认</Col>
                                        <Col xl={8} xxl={8}><Icon type="redo" />虚报</Col>
                                        <Col xl={8} xxl={8}><Icon type="redo" />忽略</Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default Alarmlist
