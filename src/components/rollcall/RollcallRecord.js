import React from 'react';
import {Row, Col, Form, DatePicker, LocaleProvider, Input, Select,Modal,Pagination, Empty} from "antd";
import RollcallRecordModel from "./RollcallRecordModel";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import "../../style/ztt/css/rollCall.css";
import Button from "antd/es/button/button";
import {post} from "../../axios/tools";
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
            ishide:''
        };
    }
    //对象名称
    rollcalInput =(e)=>{
        this.setState({
            calInput:e.target.value
        })
    };
    //日期
    onChange = (date, dateString)=> {
        if(dateString[0] == "" && dateString[1] == ""){
            this.setState({
                bdate:dateString[0],
                edate:dateString[1]
            });
            console.log(dateString[0]);
            console.log(dateString[1]);
        }else {
            this.setState({
                bdate:dateString[0]+' 00:00:00',
                edate:dateString[1]+' 23:59:59'
            });
            console.log(dateString[0]);
            console.log(dateString[1]);
        }
    }
    //model open
    handlerollCallType =(code)=>{//打开弹层
        console.log(code,"3333");
        this.setState({
            rollCallType:true,
            code:code
        },()=>{
            console.log('code',code)
            }
        )
    };
    //model close
    handlerollClose =()=>{
        this.setState({
            rollCallType:false
        })
    };
    normal =(status)=>{
        if(status==0){
            return "fontColor";
        }else if(status==1){
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
        post({url:"/api/camera/getlist"},(res)=>{
            if(res.success){
                this.setState({
                    rollCall:res.data
                })
            }
        })
    };
    //点名列表
    handleRollCallList =(params={pagesize:12,pageindex:this.state.page,bdate:this.state.bdate,edate:this.state.edate,cid:this.state.cid,rname:this.state.calInput,})=>{
        post({url:"/api/rollcalldetail/getlist",data:params},(res)=>{
            if(res.success){
                this.setState({
                    rollsetList:res.data,
                    totalcount:res.totalcount
                })
            }
            if(res.data.length == 0){
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
            // cname:e.target.value,
            page:1
        });
    }
    //查询
    handleSubmit =()=>{

        let datas={
            bdate:this.state.bdate,
            edate:this.state.edate,
            cid:this.state.cid,
            rname:this.state.calInput,
            pagesize:12,
            pageindex:this.state.page
        };

        post({url:"/api/rollcalldetail/getlist",data:datas},(res)=>{
           this.setState({
               rollsetList:res.data,
               totalcount:res.totalcount
           })
            if(res.data.length == 0){
                this.setState({
                    ishide:true
                })
            }
            if(res.data.length > 0){
                this.setState({
                    ishide:false
                })
            }
        })
    };
    hanlePageSize = (page) => { //翻页
        console.log("page",page);
        this.setState({
            page:page
        },()=>{
            this.componentDidMount()
        })
    };
    componentDidMount() {
        this.handleRollCall();
        this.handleRollCallList();
    };


    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className="RollcallRecord">
                <LocaleProvider locale={zh_CN}>
                    <div style={{marginTop:"50px"}}>
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
                                    <Input onChange={this.rollcalInput}/>
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
                <Row type="flex" justify="start">
                    {this.state.rollsetList == 0?<div className="zwsj" style={{ margin:'30px'}}>暂无数据</div>:this.state.rollsetList.map((v,i)=>(
                        <Col key={i} xs={12} sm={12} md={12} lg={12} xl={12} xxl={7} xl={{ offset: 1 }} style={{marginTop:"30px"}}>
                            <Row>
                                <Col xs={12} sm={12} md={11} lg={11} xl={12} xxl={12}>
                                    <img src={v.rrpic} alt="" width="100%" onClick={()=>this.handlerollCallType(v.code)} />
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={11} xxl={11} className="rollRow">
                                    <Row className="rollCall">{v.cameraname}-{v.rname}</Row>
                                    <Row className="rollCall">{v.ifeveryday==0?"自动点名":"手动点名"}</Row>
                                    <Row className="rollCall">
                                        <Col className="overflow">
                                            {v.resultdate}
                                            {v.rfinal==1?<span style={{color:'green'}}>正常</span>:<span style={{color:'red'}}>报警</span>}
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
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
        )
    }
}
export default RollcallRecord=Form.create()(RollcallRecord);
