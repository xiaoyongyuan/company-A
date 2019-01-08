import React, { Component } from 'react';
import '../../style/sjg/home.css';
import {Card, Form, Input, Row, Col, message, Button, Radio, Select} from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import {post} from "../../axios/tools";
import nopic from "../../style/imgs/nopic.png";
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const props = {
    name: 'file',
    action: '//jsonplaceholder.typicode.com/posts/',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};

class Adopt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[],
            confirmDirty: false,
            isDeal: false,
            value:1,
            equipment:[], //所有设备
            imgsrc:nopic,
            present:[], //绘制的区域
            clicknum:0,
        };
    }
    componentDidMount() {
        post({url:"/api/camera/getlist_forAPP"},(res)=>{ //拿到名下的设备
           if(res.success){
               this.setState({
                   equipment:res.data
               })
           }
        })
        
       
        this.requestdata();
    }
    requestdata=(params) => {//取数据
        
    }
    draw = (field) => { //绘制区域
        let item=this.state.present;
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
    getcoord = (coords) => { //获取坐标
        let ele = document.getElementById("time_graph_canvas");
        let canvsclent = ele.getBoundingClientRect();
        let x= parseInt(coords.clientX - canvsclent.left * (ele.width / canvsclent.width));
        let y= parseInt(coords.clientY - canvsclent.top * (ele.height / canvsclent.height))
        let pre=[x,y]
        return pre
    }
    clickgetcorrd =(e)=>{ //点击画围界
        if(this.state.present.length<4 && this.state.imgsrc && this.state.cid){
            if(this.state.present.length !==4){
                let getcord=this.getcoord(e); //获取点击的坐标
                let precorrd=this.state.present;
                precorrd.push(getcord);
                this.setState({
                    clicknum: this.state.clicknum+1,
                    present:precorrd
                });
            }        
        }else{
            if(!this.state.present.length && !this.state.cid){
                message.warn('请先选择摄像头');
            }
            
        }
        
    }
    drawmove =(e)=>{ //移动
        if(this.state.clicknum){
            let ele = document.getElementById("time_graph_canvas");
            let area = ele.getContext("2d");
            let item=this.state.present;
            let getcord=this.getcoord(e);
            area.clearRect(0,0,704,576);//清除之前的绘图
            if(this.state.clicknum===4){//区域完成
                this.draw();
                this.setState({
                    clicknum: 0
                });
            }else{
                this.draw();
                area.strokeStyle='#ff0'; 
                area.lineWidth=3;
                area.beginPath();
                area.moveTo(item[item.length-1][0],item[item.length-1][1]);
                area.lineTo(getcord[0],getcord[1]);
                area.stroke();
                area.closePath(); 
            }

        }

    }
    cancelarea =()=>{ //重绘围界
        let ele = document.getElementById("time_graph_canvas");
        let area = ele.getContext("2d");
        area.clearRect(0,0,704,576);
        this.setState({
            clicknum: 0,
            present:[]
        });
    }
    onChange = (e) => { //radio
        this.setState({
            value: e.target.value,
        });
    }
    handleSelectChange=(value,opt)=>{ //选择设备 onchange
        this.setState({
            cid: value,
            index:opt.key,
            imgsrc:this.state.equipment[opt.key].picpath
        });
    }
    handleSubmit = (e) => { //新增提交
        e.preventDefault();
        if(this.state.present.length<4){
            message.warn('请绘制点名区域！');
            return;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const _this=this;
                post({url:"/api/rollcall/add",data:Object.assign(values,{rzone:JSON.stringify(this.state.present)})},(res)=>{ //拿到名下的设备
                   if(res.success){
                       message.success('设置成功，请等待审核',2,function(){
                        _this.props.history.go(-1);
                       });
                   }
                })
                
            }
        });
    };

    render() {
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
                <BreadcrumbCustom first="点名" second="新增点名对象" />
                <Row className="white">
                    <Col className="gutter-row" span={10}>
                        <div className="gutter-box">
                            <Card title="" bordered={false}>
                                <p span={4} offset={4} style={{textAlign:'center'}}>新增点名对象</p><br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="对象名称"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('rname', {
                                            rules: [{required: true, message: '请输入对象名称',whitespace: true}],
                                        })(
                                            <Input />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        {...formItemLayout}
                                        label="状态"
                                    >
                                        {getFieldDecorator('status', {
                                            initialValue: 2,
                                            rules: [{required: false}],
                                        })(
                                            <RadioGroup  onChange={this.onChange}>
                                                <Radio disabled value={1}>关闭</Radio>
                                                <Radio value={2}>开启</Radio>
                                            </RadioGroup>
                                        )}
                                    </FormItem>
                                    <Form.Item
                                      {...formItemLayout}
                                      label="选择摄像头"
                                    >
                                      {getFieldDecorator('cid', {
                                        rules: [{ required: true, message: '请选择摄像头！' }],
                                      })(
                                        <Select placeholder="请选择摄像头！" onChange={this.handleSelectChange} onSelect={this.selectvla}>
                                        {
                                            this.state.equipment.map((el,index)=>(
                                                <Option value={el.code} key={index}>{el.name}</Option>
                                            ))
                                            
                                        }
                                        </Select>
                                      )}
                                    </Form.Item>
                                    <Row className="area_row">
                                        <Col span={3} offset={5} className="area_text">
                                            区域：
                                        </Col>
                                        <Col span={10}>
                                            <canvas id="time_graph_canvas" width="704px" height="576px" style={{backgroundImage:'url('+this.state.imgsrc+')',backgroundSize:'100% 100%'}} onClick={this.clickgetcorrd} onMouseMove={this.drawmove} />
                                        </Col>
                                    </Row>
                                    {/*<FormItem
                                                                            {...formItemLayout}
                                                                            label="处理结果"
                                                                            hasFeedback
                                                                        >
                                                                            {getFieldDecorator('处理结果', {
                                                                                rules: [{required: false,message: '请输入处理结果',whitespace: true}],
                                                                            })(
                                                                                <Input />
                                                                            )}
                                                                        </FormItem>*/}
                                    <Row>
                                        <Col span={8} offset={16}>
                                            <Button type="primary" htmlType="submit" className="login-form-button" >确认</Button>
                                            <Button style={{display:"inline-block"}} onClick={this.cancelarea}>重绘围界</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}
export default Adopt= Form.create()(Adopt);
