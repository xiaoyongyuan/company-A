import React, { Component} from 'react';
import {Row, Col, Button,Form, Input, Modal, Card, Icon, Select, message, Spin} from "antd";
import {post} from "../../axios/tools";
import "../../style/ztt/css/rollCall.css";
import RollcallRecordModel from "./RollcallRecordModel";
import noImg from "../../style/imgs/nopic.png";
const Option = Select.Option;
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
            settingType:false,
            loading:false, //加载开关
            everynum:1, //点名任务次数
        }
    }
    componentDidMount() {
        this.reuestdata();
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
        });
        post({url:"/api/rollcalltask/add",data:{rollcallnum:this.state.everynum}},(res)=>{
            if(res.success){
                message.info(res);
            }
        });
    };
    rollTaskChange =(value)=>{
        this.setState({
            everynum:value
        });
    };
    //名称
    handleRealname =(e)=>{
        this.setState({
            realname:e.target.value
        })
    };
    //设备
    handleAccount =(e)=>{
        this.setState({
            account:e.target.value
        })
    };
    setRoll = () => { //点名设置

    };
    rollcall=(rid)=>{ //手动点名
        // this.props.history.push('/app/companyhome/calling?code='+266)
        // return;
    	post({url:"/api/rollcalltask/add_manualforAPP",data:{rid:rid}},(res)=>{
        if(res.success){
        	if(rid=='all'){
        		this.props.history.push('/app/companyhome/calling?code='+res.code)
        	}else{
        		this.setState({
	            loading:true,
	            code:res.code,
	        	},()=>{
	        		this.rollcallresult()
	        	})
        		
        	}    
        }
      })

    }
    rollcallresult =()=>{ //查询点名结果
    	const _this=this;
    	let inter=setInterval(function(){
    		post({url:"/api/rollcalldetail/getone",data:{code:_this.state.code},type:1},(res)=>{
            if(res.success){
            	clearInterval(inter);
                _this.setState({
                		loading:false,
                    rollCallType:true
                })
            }
        })
    	},2000)
    };
    //点名查询
    selectopt =()=>{
        let rollParams={
            rname:this.state.realname,
            cameraname:this.state.account
        };
        post({url:"/api/rollcall/getlist",data:rollParams},(res)=>{
            if(res.success){
                this.setState({
                    list:res.data
                })
            }
        })
    };
    handlerollClose=()=>{ //控制单个点名弹层关闭
    	this.setState({
        rollCallType:false
      })
    }
    
    reuestdata =()=>{ //点名的对象list
        post({url:"/api/rollcall/getlist"},(res)=>{
            if(res.success){
                this.setState({
                    list:res.data
                })
            }
        })
    };
    deleteobj=(code,index)=>{ //删除点名对象
    	const list=this.state.list;
      list.splice(index,1);
    	post({url:"/api/rollcall/del",data:{code:code}},(res)=>{
          if(res.success){
          	message.success('删除成功')
            this.setState({
                list:list
            })
          }
      })
    }
    
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallTask">
            	<Spin spinning={this.state.loading} delay={500} indicator={<Icon type='loading' />} size="large" tip="点名中......">
                <Row style={{margin:"2vmax 1vmax"}}>
                    <Col span={18}>
                        <Card title="点名任务" extra={<a onClick={()=>this.handleSetting}> <Icon type="setting" theme="filled" /><span>设置</span></a>}>
                            <p>每次点名次数: <b>{this.state.time}</b>次 &nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; {this.state.state?'执行中':'待生效'}</p>
                            {this.state.last?<p>上一次点名时间: {this.state.last} &nbsp; &nbsp;&nbsp; 共点名<b>{this.state.count}</b>个对象，<b>{this.state.normal}</b>个正常， <b>{this.state.unusual}</b>个异常</p>:''}
                            <p>下一次点名时间: {this.state.next}</p>
                        </Card>
                    </Col>
                </Row>
                <Row style={{margin:"1vmax 1vmax"}}>
                    <Col span={14}>
                        <Form layout="inline" onSubmit={this.selectopt}>
                            <FormItem label="对象名">
                                {getFieldDecorator('realname', {
                                    rules:[{
                                        required: false,
                                        message: '请输入名称!'
                                    }],
                                })( 
                                    <Input onChange={this.handleRealname}/>
                                )}
                            </FormItem>
                            <FormItem label="设备">
                                {getFieldDecorator('account', {
                                    rules: [{
                                        required: false,
                                        message: '请输入设备!',
                                    }],
                                })(
                                    <Input onChange={this.handleAccount}/>
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
                        <Button onClick={()=>this.rollcall('all')}>全部点名</Button>
                    </Col>

                </Row>
                <Row>
                {this.state.list.map((el,i)=>(
                    <Col span={6} key={i} style={{margin:"1vmax 1vmax"}}>
                       <Card>
                            <h4 style={{textAlign:'center',fontSize:"1max"}}>{el.rname}<Icon type="delete" style={{float:'right'}} onClick={()=>this.deleteobj(el.code,i)} /></h4>
                           <div className="cardContext">
                               <img alt="example" width='100%' src={el.rpic?el.rpic:noImg} />
                               <div className="titles">{el.cameraname}</div>
                           </div>
                           <p>{el.lastrollcall}
                           {el.rstatus===1
                            ? <span style={{float:"right"}}>正常</span>
                            : <span style={{float:"right",color:'#f00'}}>报警</span>
                           }</p>
                           <Button type="primary" block onClick={()=>this.rollcall(el.code)} visible={el.rstatus} disabled={el.rhandle==1&&el.rstatus?false:true}>点名</Button>
                        </Card>
                    </Col>
                ))
                }   
                </Row>
              </Spin>
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
                                <Select style={{ width: 120 }} onChange={this.rollTaskChange}>
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

export default RollcallTask=Form.create()(RollcallTask);
