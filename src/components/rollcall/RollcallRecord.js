import React from 'react';
import {Row, Col, Form, DatePicker, LocaleProvider, Input, Select} from "antd";
import moment from 'moment';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import 'moment/locale/zh-cn';
import "../../style/ztt/css/rollCall.css";
import Button from "antd/es/button/button";
import {post} from "../../axios/tools";
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const rollset=[
    {
        rname:"理工大",
        cid:"eftt09",
        ifeveryday:"0",
        resultdate:"2019-01-05 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181228//1000011_20181228154552.jpg",
        rfinal:"0"
    },
    {
        rname:"西安软件园",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-04 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        rfinal:"1"
    },
    {
        rname:"绿地",
        cid:"tftt06",
        ifeveryday:"0",
        resultdate:"2018-12-03 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg",
        rfinal:"0"
    },
    {
        rname:"中兴通讯",
        cid:"tftt06",
        ifeveryday:"1",
        resultdate:"2019-01-02 11:07",
        rrpic:"http://pic01.aokecloud.cn/alarm/1000004/pic/20190104//1000004_20190104172947.jpg",
        rfinal:"1"
    }
    ,
    {
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
            rollsetList:[]
        };
    }
    onChangeDate = (dates, dateStrings)=> {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    };
    normal =(status)=>{
        if(status==0){
            return "fontColor";
        }else if(status==1){
            return "fontColor1";
        }
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
        this.setState({
            rollsetList:rollset
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
                    <Row style={{marginTop:"50px"}}>
                        <Form layout="inline" onSubmit={this.handleSubmit}>
                            <Form.Item
                                label="日期"
                            >
                                {getFieldDecorator('range-picker1')(
                                    <RangePicker
                                        ranges={{ Today: [moment(), moment()], 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
                                        showTime
                                        format="YYYY/MM/DD HH:mm:ss"
                                        onChange={this.onChangeDate}
                                    />
                                )}
                            </Form.Item>
                            <Form.Item
                                label="对象名称"
                            >
                                {getFieldDecorator('name', {})(
                                    <Input />
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
                    </Row>
                </LocaleProvider>
                <Row>
                    {
                        this.state.rollsetList.map((v,i)=>(
                            <Col key={i} xs={12} sm={12} md={12} lg={12} xl={12} xxl={7} style={{marginTop:"30px"}}>
                                <Row>
                                    <Col xs={12} sm={12} md={11} lg={11} xl={12} xxl={12}>
                                        <img src={v.rrpic} alt="" width="100%"/>
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12} xl={11} xxl={11} className="rollRow">
                                        <Row className="rollCall">{v.rname}-{v.cid}</Row>
                                        <Row className="rollCall">{v.ifeveryday==0?"自动点名":"手动点名"}</Row>
                                        <Row className="rollCall">
                                            <Col xs={14} sm={14} md={14} lg={14} xl={14} xxl={14} className="overflow">{v.resultdate}</Col>
                                            <Col xs={7} sm={7} md={7} lg={7} xl={7} xxl={5} className={this.normal(v.rfinal)}>{v.rfinal==0?"正常":"报警"}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        ))
                    }
                </Row>
            </div>
        )
    }
}
export default RollcallRecord=Form.create()(RollcallRecord);
