import React from 'react';
import { DatePicker,Row,Col,Select,Button,Icon,Modal,Pagination  } from "antd";
import "../../style/ztt/css/police.css";
import {post} from "../../axios/tools";
import Alarmdetails from "./Alarmdetails";
import nodata from "../../style/imgs/nodata.png";
const { RangePicker } = DatePicker;
const Option = Select.Option;
class Alarmlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:0,
            visible: false,
            alarm:false,
            policeList:[],
            equipment:[],
            alermType:[],
            alarmImgType:false,
        };
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    //报警详情
    alarmImg =()=>{
        this.setState({
            alarmImgType:true
        })
    }
    handleCancelAlarmImg =()=>{
        this.setState({
            alarmImgType:false
        })
    }
    //一键处理
    handleProcessing = ()=>{
        this.setState({
            alarm:true
        });
        /*post({url:"/api/alarm/handleall",data:{cid:"1000004"}},(res)=>{
            console.log(res,"handleallhandleall");
        })*/
    }
    handleCancelalarm =()=>{
        this.setState({
            alarm:false
        })
    }

    //摄像头
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //报警状态
    handleState = (code)=>{
        if(code==0){
            return "未处理";
        }else if(code==1){
            return "确认";
        }else if(code==2){
            return "忽略";
        }else if(code==3){
            return "虚警";
        }
    }
    //报警状态背景
    typeBack =(code)=>{
        if(code==0){
            return "未处理";
        }else if(code==1){
            return "确认";
        }else if(code==2){
            return "忽略";
        }else if(code==3){
            return "虚警";
        }
    }
    componentDidMount() {
        this.handleEquipment();
        this.handleAlerm();
    }
    //报警信息
    handleAlerm = ()=>{
        post({url:'/api/alarm/getlist'},(res)=>{
            if(res.success){
                this.setState({
                    policeList:res.data
                })
                //判断有没有数据
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
    //设备
    handleEquipment = ()=>{
        post({url:"/api/camera/getlist"},(res)=>{
            if(res.success){
                this.setState({
                    equipment:res.data
                })
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
                        设备：
                        <Select defaultValue="所有" style={{ width: 120 }} onChange={this.handleChange}>
                        {
                            this.state.equipment.map((v,i)=>(
                                <Option value={v.code} key={i}>{v.eid}</Option>
                            ))
                        }
                        </Select>
                    </Col>
                    <Col xl={3} xxl={2}>
                        <Button type="primary">查询</Button>
                    </Col>
                    <Col xl={3} xxl={2}>
                        <Button type="primary" onClick={this.handleProcessing}>一键处理</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"70px",display:this.state.type==0?"none":"block"}}>
                    <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt=""/></div></Col>
                </Row>
                <Row style={{display:this.state.type==0?"block":"none"}}>
                    {
                        this.state.policeList.map((v,i)=>(
                            <Col xl={12} xxl={12} style={{marginTop:"40px"}} key={i}>
                                <Row>
                                    <Col xl={3} xxl={2}>
                                        <div className="handle">
                                            <div className="handle-right" className={this.typeBack(v.atype)}>{this.handleState(v.atype)}</div>
                                        </div>
                                    </Col>
                                    <Col xl={9} xxl={7} className="policeIcon">
                                        <div className="pliceImg" onClick={this.alarmImg}>
                                            <div className="img"><img src={v.pic_min} alt=""/></div>
                                        </div>
                                        <div className="camera" style={{display:v.videopath>1?"block":"none"}}><Icon type="video-camera" theme="filled" /></div>
                                    </Col>
                                    <Col xl={11} xxl={12}>
                                        <div className="policeContext">
                                            <div className="triangle"></div>
                                            <Row className="line-police">
                                                <Col xl={12} xxl={12} className="policeName">{v.ip}</Col>
                                                <Col xl={12} xxl={12}>{v.status==1?"":"入侵检测"}</Col>
                                            </Row>
                                            <Row className="line-police">
                                                <Col xl={12} xxl={12} className="overflow" title={v.atime}>{v.atime}</Col>
                                                <Col xl={12} xxl={12}>报警对象：{v.tags}</Col>
                                            </Row>
                                            <Row className="line-police" style={{borderTop:"1px solid #efefef",paddingTop:'5px'}}>
                                                <Col xl={8} xxl={8} ><Icon type="redo" />确认</Col>
                                                <Col xl={8} xxl={8} ><Icon type="redo" />虚报</Col>
                                                <Col xl={8} xxl={8}><Icon type="redo" />忽略</Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination defaultCurrent={6} total={500} style={{width:"100%",textAlign:"center"}}/>
                <Modal
                    title="播放视频"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <Modal
                    title="报警批量处理"
                    visible={this.state.alarm}
                    onOk={this.handleOkalarm}
                    onCancel={this.handleCancelalarm}
                >
                    <p>
                        摄像头选择：
                        <Select defaultValue="所有" style={{ width: 180 }} onChange={this.handleChange}>
                        {
                            this.state.equipment.map((v,i)=>(
                                <Option value={v.code} key={i}>{v.eid}</Option>
                            ))
                        }
                        </Select>

                    </p>
                </Modal>
                <Modal
                    title="报警详情"
                    visible={this.state.alarmImgType}
                    onOk={this.handleOkAlarmImg}
                    onCancel={this.handleCancelAlarmImg}
                >
                  <div><Alarmdetails/></div>
                </Modal>
            </div>
        )
    }
}
export default Alarmlist
