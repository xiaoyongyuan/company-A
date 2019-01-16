import React from 'react';
import {Row, Col, Form, DatePicker, LocaleProvider, Input, Select,Modal} from "antd";
import moment from 'moment';
import RollcallRecordModel from "./RollcallRecordModel";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import "../../style/ztt/css/rollCall.css";
import Button from "antd/es/button/button";
import {post} from "../../axios/tools";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const rollset=[
    {
        code:0,
        rname:"神道西侧",
        cid:"18石马",
        ifeveryday:"0",
        resultdate:"2019-01-10 11:07:09",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000021/background/EFGABC018.jpg",
        rfinal:"0"
    },{
        code:1,
        rname:"神道入口",
        cid:"16狮子",
        ifeveryday:"1",
        resultdate:"2019-01-04 11:06::09",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000021/background/EFGABC016.jpg",
        rfinal:"1"
    },{
        code:2,
        rname:"神道东侧",
        cid:"17石像",
        ifeveryday:"0",
        resultdate:"2018-12-03 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        rfinal:"0"
    },{
        code:3,
        rname:"中兴通讯",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-02 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        rfinal:"1"
    },{
        code:4,
        rname:"中兴通讯",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-02 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        rfinal:"0"
    }
];
class RollcallRecord extends React.Component{
    constructor(props){
        super(props);
        this.state={
            rollCall:[],
            rollsetList:[],
            rollCallType:false
        };
    }
    //对象名称
    rollcalInput =(e)=>{
        this.setState({
            calInput:e.target.value
        })
    };
    //日期
    onChangeDate = (dates, dateStrings)=> {
        this.setState({
            bdate:dates[0].format('YYYY-MM-DD HH:00:00'),
            edate:dateStrings[1]
        });

    };
    //model open
    handlerollCallType =(index)=>{
        console.log(index,"3333");
        this.setState({
            rollCallType:true,
            code:index
        })
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
                    rollCall:res.data,
                })
            }
        })
    };
    //点名列表
    handleRollCallList =()=>{
        post({url:"/api/rollcalldetail/getlist"},(res)=>{
            if(res.success){
                this.setState({
                    // rollsetList:rollset
                    rollsetList:res.data
                })
            }
        });

    };
    //查询
    handleSubmit =()=>{
        let datas={
            bdate:this.state.bdate,
            edate:this.state.edate,
            cid:this.state.cid,
            rname:this.state.calInput
        };
        post({url:"/api/rollcalldetail/getlist",data:datas},()=>{
           this.setState({
               rollsetList:rollset
           })
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
                                    <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                                        showTime
                                        format="YYYY/MM/DD HH:00:00"
                                        onChange={this.onChangeDate}
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
                                >
                                   查询
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </LocaleProvider>
                <Row>
                    {
                        this.state.rollsetList.map((v,i)=>(
                            <Col key={i} xs={12} sm={12} md={12} lg={12} xl={12} xxl={7} style={{marginTop:"30px"}}>
                                <Row>
                                    <Col xs={12} sm={12} md={11} lg={11} xl={12} xxl={12}>
                                        <img src={v.rrpic} alt="" width="100%" onClick={()=>this.handlerollCallType(i)} />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={11} xxl={11} className="rollRow">
                                        <Row className="rollCall">{v.cameraname}-{v.rname}</Row>
                                        <Row className="rollCall">{v.ifeveryday==0?"自动点名":"手动点名"}</Row>
                                        <Row className="rollCall">
                                            <Col className="overflow">{v.resultdate} <span className={this.normal(v.rfinal)}>{v.rfinal==0?"正常":"报警"}</span></Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
                <Modal
                width={700}
                title="点名记录详情"
                visible={this.state.rollCallType}
                onCancel={this.handlerollClose}
                footer={null}
                >
                    <RollcallRecordModel code={this.state.code}/>
                </Modal>
            </div>
        )
    }
}
export default RollcallRecord=Form.create()(RollcallRecord);
