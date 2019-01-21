import React from 'react';
import { DatePicker, Row, Col, Select, Button, Icon, Modal, Pagination, Form, message,LocaleProvider,Spin  } from "antd";
import "../../style/ztt/css/police.css";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import {post} from "../../axios/tools";
import Alarmdetails from "./Alarmdetails";
import nodata from "../../style/imgs/nodata.png";
import test from "../../style/ztt/img/123.png";
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
            bdate:'',//检索的开始时间
            edate:'',//检索的结束时间
            cid:"", //检索选中的设备
            endOpen: false,
            page:1, //当前页数
            pageSize:20, //每页显示数量
            totalcount:0, //数据总量
            toson:{}, //传给详情页面的值
            loading:1,
            displaygreen: 'block',
            displayred:'block',
            displayblue:'block',
            backColor:''//背景颜色
        };
    }
    componentWillMount() {
        if(this.props.query.id){
            this.setState({
                propsid:this.props.query.id,
            })
        }   
    }
    componentDidMount() {
       setTimeout(()=>{

       });
        const data={};
        if(this.state.propsid){
            data.cid=this.state.propsid;
            data.status=0
        }
        this.handleEquipment();//设备select
        this.handleAlerm(data);//报警信息列表
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
            return "确认";
        }else if(code === 1){
            return "虚警";
        }else if(code === 2){
            return "忽略";
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
        const data={};
        if(this.state.propsid){
            data.cid=this.state.propsid
            data.status=0
        }
        data.bdate=this.state.bdate?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'';
        data.edate=this.state.edate?this.state.edate.format('YYYY-MM-DD HH:00:00'):'';
        data.cid=this.state.cid;
        this.setState({
            page:page
        },()=>{
            this.handleAlerm(data)
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
                        totalcount:res.totalcount,
                    })
                }else{
                    this.setState({
                        type:0,
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
    * 开始时间、结束时间、设备cid
    * */
    handleSubmit =()=>{
        if(this.state.propsid){
            this.setState({
                    propsid:'',
                })
        }
        this.setState({
                    page:1,
                },()=>{
                    const data={
                        bdate:this.state.bdate?this.state.bdate.format('YYYY-MM-DD HH:00:00'):'',
                        edate:this.state.edate?this.state.edate.format('YYYY-MM-DD HH:00:00'):'',
                        cid:this.state.cid
                    };
                    this.handleAlerm(data);
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
    handleSureAlarmImg =()=>{//确认
        this.setState({
            displaygreen: 'block',
            displayred:'none',
            displayblue:'none'
        })
    };
    handleXJAlarmImg =()=>{//虚警
        this.setState({
            displaygreen: 'none',
            displayred:'block',
            displayblue:'none'
        })
    };
    handleHLAlarmImg =()=>{//忽略
        this.setState({
            displaygreen: 'none',
            displayred:'none',
            displayblue:'block'
        })
    };
    redgreenblue = (status)=>{
        if(status === 0){
            return("typegreen");
        }else if(status === 1){
            return("typered");
        }else {
            return("typeblue");
        }
    }
    sanjiaose = (status)=>{
        if(status === 0){
            return("triangle-topright-green trianglegreen");
        }else if(status === 1){
            return("triangle-topright-green trianglered");
        }else if(status === 2){
            return("triangle-topright-green triangleblue");
        }
    }
    changeredgreenblue =(type,index,code)=>{
        post({url:'/api/alarm/update',data:{code:code,status:type}},(res)=>{
            if(res.success){
                const policeList=this.state.policeList;
                policeList[index].status=type;
                this.setState({
                    policeList:policeList
                })
            }
        });
        /*if(s === 0){
            this.setState({
                backColor:"green"
            })
        }else if(s === 1){
            this.setState({
                backColor:"red"
            })
        }else if(s === 2){
            this.setState({
                backColor:"blue"
            })
        }*/
        /*console.log(s,'3333');
        let styleObj = {}
        if(s===0){
            return(
                styleObj ={border:'1px solid #0FA420'}
            )
        }*/
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="Alarmlist">
                <LocaleProvider locale={zh_CN}>
                    <Row style={{marginTop:"50px"}}>
                        <Form onSubmit={this.handleSubmit}>
                            <Col xl={7} xxl={5} lg={9}>
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
                            <Col xl={4} xxl={3} lg={6}>
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
                            <Col xl={5} xxl={4} lg={6}>
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
                            <Col xl={3} xxl={2} lg={3} className="mt">
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                            <Col xl={3} xxl={2} lg={4} className="lr">
                                <Button onClick={this.handleProcessing} >一键处理</Button>
                            </Col>
                        </Form>
                    </Row>
                </LocaleProvider>
                <Row style={{marginTop:"70px",display:this.state.type===0?"block":"none"}}>
                    <Col style={{width:"100%",textAlign:"center"}}><div className="backImg"><img src={nodata} alt="" /></div></Col>
                </Row>
                <Row gutter={40}>
                    {
                        this.state.policeList.map((v,i)=>(
                            <Col lg={16} xl={10} xxl={10} push={2} key={i}>
                                <div className={this.redgreenblue(v.status)} >
                                    <Row>
                                        <div className={this.sanjiaose(v.status)} > <span >{this.handleState(v.status)}</span></div>
                                        <Col span={8}>
                                            <div className="pliceImg" onClick={()=>this.alarmImg(v.code)}>
                                                    <img src={v.pic_min} alt="" />
                                            </div>
                                        </Col>
                                        <Col span={16}>
                                            <Row>
                                                <Col span={20}>
                                                    <Row className="word-row">
                                                        <Col span={18}>
                                                            <Row>
                                                                <Col span={14}  style={{marginLeft:'5px' }} push={1}>
                                                                    <p>{v.name}</p>
                                                                </Col>
                                                                <Col span={9} push={5} style={{textAlign:'right' }}>
                                                                    <p>{v.atype===1?"入侵检测":""}</p>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                    <Row className="word-row">
                                                        <Col span={12}  push={1}>
                                                            <p>{v.atime}</p>
                                                        </Col>
                                                        <Col span={9} push={1} style={{textAlign:'right',marginLeft:'13px'}}>
                                                            <p>报警对象：{v.tags===""?"无":v.tags}</p>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                            <Row className="sure-row">
                                                <Col span={8} >
                                                    <div className="sure-col-l" onClick={()=>this.changeredgreenblue(0,i,v.code)}>
                                                        <div className="circle-sure">
                                                        </div>
                                                        <div className="word-sure">
                                                            确认
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={8} >
                                                    <div className="sure-col-c" onClick={()=>this.changeredgreenblue(1,i,v.code)}>
                                                        <div className="circle-xj">

                                                        </div>
                                                        <div className="word-xj">
                                                            虚警
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col span={8} >
                                                    <div className="sure-col-r" onClick={()=>this.changeredgreenblue(2,i,v.code)}>
                                                        <div className="circle-hl">

                                                        </div>
                                                        <div className="word-hl">
                                                            忽略
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}

export default Alarmlist= Form.create()(Alarmlist);
