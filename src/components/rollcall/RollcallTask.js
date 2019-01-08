import React, { Component} from 'react';
import {Row, Col, Button,Form, Input, Modal, Card, Icon, Select} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";
const Option = Select.Option;
const data=[
{
    code:1,
    rname:'石狮子',
    cameraname:'西安',
    cid:'1000005',
    rpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
    rstatus:1, //点名对象状态
    lastrollcall:'2017-12:10 12:09:09', //最后一次点名时间
    rfinal:2, //点名结果
},{
    code:2,
    rname:'柱子',
    cameraname:'西安',
    cid:'1000002',
    rpic:'http://pic01.aokecloud.cn/alarm/1000011/pic/20181229//1000011_20181229100320.jpg',
    rstatus:0, //点名对象状态
    lastrollcall:'2017-12:10 12:09:10', //最后一次点名时间
    rfinal:1, //点名结果
}
]
const FormItem = Form.Item;
class RollcallTask extends Component{
	constructor(props){
        super(props);
        this.state={
            state:1, //当前任务的状态
            time:3, //日执行次数
            last:'2015-12-12 12:00:09',
            next:'2015-12-12 12:00:09',
            count:20,
            normal:18,
            unusual:2,
            list:[],
            settingType:false

        }
    }
    //modal open
    handleSetting =()=>{
	    this.setState({
            settingType:true
        })
    };
	//model close
    handleCancelSetting =()=>{
        this.setState({
            settingType:false
        })
    };
    // model ok
    handleOkSetting =()=>{
        this.setState({
            settingType:false
        })
    };
    componentDidMount() {
        this.reuestdata();
    }
    setRoll = () => { //点名设置

    };
    reuestdata =(parameter={})=>{ //点名的对象查询
        post({url:"/api/rollcall/getlist",data:parameter},(res)=>{
            if(res){
                this.setState({
                    // list:res.data
                    list:data

                })
            }
        })
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallTask">
                <Row style={{margin:"2vmax 1vmax"}}>
                    <Col span={18}>
                        <Card title="点名任务" extra={<a onClick={()=>this.setRoll}> <Icon type="setting" theme="filled" /><span onClick={this.handleSetting}>设置</span></a>}>
                            <p>每次点名次数: <b>{this.state.time}</b>次 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; {this.state.state?'执行中':'待生效'}</p>
                            {this.state.last?<p>上一次点名时间: {this.state.last} &nbsp; &nbsp;&nbsp; 共点名<b>{this.state.count}</b>个对象，<b>{this.state.normal}</b>个正常， <b>{this.state.unusual}</b>个异常</p>:''}
                            <p>下一次点名时间: {this.state.next}</p>
                        </Card>
                    </Col>
                </Row>
                <Row style={{margin:"1vmax 1vmax"}}>
                    <Col span={14}>
                        <Form layout="inline" onSubmit={this.selectopt}>
                            <FormItem label="名称">
                                {getFieldDecorator('realname', {
                                    rules:[{
                                        required: false,
                                        message: '请输入名称!'
                                    }],
                                })( 
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem label="设备">
                                {getFieldDecorator('account', {
                                    rules: [{
                                        required: false,
                                        message: '请输入账号!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                            </FormItem>
                        </Form>
                    </Col>
                    <Col span={2}>
                        <a href="#/app/rollcall/adopt"><Button>新增</Button></a>
                    </Col>
                    <Col span={2}>
                        <a href="#/app/companyhome/calling"><Button>全部点名</Button></a>
                    </Col>

                </Row>
                <Row>
                {this.state.list.map((el,i)=>(
                    <Col span={6} key={i} style={{margin:"1vmax 1vmax"}}>
                       <Card>
                            <h4 style={{textAlign:'center',fontSize:"1max"}}>{el.rname}</h4>
                           <div className="cardContext">
                               <img alt="example" width='100%' src={el.rpic} />
                               <div className="titles">{el.cameraname}</div>
                           </div>
                           <p>{el.lastrollcall}
                           {el.rfinal==1
                            ? <span style={{float:"right"}}>正常</span>
                            : <span style={{float:"right",color:'#f00'}}>异常</span>

                           }</p>
                           <p></p>
                           <Button type="primary" block visible={el.rstatus}>点名</Button>
                        </Card>  
                        
                    </Col>
                ))
                }   
                </Row>
                <Modal
                    title="设置点名任务"
                    visible={this.state.settingType}
                    onOk={this.handleOkSetting}
                    onCancel={this.handleCancelSetting}
                    okText="确认"
                    cancelText="取消"
                >
                    <Form layout="inline">
                        <Form.Item
                            label="日点名次数"
                        >
                            {getFieldDecorator('residence',{
                                initialValue:"1"
                            } )(
                                <Select  style={{ width: 120 }} onChange={this.patrolChange}>
                                    <Option value="1" >1</Option>
                                    <Option value="2" >2</Option>
                                    <Option value="3" >3</Option>
                                    <Option value="4" >4</Option>
                                    <Option value="6" >6</Option>
                                    <Option value="8" >8</Option>
                                    <Option value="12" >12</Option>
                                    <Option value="24" >24</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default RollcallTask=Form.create()(RollcallTask);
