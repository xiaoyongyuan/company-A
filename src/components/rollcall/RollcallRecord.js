import React from 'react';
import {Row, Col, Form, DatePicker, LocaleProvider, Input, Select,Modal,Pagination,Spin} from "antd";
import RollcallRecordModel from "./RollcallRecordModel";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import "../../style/ztt/css/rollCall.css";
import Button from "antd/es/button/button";
import {post} from "../../axios/tools";
import errs from "../../style/imgs/errs.png";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
class RollcallRecord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rollCall:[],
            rollsetList:[],
            rollCallType:false,
            page:1, //当前页数
            ishide:'',
            loading:true, //加载中的状态
        };
    }
    componentWillMount(){
        this.setState({
            rollcalldate:this.props.query.rollcalldate,
            taskid:this.props.query.taskid
        })
    }
    componentDidMount() {
        this.handleRollCall();
        this.handleRollCallList();
    };
    //对象名称
    rollcalInput =(e)=>{
        this.setState({
            calInput:e.target.value
        })
    };
    //日期
    onChange = (date, dateString)=> {
        if(dateString[0] === "" && dateString[1] === ""){
            this.setState({
                bdate:dateString[0],
                edate:dateString[1]
            });
            
        }else {
            this.setState({
                bdate:dateString[0]+' 00:00:00',
                edate:dateString[1]+' 23:59:59'
            });
            
        }
    }
    //model open
    handlerollCallType =(code)=>{//打开弹层
        this.setState({
            rollCallType:true,
            code:code
        })
    };
    //model close
    handlerollClose =()=>{
        this.setState({
            rollCallType:false
        })
    };
    normal =(status)=>{
        if(status===0){
            return "fontColor";
        }else if(status===1){
            return "fontColor1";
        }
    };
    //选择设备
    handleChange =(value)=>{
        this.setState({
            cid:value
        });
    };
    //设备
    handleRollCall = ()=>{
        post({url:"/api/camera/get_cameralist"},(res)=>{
            if(res.success){
                this.setState({
                    rollCall:res.data,
                    loading: false,
                })
            }
        })
    };
    //点名列表
    handleRollCallList =()=>{
        let params={
            pagesize:12,
            pageindex:this.state.page,
            bdate:this.state.bdate,
            edate:this.state.edate,
            cid:this.state.cid,
            rname:this.state.calInput,
            rollcalldate:this.state.rollcalldate,
            taskid:this.state.taskid,
        }
        post({url:"/api/rollcalldetail/getlist",data:params},(res)=>{
            if(res.success){
                this.setState({
                    rollsetList:res.data,
                    totalcount:res.totalcount,
                    loading:false, //加载中的状态
                })
            }
            if(res.data.length === 0){
                this.setState({
                    ishide:true
                })
            }
            if(res.data.length > 0){
                this.setState({
                    ishide:false
                })
            }
        });
    };
    handleMenuClick = ()=>{
        this.setState({
            page:1
        });
    }
    //查询
    handleSubmit =()=>{
        this.setState({
            page:1,
            rollcalldate:'',
            taskid:'',
            loading:true, //加载中的状态
        },()=>{this.handleRollCallList()})
    };
    hanlePageSize = (page) => { //翻页
        this.setState({
            page:page
        },()=>{this.handleRollCallList()}
        )
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="RollcallRecord">
            <div className="ercolor">
                <LocaleProvider locale={zh_CN}>
                    <div style={{marginLeft:"20px"}}>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range-picker1')(
                                    <RangePicker onChange={this.onChange}
                                                 // showTime
                                                 format="YYYY-MM-DD"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="对象名称"
                            >
                                {getFieldDecorator('name', {})(
                                    <Input onChange={this.rollcalInput} />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="设备"
                            >
                                {getFieldDecorator('residence',{
                                    initialValue:""
                                })(
                                    <Select style={{ width: 120 }} onChange={this.handleChange}>
                                        <Option value="" >所有</Option>
                                        {
                                            this.state.rollCall.map((v,i)=>(
                                                <Option value={v.code} key={i}>{v.name}</Option>
                                            ))
                                        }
                                    </Select>
                                )}

                            </Form.Item>
                            <Form.Item>
                                <Button
                                    className="queryBtn"
                                    type="primary"
                                    htmlType="submit"
                                    onClick={this.handleMenuClick}
                                >
                                   查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </LocaleProvider>
                <Spin spinning={this.state.loading} size="large" className="spin" tip="Loading..." />
                <Row type="flex" justify="start">
                    {this.state.rollsetList.map((v,i)=>(
                        <Col className="rollcalllist" key={i} span={7} style={{marginTop:"30px",marginLeft:"30px"}}>
                            <Col span={11}>
                                <img src={v.rrpic?v.rrpic:errs} alt="" width="100%" onClick={()=>this.handlerollCallType(v.code)} />
                            </Col>
                            <Col span={11} className="rollRow">
                                <Row className="rollCall">{v.cameraname}-{v.rname}</Row>
                                <Row className="rollCall">{v.ifeveryday===0?"自动点名":"手动点名"}</Row>
                                <Row className="rollCall">
                                    <Col className="overflow" title={v.resultdate}>
                                        {v.resultdate}
                                    </Col>
                                </Row>
                                <Row className="rollCall">
                                    <Col className="overflow">
                                        {v.rfinal===1?<span style={{color:'#54CD66'}}>正常</span>:<span style={{color:'red'}}>对象存在状态异常</span>}
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    defaultPageSize={12}
                    current={this.state.page}
                    total={this.state.totalcount}
                    onChange={this.hanlePageSize}
                    className="pageSize"
                    hideOnSinglePage={this.state.ishide}
                />
                <Modal
                width={700}
                title="点名记录详情"
                visible={this.state.rollCallType}
                onCancel={this.handlerollClose}
                footer={null}
                >
                    <RollcallRecordModel code={this.state.code} visible={this.state.rollCallType} />
                </Modal>
            </div>
            </div>
        )
    }
}
export default RollcallRecord=Form.create()(RollcallRecord);
