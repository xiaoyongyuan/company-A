import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Table, Form, Input,Modal, Card, Icon} from "antd";
import {post} from "../../axios/tools";


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
class RollcallTask extends React.Component{
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

        }
    }
    componentDidMount() {
        this.reuestdata()
    }

    setRoll = () => { //点名设置

    }

    reuestdata =(parameter={})=>{ //点名的对象查询
        post({url:"/api/rollcall/getlist",data:parameter},(res)=>{
            if(res){
                this.setState({
                    // list:res.data
                    list:data

                })
            }

        })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallTask">
                <Row>
                    <Col span={20}>
                        <Card title="点名任务" extra={<a onClick={()=>this.setRoll}> <Icon type="setting" theme="filled" /> 设置</a>}>
                            <p>每次点名次数: <b>{this.state.time}</b>次 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; {this.state.state?'执行中':'待生效'}</p>
                            {this.state.last?<p>上一次点名时间: {this.state.last} &nbsp; &nbsp;&nbsp; 共点名<b>{this.state.count}</b>个对象，<b>{this.state.normal}</b>个正常， <b>{this.state.unusual}</b>个异常</p>:''}
                            <p>下一次点名时间: {this.state.next}</p>
                        </Card>
                    </Col>
                </Row>
                <Row>
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
                    <Col span={6}>
                        <a href="#/app/rollcall/adopt"><Button>新增</Button></a>
                        
                         <a href="#/app/rollcall/auditing"><Button>全部点名</Button></a>
                    </Col>

                </Row>
                <Row>
                {this.state.list.map((el,i)=>(
                    <Col span={6} offset={1}>
                       <Card>
                            <h4 style={{textAlign:'center'}}>{el.cameraname+'-'+el.rname}</h4>
                           <div>
                            <img alt="example" width='100%' src={el.rpic} />
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

            </div>
        )
    }
}

export default RollcallTask=Form.create()(RollcallTask);
