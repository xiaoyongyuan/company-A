import React, { Component} from 'react';
import {Row, Col, Button, DatePicker, LocaleProvider, Timeline , Form,Modal,Spin,message} from "antd";
import {post} from "../../axios/tools";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../../style/sjg/home.css';
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
class RollcallHostory extends React.Component{
	constructor(props){
        super(props);
        this.state={
            pbdate:'',//检索的开始时间
            pedate:'',//检索的结束时间
            list:[],
            loading:false,
        }
    }
    componentDidMount() {
        post({url:'/api/patrolresult/getlist_team'},(res)=>{
            if(res.success){
                 console.log('******************', res);
                    this.setState({
                          list:res.data
                    })
            }
        })
    }     
    backtop=()=>{ //返回顶部
        document.getElementById("scorll").scrollTop = 0; 
    };
   //开始时间
   onChange1 =(dateString1)=> {
        this.onChangeDate('startValue',dateString1);
        this.setState({
            pbdate:dateString1
        })
    };
    //结束时间
    onChange2 =(dateString2)=> {
        this.onChangeDate("endValue",dateString2);
        this.setState({
            pedate:dateString2
        })
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
    handleSubmit =()=>{
            const data={
                startdate :this.state.pbdate?this.state.pbdate.format('YYYY-MM-DD'):'',
                enddate :this.state.pedate?this.state.pedate.format('YYYY-MM-DD'):'',
            }
            console.log(data.pbdate,data.pedate);
            post({url:'/api/patrolresult/getlist_team',data:data},(res)=>{
                if(res.success){
                        this.setState({
                            list:res.data
                        },()=>{
                            console.log('******************',this.state.list.length);
                        }
                        )
                }
            })
    };
    statepatarol =(e,item)=>{
       if(e==0){
            return(
                "patrolnone"
            )
       }else if(e==1){
            return(
                "patrolblock"
            )
       }else{
        return(
            "patrolblock"
        )
       }
    };
    render(){
        const { getFieldDecorator } = this.props.form;
        return(       
            <div className="RollcallHostory scrollable-container" id="scorll" >  
             <Spin spinning={this.state.loading} className="spin" size="large">
              <Button type="primary" className="backtop" onClick={this.backtop} style={this.state.scrollTop>20?{display:'block'}:{display:'none'}}>返回顶部</Button>
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
                                        format="YYYY-MM-DD"
                                        placeholder="开始日期"
                                        setFieldsValue={this.state.pbdate}
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
                                            format="YYYY-MM-DD"
                                            placeholder="结束日期"
                                            setFieldsValue={this.state.pedate}
                                            onChange={this.onChange2}
                                            disabledDate={this.disabledEndDate}
                                            onOpenChange={this.handleEndOpenChange}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                          
                            <Col xl={3} xxl={2} lg={2} className="msch">
                                <Button type="primary" htmlType="submit">查询</Button>
                            </Col>
                        </Form>
                       
                    </Row>
                </LocaleProvider>
                <div>{this.state.list.length?<div></div>:<div className="textcenter">暂无数据</div>}</div>
                <div className="timeline_ml">
                 <Timeline pending={true}>
                        {
                            this.state.list.map((item,j)=>{
                                return (
                                    <div> 
                                    <Timeline.Item key={j}>
                                        <div className="inlineb"> {item.pdate} </div> 
                                        <div className="timess"> {item.pteam}({item.pbdate}:00 —— {item.pedate}:00)</div><br></br>
                                        <div>
                                            <span></span>
                                            <div className="xun_detail">
                                                <div className={this.statepatarol(item.status)}>
                                                    <span>共点名 {item.totalcount}个对象</span>,
                                                    <span style={item.status==1?{display:'none'}:{display:'inline-block'}}>有 {item.unhandle}个对象未巡更，</span>
                                                    <span style={item.status==2?{display:'none'}:{display:'inline-block'}}>有{item.handling}个对象正在处理中,</span>
                                                    <span style={item.status==2?{display:'none'}:{display:'inline-block'}}>有 {item.handle_true}个对象巡更正常 ,</span>
                                                    <span style={item.status==2?{display:'none'}:{display:'inline-block'}}>有{item.handle_false}个对象巡更异常，</span>
                                                </div>
                                            </div>
                                         </div>
                                       
                                        
                                    </Timeline.Item>
                                    </div>
                                )
                            })
                        } 
                </Timeline>
                </div>
                
             </Spin>
            </div>
        )
    }
}

export default RollcallHostory= Form.create()(RollcallHostory);;