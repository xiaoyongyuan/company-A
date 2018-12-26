import React from 'react';
import { DatePicker,Row,Col,Select,Button,Icon,Modal,Pagination,Form } from "antd";
import "../../style/ztt/css/police.css";
import {post} from "../../axios/tools";
import Alarmdetails from "./Alarmdetails";
import moment from "moment";
import nodata from "../../style/imgs/nodata.png";
const Option = Select.Option;
class Alarmlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:[],
            visible: false,
            alarm:false,
            policeList:[],
            equipment:[],
            alermType:[],
            alarmImgType:false,
            bdate:[],
            edate:[],
            code:""
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
            return "stateBackground3 handle";
        }else if(code==1){
            return "stateBackground4 handle";
        }else if(code==2){
            return "stateBackground2 handle";
        }else if(code==3){
            return "stateBackground1 handle";
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
                if(this.state.policeList>1){
                    this.setState({
                        type:1
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
    handleSubmit =()=>{
        const data={
            bdate:this.state.bdate,
            edate:this.state.edate,
            code:this.state.code
        };
        post({url:"/api/alarm/getlist", data:data},(res)=>{
            if(res.success){
                var policeList=this.state.policeList;
                this.setState({policeList});
            }
        })
    }
    alarmdeal=(code,index,type)=>{ //报警处理
        post({url:'/api/alarm/update',data:{code:code,status:type}},(res)=>{
        	if(res){
                const policeList=this.state.policeList;
                policeList[index].status=type
                this.setState({
                    policeList:policeList
                })
            }
        })
    }
    handleRangePicker =(date,dateString)=>{
       this.setState({
           bdate:date,
           edate:dateString
       })
    }
    handleChange =(value)=>{
        this.setState({
            code:value
        })
    }
    range =(start, end)=> {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate =(current)=> {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }
    disabledDateTime =()=> {
        return {
            disabledHours: () => this.range(0, 24).splice(4, 20),
            disabledMinutes: () => this.range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    disabledRangeTime =(_, type)=> {
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const residences = [{
            value: this.state.equipment.map((item)=>(item.code)),
            label: this.state.equipment.map((item)=>(item.eid))
        }];
        return(
            <div>
                <Row style={{marginTop:"50px"}}>
                    <Form>
                        <Col xl={9} xxl={5}>
                            <Form.Item
                                {...formItemLayout}
                                label="日期">
                            {getFieldDecorator('range-picker')(
                                <DatePicker
                                    onChange={this.handleRangePicker}
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledRangeTime}
                                    showTime={{
                                        hideDisabledOptions: true,
                                        defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                    }}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        </Form.Item>
                        </Col>
                        <Col xl={4} xxl={3}>
                            <Form.Item>
                                {getFieldDecorator('range-picker')(
                                    <DatePicker
                                        onChange={this.handleRangePicker}
                                        disabledDate={this.disabledDate}
                                        disabledTime={this.disabledRangeTime}
                                        showTime={{
                                            hideDisabledOptions: true,
                                            defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                                        }}
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col xl={5} xxl={4} >
                            <Form.Item
                                {...formItemLayout}
                                label="设备"
                            >
                                {getFieldDecorator('residence', )(
                                    <Select  style={{ width: 120 }} onChange={this.handleChange}>
                                        {
                                            this.state.equipment.map((v,i)=>(
                                                <Option value={v.code} key={i}>{v.eid}</Option>
                                            ))
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xl={3} xxl={2}>
                            <Button type="primary" onClick={this.handleSubmit}>查询</Button>
                        </Col>
                        <Col xl={3} xxl={2}>
                            <Button type="primary" onClick={this.handleProcessing}>一键处理</Button>
                        </Col>
                    </Form>
                </Row>
                <Row style={{marginTop:"70px",display:this.state.type?"none":"block"}}>
                    <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt=""/></div></Col>
                </Row>
                <Row style={{display:this.state.type?"block":"none"}}>
                    {
                        this.state.policeList.map((v,i)=>(
                            <Col xl={12} xxl={12} style={{marginTop:"40px"}} key={i}>
                                <Row>
                                    <Col xl={3} xxl={2}>
                                        <div className={this.typeBack(v.status)}>
                                            <div className="handle-right" >{this.handleState(v.status)}</div>
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
                                                <Col xl={12} xxl={12}>{v.atype==1?"入侵检测":""}</Col>
                                            </Row>
                                            <Row className="line-police">
                                                <Col xl={12} xxl={12} className="overflow" title={v.atime}>{v.atime}</Col>
                                                <Col xl={12} xxl={12}>报警对象：{v.tags?"":"无"}</Col>
                                            </Row>
                                            <Row className="line-police" style={{borderTop:"1px solid #efefef",paddingTop:'5px'}}>
                                                <Col xl={8} xxl={8} ><span onClick={()=>this.alarmdeal(v.code,i,1)} className="cursor"><Icon type="redo" />确认</span></Col>
                                                <Col xl={8} xxl={8} ><span className="cursor"><Icon type="redo" />虚报</span></Col>
                                                <Col xl={8} xxl={8}><span className="cursor"><Icon type="redo" />忽略</span></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination defaultCurrent={6} total={500} style={{width:"100%",textAlign:"center",display:this.state.type?"block":"none"}}/>
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
                <div>
                    <Modal
                        width={1100}
                        title="报警详情"
                        visible={this.state.alarmImgType}
                        onCancel={this.handleCancelAlarmImg}
                    >
                    <Alarmdetails/>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Alarmlist= Form.create()(Alarmlist);
