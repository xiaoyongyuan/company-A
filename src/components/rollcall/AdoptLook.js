
import React, { Component } from 'react';
import '../../style/sjg/home.css';
import { Card, Form, Input, Row, Col, Button,Upload, message, Icon, Radio, Select } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post} from "../../axios/tools";
import nopic from "../../style/imgs/nopic.png";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
class AdoptLook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[],
            imgsrc:nopic,
            present:[]
        };
    }
    componentWillMount(){
        this.setState({
            code:this.props.query.id
        })
    }
    componentDidMount(){
        const _this=this;
        post({url:"/api/rollcall/getone",data:{code:this.state.code}}, (res)=>{
            if(res.success){
                _this.props.form.setFieldsValue({
                    qpplyname: res.data.cameraname, //用户名
                    rname: res.data.rname, //对象名
                    applydate: res.data.applydate, 
                    cameraname: res.data.cameraname, 
                    rhandle: res.data.rhandle,   //审核结果                           
                });
                _this.setState({
                    imgsrc: res.data.basepic, //图片
                    rpic:res.data.rpic,
                    rhandle: toString(res.data.rhandle), 
                    present: JSON.parse(res.data.rzone), //区域   
                },()=>{
                   this.draw() 
                })
            }
        })
        this.setState({
        })
    }
    draw = () => { //绘制区域
        let item=this.state.present;
        if(item.length){
            let ele = document.getElementById("time_graph_canvas");
            let area = ele.getContext("2d");
            area.strokeStyle='#ff0';
            area.lineWidth=3;
            area.beginPath();
            area.moveTo(item[0][0],item[0][1]);
            item.map((elx,i)=>{
                if(i>0){
                   area.lineTo(item[i][0],item[i][1]);
                   if(i===3){
                   area.lineTo(item[0][0],item[0][1]);
                   } 
                   area.stroke();
                }
            }) 
        }
        
    }
    cancelhandle=()=>{ //不通过
        const _this=this;
        post({url:"/api/rollcall/handle",data:{code:this.state.code,rhandle:2}}, (res)=>{
            if(res.success){
                message.success('设置成功',2,function(){
                    _this.props.history.go(-1);
               });
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const _this=this;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };


        return (
            <div className="gutter-example">
                <BreadcrumbCustom first="维护团队管理" second="点名审核" />

                <Row className="white">
                    <Col className="gutter-row" span={10}>
                        <div className="gutter-box">
                            <Card title="" bordered={false}>
                                <Form onSubmit={this.handleSubmit}>                                    
                                    <FormItem
                                        {...formItemLayout}
                                        label="用户名"
                                    >
                                        {getFieldDecorator('qpplyname', {
                                            rules: [{required: false, message: '请输入用户名',whitespace: true}],
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="摄像头"
                                    >
                                        {getFieldDecorator('cameraname', {
                                            rules: [{required: false, message: '请输入摄像头IP',whitespace: true}],
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="对象名"
                                    >
                                        {getFieldDecorator('rname', {
                                            rules: [{required: false, message: '请输入摄像头IP',whitespace: true}],
                                        })(
                                            <Input disabled />
                                        )}
                                    </FormItem>
                                    <Row className="area_row">
                                        <Col span={3} offset={5} className="area_text">
                                            区域：
                                        </Col>
                                        <Col span={10}>
                                            <canvas id="time_graph_canvas" width="704px" height="576px" style={{backgroundImage:'url('+this.state.imgsrc+')',backgroundSize:'100% 100%'}} onClick={this.clickgetcorrd} onMouseMove={this.drawmove} />
                                        </Col>
                                    </Row>
                                    <FormItem
                                        {...formItemLayout}
                                        label="审核结果"
                                    >
                                        {getFieldDecorator('rhandle', {
                                            rules: [{required: false}],
                                        })(
                                            <Select >
                                              <Option value='0'>未审核</Option>
                                              <Option value='1'>审核未通过</Option>
                                              <Option value='2'>审核通过</Option>
                                            </Select>
                                        )}
                                    </FormItem>  
                                    {this.state.rhandle
                                        ?<div>{
                                            this.state.rpic
                                            ?<div>
                                                <Row className="area_row">
                                                    <Col span={4} offset={4} className="area_text">
                                                        对象图：
                                                    </Col>
                                                    <Col span={10}>
                                                        <img alt="3" src={this.state.rpic} width="100%" />
                                                    </Col>
                                                </Row>
                                                <FormItem
                                                    {...formItemLayout}
                                                    label="状态"
                                                >
                                                    {getFieldDecorator('status', {
                                                        initialValue: 1,
                                                        rules: [{required: false}],
                                                    })(
                                                        <RadioGroup  onChange={this.onChange}>
                                                            <Radio value={1}>关闭</Radio>
                                                            <Radio value={2}>开启</Radio>
                                                        </RadioGroup>
                                                    )}
                                                </FormItem>

                                            </div>
                                            :''

                                        }</div>
                                        :''
                                    }
                                    {
                                        this.state.rhand==2
                                        ?<Row>
                                            <Col span={16} offset={8}>
                                                <Button type="primary" htmlType="submit" className="login-form-button" >提交</Button>
                                                <Button style={{display:"inline-block"}} onClick={this.cancelhandle}>取消</Button>
                                            </Col>
                                        </Row>
                                        :''
                                    }
                                    
                                             
                                    

                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default AdoptLook= Form.create()(AdoptLook);
