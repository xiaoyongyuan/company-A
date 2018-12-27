import React from 'react';
import { DatePicker, Row, Col, Select, Button, Icon, Modal, Pagination, Form, message,LocaleProvider } from "antd";
import "../../style/ztt/css/police.css";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {post} from "../../axios/tools";
import Alarmdetails from "./Alarmdetails";
import nodata from "../../style/imgs/nodata.png";
import "../../style/ztt/img/plioce/iconfont.css";
const Option = Select.Option;
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
class Alarmlist extends React.Component{
    constructor(props){
        super(props);
        this.state={
            type:[],
            visible: false,
            alarm:false,
            policeList:[],
            equipment:[],
            equipment1:[],
            alermType:[],
            alarmImgType:false,
            bdate:'',
            edate:'',
            cid:"", //检索选中的设备
            endOpen: false,
            page:1, //当前页数
            pageSize:20, //每页显示数量
            totalcount:0, //数据总量
            toson:{}, //传给详情页面的值
        };
    }
    componentDidMount() {
        this.handleEquipment();//设备select
        this.handleAlerm();//报警信息列表
    }
    handleCancelAlarmImg =()=>{
        this.setState({
            alarmImgType:false
        })
    };
    //一键处理
    handleProcessing = ()=>{
        this.setState({
            alarm:true
        });
    };
    handleCamera = ()=>{
        this.setState({
            visible: true,
        });
    };
    //摄像头
    handleOk = () => {
        this.setState({
            visible: false,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };
    //报警状态
    handleState = (code)=>{
        if(code === 0){
            return "未处理";
        }else if(code === 1){
            return "确认";
        }else if(code === 2){
            return "忽略";
        }else if(code === 3){
            return "虚警";
        }
    };
    //报警状态背景
    typeBack =(code)=>{
        if(code === 0){
            return "stateBackground3 handle";
        }else if(code === 1){
            return "stateBackground4 handle";
        }else if(code === 2){
            return "stateBackground2 handle";
        }else if(code === 3){
            return "stateBackground1 handle";
        }
    };
    //查看报警详情
    alarmImg =(code)=>{
        const toson={
            code:code,
            bdate:this.state.bdate.locale?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'',
            edate:this.state.edate.locale?this.state.edate.format('YYYY-MM-DD HH:00:00'):'',
            cid:this.state.cid,
        };
        this.setState({
            alarmImgType:true,
            toson:toson
        })
    }
    hanlePageSize = (page) => { //翻页
        this.setState({
            page:page
        },()=>{
            this.handleAlerm()
        })
    };
    //报警信息列表
    handleAlerm = (data={})=>{
        post({url:'/api/alarm/getlist',data:Object.assign(data,{pageindex:this.state.page})},(res)=>{
            if(res.success){
                if(res.data.length>1){
                    this.setState({
                        policeList:res.data,
                        type:1,
                        totalcount:res.totalcount
                    })
                }else{
                    this.setState({
                        type:0
                    })
                }
            }
        })
    };
    //设备select
    handleEquipment = ()=>{
        post({url:"/api/camera/getlist"},(res)=>{
            if(res.success){
                this.setState({
                    equipment:res.data,
                })
            }
        })
    };
    /*
    * 检索
    * 开=开始时间、结束时间、设备cid
    * */
    handleSubmit =()=>{
        const data={
            bdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'',
            edate:this.state.edate?this.state.edate.format('YYYY-MM-DD HH:00:00'):'',
            cid:this.state.cid
        };
        this.handleAlerm(data);
    };
    alarmdeal=(code,index,type)=>{ //报警处理
        post({url:'/api/alarm/update',data:{code:code,status:type}},(res)=>{
        	if(res.success){
                const policeList=this.state.policeList;
                policeList[index].status=type
                this.setState({
                    policeList:policeList
                })
            }
        })
    };
    //搜索设备选中的值
    handleChange =(value)=>{
        this.setState({
            cid:value
        })
    };
    //一键处理
    handleOnekey =(value)=>{
        this.setState({
            handle:value
        })
    };
    onChangeDate = (field, value) => {
        this.setState({
            [field]: value,
        });
    };
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    };
    //禁止的开始时间
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };
    //禁止的结束时间
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };
    //开始时间
    onChange1 =(dateString1)=> {
        this.onChangeDate('startValue',dateString1);
        this.setState({
            bdate:dateString1
        })
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            edate:dateString2
        })
    };
    //确认一键处理
    handleOkalarm = ()=>{
        if(this.state.handle!==undefined){
            post({url:"/api/alarm/handleall",data:{cid:this.state.handle}},(res)=>{
                if(res.success){
                    this.setState({
                        alarm:false
                    })
                    this.handleAlerm();
                }
            })
        }else{
            message.warn('请选择摄像头');
            return;
        }
    };
    //关闭一键处理页面
    handleCancelalarm =()=>{
        this.setState({
            alarm:false
        })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <LocaleProvider locale={zh_CN}>
                    <Row style={{marginTop:"50px"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Col xl={7} xxl={5}>
                                <Form.Item
                                    {...formItemLayout}
                                    label="日期"
                                >
                                {getFieldDecorator('range-picker1')(
                                    <DatePicker
                                        showTime={{format:"HH"}}
                                        format="YYYY-MM-DD HH:00:00"
                                        placeholder="开始时间"
                                        setFieldsValue={this.state.bdate}
                                        onChange={this.onChange1}
                                        disabledDate={this.disabledStartDate}
                                        onOpenChange={this.handleStartOpenChange}
                                    />
                                )}
                            </Form.Item>
                            </Col>
                            <Col xl={4} xxl={3}>
                                <Form.Item>
                                    {getFieldDecorator('range-picker2')(
                                        <DatePicker
                                            showTime={{format:"HH"}}
                                            format="YYYY-MM-DD HH:00:00"
                                            placeholder="结束时间"
                                            setFieldsValue={this.state.edate}
                                            onChange={this.onChange2}
                                            disabledDate={this.disabledEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={5} xxl={4} >
                                <Form.Item
                                    {...formItemLayout}
                                    label="设备"
                                >
                                    {getFieldDecorator('residence',{
                                        initialValue:""
                                    } )(
                                        <Select style={{ width: 120 }} onChange={this.handleChange}>
                                            <Option value="" >所有</Option>
                                            {
                                                this.state.equipment.map((v,i)=>(
                                                    <Option value={v.code} key={i}>{v.name}</Option>
                                                ))
                                            }
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col xl={3} xxl={2}>
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                            <Col xl={3} xxl={2}>
                                <Button type="primary" onClick={this.handleProcessing} >一键处理</Button>
                            </Col>
                        </Form>
                    </Row>
                </LocaleProvider>
                <Row style={{marginTop:"70px",display:this.state.type===0?"block":"none"}}>
                    <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt="" /></div></Col>
                </Row>
                <Row style={{display:this.state.type===1?"block":"none"}}>
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
                                        <div className="pliceImg" onClick={()=>this.alarmImg(v.code)}>
                                            <div className="img"><img src={v.pic_min} alt="" /></div>
                                        </div>
                                        <div className="camera" style={{display:v.videopath>1?"block":"none"}} onClick={this.handleCamera}><Icon type="video-camera" theme="filled" /></div>
                                    </Col>
                                    <Col xl={11} xxl={12}>
                                        <div className="policeContext">
                                            <div className="triangle"></div>
                                            <Row className="line-police">
                                                <Col xl={12} xxl={12} className="policeName">{v.name}</Col>
                                                <Col xl={12} xxl={12}>{v.atype===1?"入侵检测":""}</Col>
                                            </Row>
                                            <Row className="line-police">
                                                <Col xl={12} xxl={12} className="overflow" title={v.atime}>{v.atime}</Col>
                                                <Col xl={12} xxl={12}>报警对象：{v.tags===""?"无":v.tags}</Col>
                                            </Row>
                                            <Row className="line-police" style={{borderTop:"1px solid #efefef",paddingTop:'5px'}}>
                                                <Col xl={8} xxl={8} ><span onClick={()=>this.alarmdeal(v.code,i,1)} className="cursor"><span className="iconfont icon-queren iconColor2" />&nbsp;确认</span></Col>
                                                <Col xl={8} xxl={8} ><span onClick={()=>this.alarmdeal(v.code,i,3)} className="cursor"><span className="iconfont icon-baojing iconColor1" />&nbsp;虚警</span></Col>
                                                <Col xl={8} xxl={8}><span onClick={()=>this.alarmdeal(v.code,i,2)} className="cursor"><span className="iconfont icon-hulve iconColor3" />&nbsp;忽略</span></Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
                <Pagination defaultCurrent={this.state.page} current={this.state.page} total={this.state.totalcount} pageSize={this.state.pageSize} onChange={this.hanlePageSize} style={{width:"100%",textAlign:"center",display:this.state.type===1?"block":"none"}} />
                <Modal
                    title="播放视频"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
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
                    okText="确认"
                    cancelText="取消"
                >
                    <div>
                        摄像头选择：
                        <Select defaultValue="请选择摄像头" style={{ width: 180 }} onChange={this.handleOnekey}>
                        {
                            this.state.equipment.map((v,i)=>(
                                <Option value={v.code} key={i}>{v.name}</Option>
                            ))
                        }
                        </Select>

                    </div>
                </Modal>
                <div>
                    <Modal
                        width={1200}
                        title="报警详情"
                        visible={this.state.alarmImgType}
                        onCancel={this.handleCancelAlarmImg}
                        footer={null}
                    >
                    <Alarmdetails visible={this.state.alarmImgType} toson={this.state.toson} />
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Alarmlist= Form.create()(Alarmlist);
